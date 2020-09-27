import React from 'react';
import ReactDOM from 'react-dom';
import content from './content';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<content />, div);
  ReactDOM.unmountComponentAtNode(div);
});