import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to SpotOps</h1>
        <p> This should be where the map goes.</p>
      </div>
    );
  }
}
