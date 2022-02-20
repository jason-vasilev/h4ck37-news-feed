import React from 'react';
import './NewsFeed.scss';
import NewsCard from '../NewsCard/NewsCard';

class NewsFeed extends React.Component<{}, { randomStories: any[], hasLoaded: number }> {
	randomStoriesData: any;
	randomStoriesContent: any[] = [];
	constructor(props : any) {
		super(props);
		
		this.state = {
			randomStories: [],
			hasLoaded: 0
		};
	}
	
	/* How to get a number of random elements from an array? */
	/* https://stackoverflow.com/a/19270021/1121986 */
	getRandom(arr: string, n: number) {
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
	
	componentDidMount() {
		/* besides stories, occasionally, there are a poll or two */
		fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())
		.then((data) => {
			this.setState({
				randomStories: this.getRandom(data, 10),
				hasLoaded: 1
			});

			this.randomStoriesData = this.state.randomStories.map((storyId: string) => {
				return `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
			});
		},
		(error) => {
			console.log('Error! Could not get top stories. ', error);
		})
		.then((randomStoriesData) => {
			Object.entries(this.randomStoriesData).forEach((value: any) => {
				fetch(value[1])
				.then(response => response.json())
				.then(
					(data) => {
						this.randomStoriesContent.push(data);
					},
					(error) => {
						console.log('Error! Could not get data of stories. ', error);
					}
				)
				.then((randomStoriesContent) => {
					this.randomStoriesContent.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
					this.setState({ hasLoaded: 2 });
				},
				(error) => {
					console.log('Could not sort stories. ', error);
				});
			});
		})
	}

	render() {
		const { hasLoaded } = this.state;

		if (!hasLoaded) {
			return <p>Loading... </p>
		} else if (hasLoaded === 1) {
			return <p>Almost there!</p>
		}

		return (
			<section className='news-feed'>
				<header className='news-feed__header'>
					<h2>Section title</h2>
					<p>Section tagline / description</p>
				</header>

				<div className='news-feed__wrapper'>
					{this.randomStoriesContent && (
						this.randomStoriesContent.map((item : any) => {
							return (
								<NewsCard
									key={item.id}
									cardInfo={item}
								/>
							)
						})
					)}
				</div>
			</section>
		);
	}
}

export default NewsFeed;
