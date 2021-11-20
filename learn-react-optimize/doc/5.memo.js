// 内部实际上还是使用了PureComponent
function memo(Func) {
  class Proxy extends PureComponent {
    render() {
      return <Func {...this.props} />;
    }
  }
  return Proxy;
}
const Title = memo((props) => {
  console.log('Title render');
  return <p>{props.title}</p>;
});
