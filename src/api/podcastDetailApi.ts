import axios from 'axios';
import { Podcast } from '../types/types';

interface IApiPodcastCollection {
  status: string,
  data: Podcast[] | any,
}

export async function getPodcastCollection(collectionId: string): Promise<IApiPodcastCollection> {
  try {
    const response = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=20`)}`
    );

    const data = JSON.parse(response.data.contents);

    return {
      status: 'success',
      data
    };

  } catch (error: any) {
    console.log('Error getting collections:', error.message);
    return {
      status: 'fail',
      data: error.message
    };
  }
};