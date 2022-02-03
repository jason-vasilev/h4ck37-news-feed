import './NewsCard.scss';

function NewsCard() {
	return (
		<div className='news-card'>
			<img src="http://placekitten.com/g/300/200" className="news-card__story-img" alt="Kitten" />
			<h3>
				<a
					href="#.#"
					target="_blank"
					rel="noopener noreferrer"
				>
					Story title
				</a>
			</h3>
			<p>By <span className='news-card__author'><a href="#.#" target="_blank" rel="noopener noreferrer">Johnny Bravo</a></span><span className='news-card__author-points'>(11,174)</span></p>
			<p>Published <span className='news-card__date'>2 hours ago</span></p>
		</div>
	);
}

export default NewsCard;
