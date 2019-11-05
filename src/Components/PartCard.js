import React from 'react';
import PartWindow from './PartWindow'
class PartCard extends React.Component {
  //Check props for parts info
  //On mount add listeners
  //On unmount remove listeners
  changeCursor(type) {
    if (type === "leave")
    {
      //console.log("leaver")
    }
    else if (type === "enter"){
      //console.log("this just in")
    }
  }

  printShit() {
    console.log("just testing")
  }

  render() {
    return (
      <div  className="PartCard"
            onClick={this.printShit}
            onMouseEnter={() => this.changeCursor("enter")}
            onMouseLeave={() => this.changeCursor("leave")}>
        <PartWindow name={this.props.name}
                    desc={this.props.desc}
                    passed_key={this.props.passed_key}
                    />
      </div>
    );
  }

}

export default PartCard;
