import React, { useState } from "react";
import "./NewsCard.scss";

import { NewsFeedStory } from "../types";


function NewsCard(props: any) {
  const { cardInfo } = props;

  const [authorKarma, setAuthorKarma] = useState("");

  const timeSince = (postTime: number) => {
    var unixTimeNow = Math.round(Date.now() / 1000);
    const timeDiff = unixTimeNow - postTime; /* in seconds */

    const days = Math.floor(timeDiff / (60 * 60 * 24));
    const hours = Math.floor((timeDiff / (60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 60) % 60);

    if (days > 1) {
      return `${days} days ago`;
    } else if (days > 0) {
      return `${days} day ago`;
    }

    if (hours > 0) {
      return `${hours} hours ago`;
    }

    if (minutes > 5) {
      return `${minutes} minutes ago`;
    } else {
      return ` just few minutes ago`;
    }
  };

  /* for the sake of having different images */
  const imageId = (id: number) => {
    const idLength = String(id).length;
    return String(id)[idLength - 1];
  };

  const timeAgo = timeSince(cardInfo.time);

  /* get author karma points on author link hover */
  const getKarmaPoints = () => {
    fetch(`https://hacker-news.firebaseio.com/v0/user/${cardInfo.by}.json`)
      .then((response) => response.json())
      .then(
        (data) => {
          setAuthorKarma(`${data.karma} karma`);
        },
        (error) => {
          console.log("Could not get author karma points", error);
        }
      );
  };

  return (
    <div className="news-card">
      <figure className="news-card__media">
        <picture className="news-card__picture">
          {/* in an optimal case there will be source sets for webp, too */}
          <source
            media="(max-width: 768px)"
            srcSet={`https://picsum.photos/seed/D4-${imageId(
              cardInfo.id
            )}/640/360,
								https://picsum.photos/seed/D4-${imageId(cardInfo.id)}/1280/720 2x`}
            type="image/jpeg"
          />
          <source
            media="(min-width: 769px)"
            srcSet={`https://picsum.photos/seed/D4-${imageId(
              cardInfo.id + 1
            )}/640/360,
								https://picsum.photos/seed/D4-${imageId(cardInfo.id + 1)}/1280/720 2x`}
            type="image/jpeg"
          />
          <img
            srcSet={`https://picsum.photos/seed/D4-${imageId(
              cardInfo.id
            )}/640/360,
							https://picsum.photos/seed/D4-${imageId(cardInfo.id)}/1280/720 2x`}
            width="640"
            height="360"
            className="news-card__image"
            alt="4 kittens in a picnic basket"
          />
        </picture>
        {cardInfo.score && (
          <span className="news-card__points"> SCORE: {cardInfo.score}</span>
        )}
      </figure>

      <div className="news-card__content">
        <h3 className="news-card__title">
          {cardInfo.url && (
            <a
              className="news-card__title-link"
              href={cardInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              title={cardInfo.title}
            >
              {cardInfo.title}
            </a>
          )}
          {/* Don't wrap with a link tag if the story type is a poll */}
          {!cardInfo.url && cardInfo.title}
        </h3>

        <div className="news-card__meta-content">
          <p>
            By
            <span className="news-card__author">
              <a
                href={`https://news.ycombinator.com/user?id=${cardInfo.by}`}
                target="_blank"
                rel="noopener noreferrer"
                title={authorKarma}
                className="news-card__author-link"
                onMouseOver={getKarmaPoints}
                onFocus={getKarmaPoints}
              >
                {cardInfo.by}
              </a>
            </span>
            {timeAgo && <span className="news-card__date"> {timeAgo}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
