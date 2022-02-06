import React from 'react';
import './NewsCard.scss';

class NewsCard extends React.Component<{ cardId: number }, { cardData: any, hasLoaded: boolean }> {
	constructor(props : any) {
		super(props)
		const {
			cardId
		} = props;
	
		this.state = {
			cardData: [],
			hasLoaded: false
		};
	}

	componentDidMount() {
		fetch (`https://hacker-news.firebaseio.com/v0/item/${this.props.cardId}.json`)
		.then(response => response.json())
		.then(data => {
			this.setState({
				cardData: data,
				hasLoaded: true
			});
		});
	}

	render() {

		const { hasLoaded, cardData } = this.state;

		if (!hasLoaded) {
			console.log(cardData);
			return <p>Loading... </p>
		};

		return (
			<div className='news-card'>
				<img src='http://placekitten.com/g/300/200' className='news-card__story-img' alt='Kitten' />
				<h3>
					<a
						href={`https://hacker-news.firebaseio.com/v0/item/${this.props.cardId}.json`}
						target='_blank'
						rel='noopener noreferrer'
					>
						Story title
					</a>
				</h3>
				<p>By <span className='news-card__author'><a href='#.#' target='_blank' rel='noopener noreferrer'>Johnny Bravo</a></span><span className='news-card__author-points'>(11,174)</span></p>
				<p>Published <span className='news-card__date'>2 hours ago</span></p>
			</div>
		);
	}

}

export default NewsCard;
