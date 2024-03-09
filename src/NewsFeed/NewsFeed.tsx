import React, { useState, useEffect } from "react";
import "./NewsFeed.scss";
import NewsCard from "../NewsCard/NewsCard";

import { NewsFeedStory } from "../types";

function NewsFeed() {
  let [hasLoaded, setLoading] = useState(0);
  let [randomStoriesData, setRandomStoriesData] = useState<string[]>([]);

  let randomStoriesContent: NewsFeedStory[] = [];
  let storyUrls: string[];

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
          const randomStoryIds: string[] = getRandom(data, 10); // Assuming getRandom returns an array of story IDs as strings

          // Construct URLs from story IDs
          storyUrls = randomStoryIds.map((storyId: string) => {
            return `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
          });

          setLoading(1);
          // setRandomStories(randomStoryIds);
          setRandomStoriesData(storyUrls);
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
          // supposed to sort stories by highest score
          randomStoriesContent.sort((a: NewsFeedStory, b: NewsFeedStory) =>
            a.score < b.score ? 1 : b.score < a.score ? -1 : 0
          );

          console.log("After sort: ", randomStoriesContent);
          setLoading(2);
        },
        (error) => {
          console.log("Could not sort stories. ", error);
        }
      );
  }, []); // Empty dependency array to run effect only once on component mount

  if (!hasLoaded) {
    return <p>Loading... </p>;
  } else if (hasLoaded === 1) {
    return <p>Almost there!</p>;
  }

  return (
    <section className="news-feed">
      <header className="news-feed__header">
        <h2>Section title</h2>
        <p>Section tagline / description</p>
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
