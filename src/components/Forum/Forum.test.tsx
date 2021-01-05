import React from 'react';
import ReactDOM from 'react-dom';
import Forum from './Forum';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Forum />, div);
  ReactDOM.unmountComponentAtNode(div);
});