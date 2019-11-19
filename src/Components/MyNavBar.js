import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import AreYouSureModal from './AreYouSureModal';
import { addCustomControls, showModule } from './Helpers/CanvasDrawHelper';
import { redrawLine } from './Helpers/ConnectHelper';
import store from '../index';



class MyNavBar extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor(props) {
    super(props);
    this.state = {
      show : false,
      file : null,
    };

    this.newCanvas = this.newCanvas.bind(this);
    this.loadCanvas = this.loadCanvas.bind(this);
    this.loadClick = this.loadClick.bind(this);

  }

  handleClose = () => {
    this.setState({show: false});
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

  loadCanvas = (e) => {
    //Takes in a json file and loads it as a canvas instance
    console.log("Loading Canvas...")
    //Handles object differently and appends
    var result = null;
    e.stopPropagation();
    e.preventDefault();
    var reader = new FileReader();
    let canvas = this.props.canvas;
    reader.addEventListener("load", function () {
      result = reader.result;
      let parsed_result = JSON.parse(result)
      console.log(parsed_result)
      canvas.loadFromJSON(parsed_result);
      //remove everything from comp list
      store.dispatch({type: "CLEAR_COMP"});

      setTimeout(function(){
        //Redraw port: output,input
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

          }
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
    reader.readAsText(e.target.files[0]);
    }

  }


  loadClick = (e) => {
    //Handles object differently and appends
    this.refs.fileUploader.click();
  }

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
    console.log(filtered);
    const fileData = JSON.stringify(new_json);

    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'new_file.json';
    link.href = url;
    link.click();
  }

  render() {
    return (
      <div className="MyNavBar">
      <Navbar variant="light" className="InNavBar">
        <Navbar.Brand href="#home">Example GUI</Navbar.Brand>
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
          <Nav.Link href="https://wicil.ece.wisc.edu/"> Who are We? </Nav.Link>
        </Nav>
        <div>
          <AreYouSureModal  show={this.state.show}
                            size="lg"
                            onHide={this.handleClose}/>
        </div>
      </Navbar>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    myCompList: state.myCompList,
  }
}

MyNavBar = connect(mapStateToProps)(MyNavBar);

export default MyNavBar;
