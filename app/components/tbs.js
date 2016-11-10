import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';

import ExampleBase from './tbs_examplebase';
import Resources from './tbs_resources';
import Shapes from './tbs_shapes';

// const cameraPosition = new THREE.Vector3(0, 150, 500);

export default class GeometryShapes extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.targetRotationOnMouseDown = 0;

    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.targetRotation = 0;

    this.state = {
      ...this.state,
      width: window.innerWidth,
      height: window.innerHeight,
      groupRotation: new THREE.Euler(0, 0, 0),
    };

    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onDocumentMouseMove = this._onDocumentMouseMove.bind(this);
    this._onDocumentMouseUp = this._onDocumentMouseUp.bind(this);
    this._onDocumentMouseOut = this._onDocumentMouseOut.bind(this);
    this._onDocumentTouchStart = this._onDocumentTouchStart.bind(this);

    this._onAnimate = this._onAnimate.bind(this);
    this._onAnimateInternal = this._onAnimateInternal.bind(this);

  }

  resizeCanvas() {
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
  }

  componentWillUnmount() {
    const container = this.refs.container;

    container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
    document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);

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

  render() {
    let cameraPosition = new THREE.Vector3(0, 150, 500);
    let groupPosition = new THREE.Vector3(0, 50, 0);

    const {
      width,
      height,
      groupRotation
    } = this.state;

    console.log("doc width", document.clientWidth)
    console.log("doc height", document.clientHeight)

    return (
      <div ref="container">
      <div
        style={{
          color: 'black',
          position: 'absolute',
          top: '10px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Simple procedurally generated 3D shapes<br/>
        Drag to spin
      </div>
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
            fov={50}
            aspect={width / height}
            near={1}
            far={1000}

            position={cameraPosition}
          >
            <pointLight
              color={0xffffff}
              intensity={0.8}
            />
          </perspectiveCamera>
          <Resources/>
          <group
            position={groupPosition}
            rotation={groupRotation}
          >
            <Shapes/>
          </group>
        </scene>
      </React3>
    </div>
    );
  }
}

