import axios from 'axios';
import { Podcast } from './../types/types';

interface IApiPodcastResponse {
  status: string,
  data: Podcast[] | any,
}

export const getPodcasts = async (): Promise<IApiPodcastResponse> => {
  try {
    const response = await axios.get(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    );

    const data = response.data.feed.entry.map((entry: any) => ({
      id: entry.id.attributes['im:id'],
      name: entry['im:name'].label,
      artist: entry['im:artist'].label,
      image: entry['im:image'][2].label,
      summary: entry['summary'].label,
    }));

    return {
      status: 'success',
      data
    };

  } catch (error: any) {
    console.log('Error getting podcasts:', error.message);
    return {
      status: 'fail',
      data: error.message
    };
  }
};