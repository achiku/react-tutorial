import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app'

console.log('hello, world!')

ReactDOM.render(
  <App />,
  document.getElementById('main')
);


// class Hello extends React.Component {
//   render() {
//     return React.createElement('div', null, `Hello ${this.props.toWhat}`);
//   }
// }
// 
// ReactDOM.render(
//   React.createElement(Hello, {toWhat: 'World'}, null),
//   document.getElementById('main')
// );
