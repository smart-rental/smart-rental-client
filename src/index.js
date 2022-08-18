import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { CssBaseline } from "@mui/material";

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(
    <CssBaseline>
        <App/>
    </CssBaseline>
);