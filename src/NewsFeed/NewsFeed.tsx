import './NewsFeed.scss';
/* import NewsCard from '../NewsCard/NewsCard'; */

function getRandom(arr: string | any[], n: number) {
	const result = new Array(n);
	let len = arr.length;
	const taken = new Array(len);

	if (n > len) {
		throw new RangeError('getRandom: more elements taken than available');
	}
	
	/* TODO: figure why it executes twice */
	while (n--) {
		const x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}

	return result;
}

function NewsFeed() {
	let randomStories;

	fetch ('https://hacker-news.firebaseio.com/v0/topstories.json')
	.then(response => response.json())
	.then(data => {
		const randomStories = getRandom(data, 10);
		Object.keys(randomStories).forEach((key, i) => {
			console.log(randomStories[i]);
		});
	});
	
	return (
		<section className='news-feed'>
			<h2 className='news-feed__headline'>Top Random Stories <span>(by karma points)</span></h2>

			<div className="news-feed__wrapper">
				{/* <NewsCard /> */}
				
				{randomStories.map((randomStory) => {
					return (
						<div className='news-card'>
							<img src='http://placekitten.com/g/300/200' className='news-card__story-img' alt='Kitten' />
							<h3>
								<a
									href={`https://hacker-news.firebaseio.com/v0/item/${randomStory}.json`}
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
				})}

			</div>
		</section>
	);
}

export default NewsFeed;
