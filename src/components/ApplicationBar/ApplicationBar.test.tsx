import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './ApplicationBar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});