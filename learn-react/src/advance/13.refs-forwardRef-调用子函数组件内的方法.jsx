import React, { forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const Children = forwardRef((props, ref) => {
  const refresh = () => {
    console.log('refresh');
  };

  useImperativeHandle(ref, () => ({
    refresh
  }));

  return <div>Children</div>;
});

class Parent extends React.Component {
  ref = React.createRef();

  render() {
    return (
      <div>
        <button onClick={() => this.ref.current.refresh()}>点击</button>
        <Children ref={this.ref} />
      </div>
    );
  }
}

ReactDOM.render(<Parent />, document.getElementById('root'));
