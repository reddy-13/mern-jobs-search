import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter
  
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import store from './store/store';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ErrorPage from './pages/error.page';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));


const user = localStorage.getItem('user');
const router = createBrowserRouter([
  {
    path : '/',
    element: <Login/>,
    errorElement : <ErrorPage/>,
    index: true,
  },
  {
    path : '/login',
    element : <Login/>
  }
]);


const protectedRouter = createBrowserRouter([
  
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        index: true, 
        element: <Dashboard/> 
      },
      {
        path :'/profile',
        element: <Profile/>
      }
    ],
  },
  
],
)


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={!user ? router : protectedRouter    } />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
