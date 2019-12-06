import React from 'react';
import MyCanvas from './MyCanvas';
import ProjectName from './ProjectName';
import CanvasCoords from './CanvasCoords';
import ModuleInfoWindow from './ModuleInfoWindow';

import {connect} from 'react-redux';

class CanvasWrapper extends React.Component {
  //This Component is the wrapper class for the fabric canvas that is going to be held inside
  constructor() {
    super();
    this.state = ( {
      width: 0,
      height: 0
    })
    this.renderCanvas = this.renderCanvas.bind(this);
    this.renderModuleInfo = this.renderModuleInfo.bind(this);
  }

  componentDidMount(){
    const width = document.getElementsByClassName('CanvasWrapper')[0].clientWidth;
    const height = document.getElementsByClassName('CanvasWrapper')[0].clientHeight;

    this.setState({width: width})
    this.setState({height: height})

  }

  renderCanvas() {
    if (this.state.width> 0 && this.state.height > 0)
    {
      return (
        <MyCanvas width= {this.state.width} height={this.state.height}/>
      )
    }
    //Else don't create anything
  }

  renderModuleInfo(){
    if (this.props.show)
    {
      return (
        <ModuleInfoWindow />
      )
    }
  }

  render() {
    return (
      <div className="CanvasWrapper">
        {this.renderCanvas()}
        {this.renderModuleInfo()}
        <ProjectName/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    show: state.showInfoWindow,
  }
}

CanvasWrapper = connect(mapStateToProps)(CanvasWrapper);

export default CanvasWrapper;
