import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  badge: {
		height: 60,
		width: 60,
		secondary: { main: '#11cb5f' }
	},
});
ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>
				<App />
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById('root')
);

registerServiceWorker();
