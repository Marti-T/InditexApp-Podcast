import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchPodcastCollection } from '../../api';
import { PodcastDetail } from '../../types/types';
import { formatDate, formatDurationTrack } from '../helpers';



export const PodcastList: FC = () => {

  const { podcastId } = useParams<{ podcastId: string }>();
  const [ filteredPodcasts, setFilteredPodcasts] = useState<PodcastDetail[]>([]);
  const [ collectionCounts, setCollectionCounts ] = useState<{ [key: string]: number }>({});
  const [ isLoading, setIsLoading ] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const podcastData = await fetchPodcastCollection(podcastId as string);
        podcastData.results = podcastData.results.slice(1);

        console.log("podcastData: ", podcastData);

        if (!podcastData.results || podcastData.results.length === 0) {
          throw new Error('No results');
        }

        const formatPodcasts: PodcastDetail[] = podcastData.results.map((result: any) => ({
          collectionId: result.collectionId || '',
          collectionName: result.collectionName || '',
          trackName: result.trackName || '',
          releaseDate: result.releaseDate || '',
          trackId: result.trackId || '',
          trackTimeMillis: result.trackTimeMillis || '',
          description: result.description || '',
          episodeUrl: result.episodeUrl || '',
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

        setFilteredPodcasts(localStorageCollectionsList.filter(podcast => podcast.collectionId == podcastId));

        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching podcast chapters:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [podcastId]);

  useEffect(() => {
    const collectionCount = filteredPodcasts.length;
    setCollectionCounts({ [podcastId as any]: collectionCount });
  }, [filteredPodcasts, podcastId]);

  return (
    <div className="podcast-list">
      {isLoading ? (
        <>
          <div className="podcast-list__num-chapters">
            <h2 className="podcast-list__num-chapters-title">Chapters {collectionCounts[podcastId as any]}</h2>
          </div>
          <div className="loader">
            <div className="loader__content">
              <div className="loader__spinner"></div>
            </div>
          </div>
        </>
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
                to={`/podcast/${podcastId}/chapter/${ podcast.trackId }`}
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
