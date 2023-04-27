import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Modal from 'react-modal';
// import App from './Test';
//  import App from './InputData';

import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// import { PersistGate } from 'redux-persist/integration/react';
// import persistStore from 'redux-persist/es/persistStore';


const root = ReactDOM. createRoot(document.getElementById('root'));
// const persistor = persistStore(store);
Modal.setAppElement('#root'); 
root.render(
    <Provider store = {store}>
        {/* <PersistGate loading={null} persistor = {persistor}/> */}
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

