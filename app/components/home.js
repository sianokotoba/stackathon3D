import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import THREE2 from '../../public/js/renderers/CSS3DRenderer';
import THREE3 from '../../public/js/controls/TrackballControls';
import TWEEN from '../../public/js/libs/tween.min.js';

import { table } from './periodictable';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.targetRotationOnMouseDown = 0;

    this.scene = new THREE.Scene();

    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.targetRotation = 0;

    this.state = {
      ...this.state,
      width: window.innerWidth,
      height: window.innerHeight,
      camera: new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 ),
      groupRotation: new THREE.Euler(0, 0, 0),
    };

    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onDocumentMouseMove = this._onDocumentMouseMove.bind(this);
    this._onDocumentMouseUp = this._onDocumentMouseUp.bind(this);
    this._onDocumentMouseOut = this._onDocumentMouseOut.bind(this);
    this._onDocumentTouchStart = this._onDocumentTouchStart.bind(this);

    this._onAnimate = this._onAnimate.bind(this);
    this._onAnimateInternal = this._onAnimateInternal.bind(this);
    this._tableRenderer = this._tableRenderer.bind(this);
    this._trackballControls = this._trackballControls.bind(this);
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
  }

  init() {
    let {camera} = this.state;
    camera.position.z = 3000;

    let scene = this.scene;

    var objects = [];
    var targets = { table: [], sphere: [], helix: [], grid: [] };


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

      var object = new THREE2.CSS3DObject( element );
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
  }

  // this function allows for 3D animation to be responsive on window size change WITHOUT reloading/restarting the 3D animation
  updateCanvasSize() {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    this.setState({width: width, height: height});
        // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
  }

  componentWillMount() {
    this.updateCanvasSize();
  }

  componentDidMount() {
    // this.stats = new Stats();

    const container = this.refs.container;

    // this.stats.domElement.style.position = 'absolute';
    // this.stats.domElement.style.top = '0px';

    // container.appendChild(this.stats.domElement);

    container.addEventListener('mousedown', this._onDocumentMouseDown, false);
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    document.addEventListener('touchmove', this._onDocumentTouchMove, false);

    window.addEventListener('resize', this.updateCanvasSize);
  }

  componentWillUnmount() {
    const container = this.refs.container;

    container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
    document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);

    window.removeEventListener('resize', this.updateCanvasSize);

    // delete this.stats;
  }

  _onDocumentMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', this._onDocumentMouseMove, false);
    document.addEventListener('mouseup', this._onDocumentMouseUp, false);
    document.addEventListener('mouseout', this._onDocumentMouseOut, false);

    const {
      width,
    } = this.state;

    const windowHalfX = width / 2;

    this.mouseXOnMouseDown = event.clientX - windowHalfX;
    this.targetRotationOnMouseDown = this.targetRotation;
  };

  _onDocumentMouseMove(event) {
    const {
      width,
    } = this.state;

    const windowHalfX = width / 2;

    this.mouseX = event.clientX - windowHalfX;
    this.targetRotation = this.targetRotationOnMouseDown +
      (this.mouseX - this.mouseXOnMouseDown) * 0.02;
  };

  _onDocumentMouseUp() {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentMouseOut() {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      const {
        width,
      } = this.state;

      const windowHalfX = width / 2;

      this.mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
      this.targetRotationOnMouseDown = this.targetRotation;
    }
  };

  _onDocumentMouseUp(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      const {
        width,
      } = this.state;

      const windowHalfX = width / 2;

      this.mouseX = event.touches[0].pageX - windowHalfX;
      this.targetRotation = this.targetRotationOnMouseDown +
        (this.mouseX - this.mouseXOnMouseDown) * 0.05;
    }
  };

  _onAnimate() {
    this._onAnimateInternal();
  };

  _onAnimateInternal() {
    const groupRotationY = this.state.groupRotation.y;

    if (Math.abs(groupRotationY - this.targetRotation) > 0.0001) {
      this.setState({
        groupRotation: new THREE.Euler(0, groupRotationY +
          (this.targetRotation - groupRotationY) * 0.05, 0),
      });
    }

    // this.stats.update();
  }

  _tableRenderer() {
    let scene = this.scene;
    let { camera } = this.state
    console.log("SHOULD BE CAMERA", camera)
    console.log("SHOULD BE SCENE", scene)
    const renderer = new THREE2.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    var render = function() {

      renderer.render( scene, camera );

    }

    const controls = new THREE3.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

    var button = document.getElementById( 'table' );
    button.addEventListener( 'click', function ( event ) {

      transform( targets.table, 2000 );

    }, false );
  }

  // _trackballControls() {


  // }

  transform( targets, duration ) {

    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

      var object = objects[ i ];
      var target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    }

    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate( render )
      .start();

  }

  render() {
    let cameraPosition = new THREE.Vector3(0, 150, 500);
    let groupPosition = new THREE.Vector3(0, 50, 0);

    const {
      width,
      height,
      groupRotation
    } = this.state;

    return(
      <div ref="container">
      <div id="container"></div>
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        clearColor={0xf0f0f0}
        onAnimate={this._onAnimate}
      >
        <scene ref="scene">
          <perspectiveCamera
            name="mainCamera"
            ref="camera"
            fov={40}
            aspect={width / height}
            near={1}
            far={10000}

            position={cameraPosition}
          >
            <pointLight
              color={0xffffff}
              intensity={0.8}
            />
          </perspectiveCamera>
          <group
            position={groupPosition}
            rotation={groupRotation}
          >
          </group>
        </scene>
      </React3>
    </div>
    );
  }
}
