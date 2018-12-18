import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default () => {
    const element = <p>Hello World</p>;
    ReactDOM.render(element, document.getElementById('app-root'));
}
