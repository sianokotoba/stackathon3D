import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
// import { connect } from 'react-redux';
// import Navbar from './navbar';
// import Footer from './footer';
// import Home from './home';
import Tester from '../testpages/tester';
import TBS from '../testpages/tbs';

export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div className="row">
        <div className="col-md-2"></div>
          <div className="col-md-8 col-sm-12">
            <h1>Testing if the different components work</h1>
            <div id="menu">
              <button id="table">TABLE</button>
              <button id="sphere">SPHERE</button>
              <button id="helix">HELIX</button>
              <button id="grid">GRID</button>
            </div>
            { this.props.children }
          </div>
        <div className="col-md-2"></div>
      </div>
  );
  }
}


// const mapStateToProps = () => ({

// });

// const mapDispatchToProps = () => ({

// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

/*
    <div id="container">
      <div id="info"><a href="http://threejs.org" target="_blank">three.js css3d</a> - periodic table. <a href="https://plus.google.com/113862800338869870683/posts/QcFk5HrWran" target="_blank">info</a>.</div>
      <div id="menu">
        <button id="table">TABLE</button>
        <button id="sphere">SPHERE</button>
        <button id="helix">HELIX</button>
        <button id="grid">GRID</button>
      </div>
    </div>
*/
