import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

export default class Tester extends Component {
  constructor(props) {
    super(props);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this._onAnimate = this._onAnimate.bind(this);

    this.state = {
      cubeRotation: new THREE.Euler(),
    }
  };

  _onAnimate() {
    // we will get this callback every frame

    // pretend cubeRotation is immutable.
    // this helps with updates and pure rendering.
    // React will be sure that the rotation has now updated.
    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.1,
        this.state.cubeRotation.y + 0.1,
        0
      ),
    });
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
            // DO A FUCKING TERNARY ON THE GODDAMN MOTHER EFFING REACT3!!!!!!!!
      <React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
      >



      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>
  );
  }
}
