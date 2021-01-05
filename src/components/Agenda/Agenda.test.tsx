import React from 'react';
import ReactDOM from 'react-dom';
import Agenda from "./Agenda";

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Agenda />, div);
  ReactDOM.unmountComponentAtNode(div);
});