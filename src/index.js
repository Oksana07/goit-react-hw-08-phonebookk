import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import App from './components/App';
import 'modern-normalize/modern-normalize.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<h2>Wait...</h2>} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
