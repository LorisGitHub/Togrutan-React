import React from 'react';
import ReactDOM from 'react-dom';
import MediaModal from './MediaModal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MediaModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});