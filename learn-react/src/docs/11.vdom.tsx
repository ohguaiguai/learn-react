import React from '../lib/react';
import ReactDOM from '../lib/react-dom/react-dom';
//let element = <h1 className="title" style={{ color: 'red', fontSize: '24px' }}>hello</h1>
//let element = React.createElement('h1', { className: 'title', style: { color: 'red', fontSize: '50px' } }, 'hello');

/* function Welcome(props) {
    return React.createElement('h1', { className: 'title' }, props.title);
} */
class Welcome extends React.Component {
  render() {
    return React.createElement('h1', { className: 'title' }, this.props.title);
  }
}

let element = React.createElement(Welcome, { title: '标题' });

ReactDOM.render(element, document.getElementById('root')!);
