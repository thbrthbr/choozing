import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/main';
import styled from 'styled-components';
import Router from './Router/router';

const $Header = styled.div`
  background-color: black;
  height: 80px;
`;

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
