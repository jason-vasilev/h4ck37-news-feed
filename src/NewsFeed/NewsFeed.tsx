import React from 'react';
import './NewsFeed.scss';
import NewsCard from '../NewsCard/NewsCard';

class NewsFeed extends React.Component<{}, { randomStories: any, hasLoaded: boolean }> {
	constructor(props : any) {
		super(props);
   
		this.state = {
			randomStories: [],
			hasLoaded: false
		};
	}
	
	componentDidMount() {
		fetch ('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())
		.then(data => {
			this.setState({
				randomStories: this.getRandom(data, 10),
				hasLoaded: true
			});
		});
	}

	getRandom(arr: string, n: number) {
		/* How to get a number of random elements from an array? */
		/* https://stackoverflow.com/a/19270021/1121986 */
		const result = new Array(n);
		let len = arr.length;
		const taken = new Array(len);
	
		if (n > len) {
			throw new RangeError('getRandom: more elements taken than available');
		}
		
		while (n--) {
			const x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		
		return result;
	}

	render() {
		const { hasLoaded, randomStories } = this.state;
        
		if (!hasLoaded) {
			return <p>Loading... </p>
		};

		return (
			<section className='news-feed'>
				<h2 className='news-feed__headline'>Top Random Stories <span>(by karma points)</span></h2>

				<div className="news-feed__wrapper">
					
					{randomStories && (
						randomStories.map((item : object, index : any) => {
							return <NewsCard key={item} cardId={item} />;
						})
					)}
				</div>
			</section>
		);
	}
}

export default NewsFeed;
