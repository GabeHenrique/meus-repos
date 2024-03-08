import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";
import NotFound from "./pages/Error";
import GlobalStyle from "./styles/global"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <NotFound/>
  },
  {
    path: "/repositorio/:repositorio",
    element: <Repositorio/>,
    errorElement: <NotFound/>
  }

]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle/>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
