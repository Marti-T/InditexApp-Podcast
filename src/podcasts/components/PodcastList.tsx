import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchPodcastCollection } from '../../api/podcastDetailApi';
import { PodcastDetail } from '../../types/types';
import { formatDate, formatDurationTrack } from '../helpers';



export const PodcastList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ filteredPodcasts, setFilteredPodcasts] = useState<PodcastDetail[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ collectionCounts, setCollectionCounts ] = useState<{ [key: string]: number }>({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastData = await fetchPodcastCollection(id as string);

        if (!podcastData.results || podcastData.results.length === 0) {
          throw new Error('No results');
        }

        const formatPodcasts: PodcastDetail[] = podcastData.results.map((result: any) => ({
          collectionId: result.collectionId || '',
          collectionName: result.collectionName || result.trackName || '',
          trackName: result.trackName || '',
          releaseDate: result.releaseDate || '',
          trackId: result.trackId || '',
          trackTimeMillis: result.trackTimeMillis || '',
        }));

        let localStorageCollectionsList: PodcastDetail[] = JSON.parse(localStorage.getItem('localStorageCollectionsList') || '[]');

        formatPodcasts.forEach(podcast => {
          if (!localStorageCollectionsList.find(item => item.trackId === podcast.trackId)) {
            localStorageCollectionsList.push(podcast);
          }
        });

        localStorage.setItem('localStorageCollectionsList', JSON.stringify(localStorageCollectionsList));

        const localStoragePodcastsTime = localStorage.getItem('localStoragePodcastsTime');
        const currentTime = Date.now();

        if (localStoragePodcastsTime && (currentTime - parseInt(localStoragePodcastsTime)) > 24 * 60 * 60 * 1000) {
          localStorage.removeItem('localStorageCollectionsList');
        }

        setFilteredPodcasts(localStorageCollectionsList.filter(podcast => podcast.collectionId == id));

        setLoading(false);

      } catch (error) {
        console.error('Error fetching podcast chapters:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const collectionCount = filteredPodcasts.length;
    setCollectionCounts({ [id as any]: collectionCount });
  }, [filteredPodcasts, id]);

  return (
    <div className="podcast-list">
      <div className="podcast-list__num-chapters">
        <h2 className="podcast-list__num-chapters-title">Chapters {collectionCounts[id as any]}</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="podcast-list__list">
          <li className="podcast-list__list-item podcast-list__list-item--head">
            <div className="podcast-list__head-title">Title</div>
            <div className="podcast-list__head-date">Date</div>
            <div className="podcast-list__head-time">Duration</div>
          </li>
          {filteredPodcasts.map((podcast, index) => (
            <li className="podcast-list__list-item" key={index}>
              <Link
                to={`/podcast/${id}/chapter/${ podcast.trackId }`}
                className="podcast-list__link"
              >
                {podcast.trackName}
              </Link>
              <div className="podcast-list__list-date">
                { formatDate(podcast.releaseDate) }
              </div>
              <div className="podcast-list__list-time">
                { podcast.trackTimeMillis ? formatDurationTrack(podcast.trackTimeMillis) : '' }
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
