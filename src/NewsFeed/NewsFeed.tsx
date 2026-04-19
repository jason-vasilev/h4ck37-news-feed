import React, { useState, useEffect } from "react";
import "./NewsFeed.scss";
import NewsCard from "../NewsCard/NewsCard";

import { NewsFeedStory } from "../types";

/* Get a number of random elements from an array */
/* https://stackoverflow.com/a/19270021/1121986 */
function getRandom<T>(arr: T[], n: number): T[] {
  const result = new Array<T>(n);
  let len = arr.length;
  const taken = new Array<number>(len);

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

const sortByScoreDesc = (a: NewsFeedStory, b: NewsFeedStory) =>
  b.score - a.score;

function NewsFeed() {
  const [loadingState, setLoading] = useState<string>("Loading...");
  const [stories, setStories] = useState<NewsFeedStory[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const run = async () => {
      try {
        const topRes = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json",
          { signal }
        );
        const topIds: number[] = await topRes.json();

        const randomStoryIds = getRandom(topIds, 10);

        setLoading("Almost there!");

        const storyResponses = await Promise.all(
          randomStoryIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
              signal,
            }).then((r) => r.json() as Promise<NewsFeedStory>)
          )
        );

        if (signal.aborted) return;

        const sorted = [...storyResponses].sort(sortByScoreDesc);

        setStories(sorted);
        setLoading("");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        console.log("Error! Could not load stories. ", error);
      }
    };

    run();

    return () => controller.abort();
  }, []);

  return loadingState.length > 0 ? (
    <p>{loadingState}</p>
  ) : (
    <section className="news-feed">
      <header className="news-feed__header">
        <h2>Top 10 randomly selected </h2>
      </header>

      <div className="news-feed__wrapper">
        {stories.map((story) => (
          <NewsCard key={story.id} cardInfo={story} />
        ))}
      </div>
    </section>
  );
}

export default NewsFeed;
