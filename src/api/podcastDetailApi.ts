import axios from 'axios';

export async function fetchPodcastCollection(collectionId: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=20`)}`
    );

    if (response.status !== 200) {
      console.log('Server not response.');
    }

    return JSON.parse(response.data.contents);
  } catch (error) {
    console.log('Error fetching podcast collection: ', error);
  }
}
