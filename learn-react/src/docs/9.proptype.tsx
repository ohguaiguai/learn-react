import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"; //属性的类型
let root: HTMLElement | null = document.getElementById("root");
//属性校验 ，你要告诉使用你写的组件的人，如何传递属性
interface PersonProps extends Record<string, any> {
  name?: string;
  age?: number;
  gender?: "male" | "female";
  hobby?: Array<string>;
  position?: { x: number; y: number };
  // [propName: string]: any
}
/**
 * 1.如何定义默认属性
 */
class Person extends React.Component<PersonProps> {
  static defaultProps: PersonProps = {
    name: "未名",
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(["male", "female"]).isRequired,
    hobby: PropTypes.arrayOf(PropTypes.string),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    //自定义较验器 校验年龄age必须>0并且小于100岁
    age(
      props: PersonProps,
      propName: string,
      componentName: string
    ): Error | null {
      let age = props[propName]; //因为根本不知道 propName里面是值，所以就要求PersonProps类型要支持索引属性
      if (age < 0 || age > 100) {
        return new Error(
          `Invalid Prop ${propName} supplied to ${componentName}`
        );
      }
      return null;
    },
  };
  render() {
    let { name, gender, age, hobby, position = {} } = this.props;
    //对象不能直接放在{}里
    return (
      <div>
        <p>name:{name}</p>
        <p>gender:{gender}</p>
        <p>age:{age}</p>
        <p>hobby:{hobby}</p>
        <p>position:{position.toString()}</p>
      </div>
    );
  }
}
let personProps: PersonProps = {
  gender: "male",
  age: 120,
  hobby: ["football", "basketball"],
  position: { x: 100, y: 100 },
};
ReactDOM.render(<Person {...personProps} />, root);
