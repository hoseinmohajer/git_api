import React from 'react';
import ReactDOM from 'react-dom';
import GetApi from './getApis';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<GetApi />
	</div>,
	document.getElementById('root')
);
registerServiceWorker();
