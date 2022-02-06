import React, { useState } from 'react';
import './NewsCard.scss';

function NewsCard(props: any) {
	const {
		cardInfo,
	} = props;

	const [authorKarma, setAuthorKarma] = useState('');

	const realTime = (postTime: number) => {
		var unixTimeNow = Math.round(Date.now() / 1000);
		const timeDiff = unixTimeNow - postTime; /* in seconds */

		const days = Math.floor((timeDiff / (60 * 60 * 24)));
		const hours = Math.floor((timeDiff / (60 * 60)) % 24);
		const minutes = Math.floor((timeDiff / 60) % 60);

		if (days > 0) {
			return `${days} days ago`;
		}

		if (hours > 0) {
			return `${hours} hours ago`;
		}

		if (minutes > 5) {
			return  `${minutes} minutes ago`;
		} else {
			return ` just few minutes ago`;
		}
	}

	const timeAgo = realTime(cardInfo.time);

	/* get author karma points */
	const onMouseOverHandle = () => {
		fetch(`https://hacker-news.firebaseio.com/v0/user/${cardInfo.by}.json`)
		.then(response => response.json())
		.then(
			(data) => {
				setAuthorKarma(`${data.karma} karma`);
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
				
				</span>
				
				{cardInfo.score && (
					<span className='news-card__author-points'>SCORE: {cardInfo.score}</span>
				)}
			</p>
				
			{timeAgo && (
				<p>Published <span className='news-card__date'>{timeAgo}</span></p>
			)}
			
		</div>
	);
}

export default NewsCard;
