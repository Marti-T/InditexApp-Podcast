import axios from 'axios';
import { Podcast } from './../types/types';


export const getPodcasts = async (): Promise<Podcast[]> => {
  try {
    const response = await axios.get(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    );

    return response.data.feed.entry.map((entry: any) => ({
      id: entry.id.attributes['im:id'],
      name: entry['im:name'].label,
      artist: entry['im:artist'].label,
      image: entry['im:image'][2].label,
      summary: entry['summary'].label,
    }));

  } catch (error) {

    console.error('Error getting podcasts:', error);
    throw error;
  }
};