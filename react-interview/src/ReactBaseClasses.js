export function Component(props) {
  this.props = props;
}
// 如何区分
Component.prototype.isReactComponent = {};

/* class Component{
    static isReactComponent=true;
    constructor(props){
        this.props = props;
    }
} */
