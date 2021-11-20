import React from 'react';
import ReactDOM from 'react-dom';
interface Props {}
class Form extends React.Component<Props> {
  textInput: React.RefObject<TextInput>;
  constructor(props: Props) {
    super(props);
    this.textInput = React.createRef();
  }
  getFocus = () => {
    this.textInput.current!.getFocus();
  };
  render() {
    return (
      <>
        <TextInput ref={this.textInput} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    );
  }
}
class TextInput extends React.Component {
  input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current!.value = new Date().toLocaleTimeString();
    this.input.current!.focus();
  };
  render() {
    return <input type='text' ref={this.input} />;
  }
}
ReactDOM.render(<Form />, document.getElementById('root')!);
