import React from 'react';
import ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');
/**
 * 复合组件和提供组件
 *
 */
interface PanelProps {
  headString: string;
  bodyString: string;
}
interface HeadProps {
  headString: string;
}
interface BodyProps {
  bodyString: string;
}
//纯函数
/**
 * 没有改变自己输入的值，并且也不改变作用域 外的变量
 * 函数组件就像是一个纯函数，因为这个函数接收了属性对象，而且 是只读的。然后返回一个值
 * 输入是确定的，输出就是确定的
 *  react vue都要剥离class组件，改用函数式组件  hooks
 */
/* function sum(a: number, b: number) {
    return a + b;
}
function withdraw(account: { amount: number }, amount: number) {
    account.amount -= amount;
}
withdraw({ amount: 100 }, 10);
function change(account: { amount: number }, amount: number) {
    global.name = 10;
} */

class Head extends React.Component<HeadProps> {
  render(): React.ReactElement {
    //Cannot assign to 'headString' because it is a read-only property
    //this.props.headString = '新的headString';
    return (
      <div style={{ border: '1px solid green', padding: 5 }}>
        {this.props.headString}
      </div>
    );
  }
}
class Body extends React.Component<BodyProps> {
  render(): React.ReactElement {
    return (
      <div style={{ border: '1px solid blue', padding: 5 }}>
        {this.props.bodyString}
      </div>
    );
  }
}
class Panel extends React.Component<PanelProps> {
  render(): React.ReactElement {
    let { headString, bodyString } = this.props;
    return (
      <div style={{ border: '1px solid red', padding: 5 }}>
        <Head headString={headString} />
        <Body bodyString={bodyString} />
      </div>
    );
  }
}
let panelProps: PanelProps = {
  headString: '我是头',
  bodyString: '我是身体',
};
ReactDOM.render(<Panel {...panelProps} />, root);
