import React from 'react';
import ReactDOM from 'react-dom/client';
import { FacebookProvider } from 'react-facebook';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FacebookProvider appId="340415318619128" cookie={true} xfbml={true} version="v13.0" >
      <App />
    </FacebookProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
