import React from 'react';
import ReactDOM from 'react-dom';
import movieCard from './movieCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<movieCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});