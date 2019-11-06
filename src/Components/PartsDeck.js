import React from 'react';
import PartCard from './PartCard';

class MyPartsDeck extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor() {
    super();
    this.state = ({parts:[{name:"Module 1", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 2", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 3", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 4", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 5", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 6", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 7", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"Module 8", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"}],
                          //Part Cards are defined by {id,name,description - popover}
                   idCount: 0
                        })
    this.incrementIdCount = this.incrementIdCount.bind(this);
}

incrementIdCount(){
  this.setState({idCount: this.state.idCount + 1});
}

  render() {
    return (
      <div className="MyPartsDeck">
      {this.state.parts.map((parts, partsIndex) => {
          return (
              <PartCard
              key={partsIndex}
              name={parts["name"]}
              desc={parts["desc"]}
              passed_key={partsIndex}
              count= {this.state.idCount}
              increment = {this.incrementIdCount}
             />
        )
      })}

      </div>
    );
  }

}

export default MyPartsDeck;
