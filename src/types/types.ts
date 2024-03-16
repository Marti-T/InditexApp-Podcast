

export interface Podcast {
  id: string;
  name: string;
  image: string;
  artist: string;
  summary: string;
}


export interface PodcastDetail {
  collectionId: string;
  collectionName?: string;
  trackName?: string;
  releaseDate: string;
  trackId: number;
  trackTimeMillis?: number;
  description?: string;
  episodeUrl?: string;
}

