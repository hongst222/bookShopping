import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Modal from 'react-modal';
// import App from './Test';
//  import App from './InputData';

import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './routes';

const root = ReactDOM. createRoot(document.getElementById('root'));
Modal.setAppElement('#root'); 
root.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

