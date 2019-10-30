import React from 'react';
import MyNavBar from './Components/MyNavBar';
import PartsDeck from './Components/PartsDeck';
import LeftBar from './Components/LeftBar';
import CanvasWrapper from './Components/CanvasWrapper';


class WebsiteWrapper extends React.Component {
  //In this component include navbar on the top, scrolling section

  render() {
    return (
      <div className="WebsiteWrapper">

        < MyNavBar />
        < PartsDeck />
        < LeftBar />
        < CanvasWrapper />

      </div>
    );
  }

}

export default WebsiteWrapper;
