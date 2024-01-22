import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.css";
import './index.css';
import App from './App';
import {AuthContextProvider} from './Admin/Context/context';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {HomeContextProvider} from "./PublicDisplay/Context/contect";

axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>

                <HomeContextProvider>
                    <App />
                </HomeContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
