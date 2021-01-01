import React from 'react';
import ReactDOM from 'react-dom';
import Catalogue from "./Catalogue";

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Catalogue />, div);
  ReactDOM.unmountComponentAtNode(div);
});