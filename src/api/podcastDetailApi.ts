

export async function fetchPodcastData(id: string): Promise<void> {
  try {
    const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(allOriginsUrl);

    if (!response.ok) {
      throw new Error('Fetch no response.');
    }

    const responseData = await response.json();
    const data = JSON.parse(responseData.contents);

    let podcastsListData: { [key: string]: any } = JSON.parse(localStorage.getItem('podcastsListData') || '{}');

    podcastsListData[id] = data;

    localStorage.setItem('podcastsListData', JSON.stringify(podcastsListData));
  } catch (error) {
    console.error('Problem get fetch:', error);
  }
}





