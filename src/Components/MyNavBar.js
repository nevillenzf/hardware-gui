import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import SavingModal from './SavingModal';
import HelpModal from './HelpModal';
import { addCustomControls, showModule } from './Helpers/CanvasDrawHelper';
import { redrawLine } from './Helpers/ConnectHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import store from '../index';



class MyNavBar extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor(props) {
    super(props);
    this.state = {
      show : false,
      showHelp : false,
      file : null,
    };

    this.newCanvas = this.newCanvas.bind(this);
    this.openHelp = this.openHelp.bind(this);
    this.loadCanvas = this.loadCanvas.bind(this);
    this.loadClick = this.loadClick.bind(this);

  }

  handleClose = () => {
    this.setState({show: false});
    this.setState({showHelp: false});

  }

  newCanvas = () => {
    //Prompt Modal if canvas is NOT empty
    if (this.props.myCompList.length > 0)
    {
      this.setState({show: true})
    }
    else {
      window.location.reload();
    }
  }

  openHelp = () => {
    this.setState({showHelp: true})
  }

  loadCanvas = (e) => {
    //Takes in a json file and loads it as a canvas instance
    console.log("Loading Canvas...")
    //Handles object differently and appends
    var result = null;
    e.stopPropagation();
    e.preventDefault();
    var reader = new FileReader();
    let canvas = this.props.canvas;
    reader.addEventListener("load", function (evt) {

      result = reader.result;
      //Handle filename and update the redux state with the filename
      let parsedNames = reader.fileName.split(".");
      let fileName = parsedNames[0];
      store.dispatch({type: "UPDATE_PROJECT_NAME", name: fileName});

      let parsed_result = JSON.parse(result)
      console.log(parsed_result)
      canvas.loadFromJSON(parsed_result);
      //remove everything from comp list
      store.dispatch({type: "CLEAR_COMP"});
      store.dispatch({type: "CLEAR_PARTS"});
      for (var item of parsed_result.partDeck)
      {
        store.dispatch({type: "UPDATE_PARTS", part: item});
      }
      setTimeout(function(){
        //Redraw port: output,input
        let maxID = 0;
        for (let obj of canvas.getObjects())
        {
          if (obj.type !== "line")
          {
            //Add custom controls for objects
            addCustomControls(canvas,obj);
            obj.on("mousedblclick", (e)=> {showModule(obj, "double")});
            obj.on("mousedown", (e)=> {showModule(obj, "single")});
            obj.set({inputs: [],
                    outputs: []})
            store.dispatch({type: "UPDATE_COMP_LIST", comp: obj.name, id: obj.id});
            //Save max ID and then output new as new idCounter
            if (obj.id > maxID)
            {
              maxID = obj.id
            }
          }
          store.dispatch({type: "SET_COUNTER", new_num: maxID + 1});
        }
      }, 200);

      setTimeout(function(){
        //Redraw lines
        for (let obj of canvas.getObjects())
        {
          if (obj.type === "line")
          {
            redrawLine(canvas,obj);
          }
        }
      }, 200);



      //Add the objects back to the sidebar

      }, false);

    if (e.target.files[0]) {
    reader.fileName = e.target.files[0].name;
    reader.readAsText(e.target.files[0]);
    }

  }


  loadClick = (e) => {
    //Handles object differently and appends
    this.refs.fileUploader.click();
  }

  //Saves the canvas and also the new components that were added.
  saveCanvas = () => {
    //Takes in a json file and loads it as a canvas instance
    console.log("Saving Canvas...")
    var additional_fields = ['name','id','start_id','end_id','inputs','outputs'];
    var new_json = this.props.canvas.toJSON(additional_fields);
    //handle objects by saving all information
    //var canvas_objects = this.props.canvas.getObjects();
    //remove irrelevant objects
    //TODO: save inputs and outputs because they seem important to repopulate the canvas
    var filtered = new_json.objects.filter(function(el) { return  el.type !== "output" &&
                                                                  el.type !== "input" });
    new_json.objects = filtered;
    new_json.partDeck = this.props.partDeck;
    console.log(new_json);
    const fileData = JSON.stringify(new_json);

    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = this.props.projectName + '.json';
    link.href = url;
    link.click();
  }

  render() {
    return (
      <div className="MyNavBar">
      <Navbar variant="light" className="InNavBar">
        <Navbar.Brand href="#home"> Flux.js </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>{this.newCanvas()}}> New </Nav.Link>
          <Nav.Link onClick={(e)=>{this.loadClick(e)}}> Load </Nav.Link>
          <input  type="file"
                  id="file"
                  ref="fileUploader"
                  style={{display: "none"}}
                  accept=".json"
                  onChange={(e)=>{this.loadCanvas(e)}}/>
          <Nav.Link onClick={()=>{this.saveCanvas()}}> Save </Nav.Link>
          <Nav.Link> Export </Nav.Link>
          <Nav.Link href="https://wicil.ece.wisc.edu/" target="_blank"> Who are We? </Nav.Link>
        </Nav>
        <Nav id="outline-info">
          <Nav.Link >
            <button onClick={()=>{this.openHelp()}} className="helpBtn">
              <FontAwesomeIcon icon={faQuestionCircle} size="lg"/>
            </button>
          </Nav.Link>
        </Nav>

      </Navbar>
      <div>
        <SavingModal  show={this.state.show}
                          size="lg"
                          onHide={this.handleClose}/>
        <HelpModal  show={this.state.showHelp}
                    size="lg"
                    onHide={this.handleClose}/>
      </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    myCompList: state.myCompList,
    idCounter: state.idCounter,
    projectName: state.projectName,
    partDeck: state.partDeck
  }
}

MyNavBar = connect(mapStateToProps)(MyNavBar);

export default MyNavBar;
