import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

import { table } from './periodictable';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // table

    for ( var i = 0; i < table.length; i += 5 ) {

      var element = document.createElement( 'div' );
      element.className = 'element';
      element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

      var number = document.createElement( 'div' );
      number.className = 'number';
      number.textContent = (i/5) + 1;
      element.appendChild( number );

      var symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = table[ i ];
      element.appendChild( symbol );

      var details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
      element.appendChild( details );

      var object = new THREE.CSS3DObject( element );
      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;
      scene.add( object );

      objects.push( object );

      //

      var object = new THREE.Object3D();
      object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
      object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

      targets.table.push( object );

    }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
      >

        <scene>


        </scene>
      </React3>
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
// )(Home);
