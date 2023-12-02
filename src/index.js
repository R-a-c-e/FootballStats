import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { StateContextProvider } from './store/StateContext';

// We wrap everything inside the state context provider to access state from anywhere
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StateContextProvider>
		<App />
	</StateContextProvider>
);