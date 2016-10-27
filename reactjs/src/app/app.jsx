import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from '../navbar/navbar.jsx';
import ContentBox from '../ContentBox/ContentBox.jsx';

// maybe set up the WebSocket here?

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: 'About'
    };
  }
  // method is passed down to app -> navbar -> navbutton
  handleClick = n => {
    this.setState({
      componentName: n
    });
  }
  render() {
    return (
      <div>
        <Navbar handleClick={this.handleClick}/>
        <ContentBox content={this.state.componentName} />
      </div>
    )
  }
}

export default App;
