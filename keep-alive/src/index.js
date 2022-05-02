import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';

// import { KeepAliveProvider, withKeepAlive } from 'keepalive-react-component';
import { KeepAliveProvider, withKeepAlive } from './keepalive-react-component';
const KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home' });
const KeepAliveUserList = withKeepAlive(UserList, {
  cacheId: 'UserList',
  scroll: true
});
const KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' });
const App = () => {
  return (
    <BrowserRouter>
      <KeepAliveProvider>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list">用户列表</Link>
          </li>
          <li>
            <Link to="/add">添加用户</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<KeepAliveHome />} />
          <Route path="/list" element={<KeepAliveUserList />} />
          <Route path="/add" element={<KeepAliveUserAdd />} />
        </Routes>
      </KeepAliveProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
