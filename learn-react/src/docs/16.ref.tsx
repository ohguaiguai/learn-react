import React from "react";
import ReactDOM from "react-dom";
/**
 * ref提供了一种方式，让我们可以访问真实DOM节点，
 * 1. ref的值是一个字符串
 * 2. ref的值可以是一个函数
 * 3. React.createRef() 现在或者 以后只推荐 第三种
 */
interface Props {}
class Sum extends React.Component {
  a: React.RefObject<HTMLInputElement>;
  b: React.RefObject<HTMLInputElement>;
  c: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.a = React.createRef(); //{current:null}
    this.b = React.createRef(); //{current:null}
    this.c = React.createRef(); //{current:null}
  }
  add = () => {
    let a = this.a.current!.value;
    let b = this.b.current!.value;
    this.c.current!.value = a + b;
  };
  render() {
    return (
      <>
        <input ref={this.a} />+
        <input ref={this.b} />
        <button onClick={this.add}>=</button>
        <input ref={this.c} />
      </>
    );
  }
}
/* class Sum extends React.Component {
    a: HTMLInputElement
    b: HTMLInputElement
    c: HTMLInputElement
    add = () => {
        //Property 'value' does not exist on type 'ReactInstance'.
        let a = this.a.value;
        let b = this.b.value;
        this.c.value = a + b;
    }
    render() {
        return (
            <>
                <input ref={(input: HTMLInputElement) => this.a = input} />+
                <input ref={(input: HTMLInputElement) => this.b = input} />
                <button onClick={this.add}>=</button>
                <input ref={(input: HTMLInputElement) => this.c = input} />
            </>
        )
    }
} */
/* class Sum extends React.Component {
    add = () => {
        //Property 'value' does not exist on type 'ReactInstance'.
        //
        let a = (this.refs.a as HTMLInputElement).value;
        let b = (this.refs.b as HTMLInputElement).value;
        (this.refs.c as HTMLInputElement).value = a + b;
    }
    render() {
        return (
            <>
                <input ref="a" />+
                <input ref="b" />
                <button onClick={this.add}>=</button>
                <input ref="c" />
            </>
        )
    }
} */

ReactDOM.render(<Sum />, document.getElementById("root")!);
