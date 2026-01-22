import React from 'react';
import Author from './features/Author';
import AuthorLogin from './features/components/AuthorLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import Error from './features/components/Error';
import Protected from './features/components/Protected';

const routes = [
  { path: '/', element: <Protected><Author /></Protected> },
  { path: '/login', element: <AuthorLogin /> },
  { path: "*", element: <Error /> },
];

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;