import React from 'react';
import { createRoot } from 'react-dom/client';
import NewsFeed from './NewsFeed/NewsFeed';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss';

const container = document.getElementById('root');
if (!container) {
	throw new Error('Root container #root not found');
}

const root = createRoot(container);
root.render(
	<React.StrictMode>
		<main id="main" className="container">
			<h1>h4ck37 news</h1>
			<NewsFeed />
		</main>
	</React.StrictMode>
);

reportWebVitals();
