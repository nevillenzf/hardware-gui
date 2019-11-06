import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import ComponentItem from './ComponentItem';

class ComponentList extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="ComponentList">
        <ListGroup>
        {this.props.myCompList.map((comp, compIndex) => {
          return (
              <ComponentItem
              key={compIndex}
              name= {comp["comp"]}
              passed_key= {comp["id"]}
             />
        )
      })}
        </ListGroup>
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

ComponentList = connect(mapStateToProps)(ComponentList);

export default ComponentList;
