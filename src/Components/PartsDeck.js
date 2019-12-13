import React from 'react';
import PartCard from './PartCard';
import NewComponentModal from './NewComponentModal';
import {connect} from 'react-redux';
import store from '../index';

class MyPartsDeck extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor() {
    super();
    // parts:[{name:"Module 1", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 2", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 3", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 4", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 5", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 6", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 7", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"Module 8", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
    //                       {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"}],
    this.state = ({ showModal: false})
    this.incrementIdCount = this.incrementIdCount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openModal = this.openModal.bind(this);
}

handleClose = () => {
  this.setState({showModal: false});

}

openModal = () => {
  this.setState({showModal: true})
}

incrementIdCount(){
  //this.setState({idCount: this.state.idCount + 1});
  store.dispatch({type: "INCREMENT_COUNTER"});

}

  render() {
    var reversedParts = this.props.partDeck;
    reversedParts.reverse();
    return (
      <div className="MyPartsDeck">
        <PartCard
        key={-1}
        name={"Add a Module"}
        desc={"Define a new module for this project"}
        passed_key={-1}
        count= {this.props.idCounter}
        increment = {this.incrementIdCount}
        handleClose = {this.handleClose}
        openModal = {this.openModal}
       />
      {reversedParts.map((parts, partsIndex) => {
          return (
              <PartCard
              key={partsIndex}
              name={parts["name"]}
              desc={parts["desc"]}
              passed_key={partsIndex}
              count= {this.props.idCounter}
              increment = {this.incrementIdCount}
             />
        )
      })}
      <NewComponentModal  show={this.state.showModal}
                          size="lg"
                          onHide={this.handleClose}/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    idCounter: state.idCounter,
    partDeck: state.partDeck,
  }
}

MyPartsDeck = connect(mapStateToProps)(MyPartsDeck);

export default MyPartsDeck;
