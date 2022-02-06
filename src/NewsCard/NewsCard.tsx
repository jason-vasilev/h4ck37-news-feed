import React, { useState } from 'react';
import './NewsCard.scss';

function NewsCard(props: any) {
	const {
		cardInfo,
	} = props;

	const [authorKarma, setauthorKarma] = useState('');

	const onMouseOverHandle = () => {
		fetch(`https://hacker-news.firebaseio.com/v0/user/${cardInfo.by}.json`)
		.then(response => response.json())
		.then(
			(data) => {
				console.log(data.karma);
				setauthorKarma(`${data.karma} karma`);
			},
			(error) => {
				console.log('Could not get author karma points', error);
			}
		)
	};

	return (
		<div className='news-card' key={cardInfo.cardId}>
			<img src='http://placekitten.com/g/300/200' className='news-card__story-img' alt='Kitten' />
			<h3>
				<a
					href={cardInfo.url}
					target='_blank'
					rel='noopener noreferrer'
				>
					{cardInfo.title}
				</a>
			</h3>
			<p>By <span className='news-card__author'>
				<a
					href={`https://news.ycombinator.com/user?id=${cardInfo.by}`}
					target='_blank'
					rel='noopener noreferrer'
					title={authorKarma}
					onMouseOver={onMouseOverHandle}
				>
					{cardInfo.by}
				</a>
				
				</span><span className='news-card__author-points'>SCORE: {cardInfo.score}</span></p>
			<p>Published <span className='news-card__date'>{cardInfo.time}</span></p>
		</div>
	);
}

export default NewsCard;
