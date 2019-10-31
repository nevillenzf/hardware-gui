import React from 'react';
import MyCanvas from './MyCanvas';
import ProjectName from './ProjectName';

class CanvasWrapper extends React.Component {
  //This Component is the wrapper class for the fabric canvas that is going to be held inside
  constructor() {
    super();
    this.state = ( {
      width: 0,
      height: 0
    })
    this.renderCanvas = this.renderCanvas.bind(this);
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
  render() {
    return (
      <div className="CanvasWrapper">
        {this.renderCanvas()}
        <ProjectName name="test-circuit-#0.1"/>
      </div>
    );
  }

}

export default CanvasWrapper;
