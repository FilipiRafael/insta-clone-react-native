import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <Routes />
    </>
  )
}

export default App;