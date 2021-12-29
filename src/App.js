import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes/app.routes';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes />;
    </>
  );
}

export default App;
