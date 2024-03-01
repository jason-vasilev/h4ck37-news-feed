export interface NewsFeedStory {
  text: string;
  score: number;
  kids?: Kid;
  time: number;
  title: string;
  type: string;
  id: number;
  by: string;
}

interface Kid {
  index: number;
}
