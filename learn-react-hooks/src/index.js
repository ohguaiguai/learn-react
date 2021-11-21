/* import React from 'react';
import ReactDOM from 'react-dom';
// import components from './components/hooks';
import App from './components/useContext&useReducer';
// ReactDOM.render(<components.Counter />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root')); */

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Table from './pages/Table';
import Drag from './pages/Drag';
import Form from './pages/Form';
import Circle from './pages/Circle';
ReactDOM.render(
  <div className='container'>
    <div className='row'>
      <div className='col-md-12' style={{ padding: 10 }}>
        <BrowserRouter>
          <ul className='nav nav-tabs'>
            <li>
              <Link to='/table'>Table</Link>
            </li>
            <li>
              <Link to='/drag'>Drag</Link>
            </li>
            <li>
              <Link to='/form'>Form</Link>
            </li>
            <li>
              <Link to='/circle'>Circle</Link>
            </li>
          </ul>
          <Routes>
            <Route path='/table' element={<Table />} />
            <Route path='/drag' element={<Drag />} />
            <Route path='/form' element={<Form />} />
            <Route path='/circle' element={<Circle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);
