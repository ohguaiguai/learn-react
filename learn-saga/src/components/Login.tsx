import React from 'react';
import { connect } from 'react-redux';
import { CounterState } from '../store/reducer';
import actions from '../store/actions';
type Props = CounterState & typeof actions;
class Login extends React.Component<Props> {
  usernameRef;
  passwordRef;
  constructor(props: Props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  login = (event) => {
    event.preventDefault();
    let username = this.usernameRef.current.value;
    let password = this.passwordRef.current.value;
    this.props.login(username, password);
  };
  logout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  render() {
    let loginForm = (
      <form>
        <label>用户名</label>
        <input ref={this.usernameRef} />
        <br />
        <label>密码</label>
        <input ref={this.passwordRef} />
        <br />
        <button onClick={this.login}>登录</button>
        <button onClick={this.logout}>登出</button>
      </form>
    );
    let logoutForm = (
      <form>
        <p>用户token:{this.props.token}</p>
        <button onClick={this.logout}>登出</button>
      </form>
    );
    return (
      <>
        {this.props.loading ? '加载中....' : ''}
        <br />
        {this.props.token ? logoutForm : loginForm}
      </>
    );
  }
}
const mapStateToProps = (state: CounterState): CounterState => state;
export default connect(mapStateToProps, actions)(Login);
