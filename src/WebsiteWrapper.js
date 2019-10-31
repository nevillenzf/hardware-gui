import React from 'react';
import MyNavBar from './Components/MyNavBar';
import TopDash from './Components/TopDash';
import LeftBar from './Components/LeftBar';
import {Row} from 'react-bootstrap';
import CanvasWrapper from './Components/CanvasWrapper';


class WebsiteWrapper extends React.Component {
  //In this component include navbar on the top, scrolling section

  render() {
    return (
      <div className="WebsiteWrapper">

        < MyNavBar />
        < TopDash />
        <div>
          < LeftBar />
          < CanvasWrapper />
        </div>
      </div>
    );
  }

}

export default WebsiteWrapper;
