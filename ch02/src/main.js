import React from 'react';
import ReactDOM from 'react-dom';

console.log('hello, world!')

ReactDOM.render(
  <h1>Hello, world!</h1>,
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
