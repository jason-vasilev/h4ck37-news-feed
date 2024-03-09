import React, { useState, useEffect } from "react";
import "./NewsFeed.scss";
import NewsCard from "../NewsCard/NewsCard";

import { NewsFeedStory } from "../types";

function NewsFeed() {
  /*
   * change loading message depending on value
   * 0 - Loading...
   * 1 - Almost there
   * 2 - show content
   */
  let [isLoading, setLoading] = useState(2);
  let [randomStoriesData] = useState<string[]>([]);
  let [randomStoriesContent] = useState<NewsFeedStory[]>([]);

  /* Get a number of random elements from an array */
  /* https://stackoverflow.com/a/19270021/1121986 */
  function getRandom(arr: string[], n: number): string[] {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len) {
      throw new RangeError("getRandom: more elements taken than available");
    }

    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  useEffect(() => {
    /* besides stories, occasionally, there are a poll or two */
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then(
        (data) => {
          const randomStoryIds: string[] = getRandom(data, 10); // get an array of 10 story IDs as strings

          // Construct URLs with the randomStoryIds
          const storyUrls: string[] = randomStoryIds.map((storyId: string) => {
            return `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
          });

          setLoading(1); // let user know something is happening
          randomStoriesData = storyUrls;
        },
        (error) => {
          console.log("Error! Could not get top stories. ", error);
        }
      )
      .then(() => {
        const promises = randomStoriesData.map((story: string) => {
          return fetch(story)
            .then((response) => response.json())
            .then(
              (data) => {
                randomStoriesContent.push(data);
                return randomStoriesContent;
              },
              (error) => {
                console.log("Error! Could not collect stories. ", error);
                return randomStoriesContent; // return as-is
              }
            );
        });

        return Promise.all(promises); // Wait for all fetch operations to complete
      })
      .then(
        () => {
          // sort stories by highest score
          randomStoriesContent.sort((a: NewsFeedStory, b: NewsFeedStory) =>
            a.score < b.score ? 1 : b.score < a.score ? -1 : 0
          );

          setLoading(0);
        },
        (error) => {
          console.log("Could not sort stories. ", error);
        }
      );
  }, []); // Empty dependency array to run effect only once on component mount

  if (isLoading) {
    return <p>Loading... </p>;
  } else if (isLoading === 1) {
    return <p>Almost there!</p>;
  }

  return (
    <section className="news-feed">
      <header className="news-feed__header">
        <h2>Top 10 randomly selected </h2>
      </header>

      <div className="news-feed__wrapper">
        {randomStoriesContent &&
          randomStoriesContent.map((story: NewsFeedStory) => {
            return <NewsCard key={story.id} cardInfo={story} />;
          })}
      </div>
    </section>
  );
}

export default NewsFeed;
