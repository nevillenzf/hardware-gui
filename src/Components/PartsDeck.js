import React from 'react';
import PartCard from './PartCard';

class MyPartsDeck extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor() {
    super();
    this.state = ({parts:[{name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"THING Gate", desc:"All inputs cannot be true or all inputs cannot be false"},
                          {name:"XOR Gate", desc:"All inputs cannot be true or all inputs cannot be false"}]}) //Part Cards are defined by {id,name,description - popover}
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
             />
        )
      })}

      </div>
    );
  }

}

export default MyPartsDeck;
