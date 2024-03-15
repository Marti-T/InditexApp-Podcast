import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchPodcastCollection } from '../../api';
import { PodcastDetail } from '../../types/types';
import { formatDate, formatDurationTrack } from '../helpers';



export const PodcastList: FC = () => {

    const { podcastId } = useParams<{ podcastId: string }>();
    const [ filteredPodcasts, setFilteredPodcasts ] = useState<PodcastDetail[]>([]);
    const [ collectionCounts, setCollectionCounts ] = useState<{ [key: string]: number }>({});
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          let localStorageCollectionsList: PodcastDetail[] = JSON.parse(
            localStorage.getItem('localStorageCollectionsList') || '[]'
          );

          let existingPodcasts: PodcastDetail[] = localStorageCollectionsList.filter(podcast => podcast.collectionId == podcastId);

          if (existingPodcasts.length === 0) {
            setIsLoading(true);
            const podcastData = await fetchPodcastCollection(podcastId as string);
            if (!podcastData.results || podcastData.results.length === 0) {
              console.log('No results');
            }

            const formatPodcasts: PodcastDetail[] = podcastData.results.map((result: any) => ({ //hacer funcion remap
              collectionId: result.collectionId || '',
              collectionName: result.collectionName || '',
              trackName: result.trackName || '',
              releaseDate: result.releaseDate || '',
              trackId: result.trackId || '',
              trackTimeMillis: result.trackTimeMillis || '',
              description: result.description || '',
              episodeUrl: result.episodeUrl || '',
            }));

            const filteredFormatPodcasts = formatPodcasts.filter( podcast => podcast.episodeUrl?.trim() !== '');
            const newPodcastsToAdd = filteredFormatPodcasts.filter(
              podcast => !localStorageCollectionsList.find( item => item.trackId === podcast.trackId
              ));
            localStorageCollectionsList = [ ...localStorageCollectionsList, ...newPodcastsToAdd ];

            localStorage.setItem('localStorageCollectionsList', JSON.stringify(localStorageCollectionsList));

            const localStoragePodcastsTime = localStorage.getItem('localStoragePodcastsTime');
            const currentTime = Date.now();

            if (localStoragePodcastsTime && currentTime - parseInt(localStoragePodcastsTime) > 24 * 60 * 60 * 1000) {
              localStorage.removeItem('localStorageCollectionsList');
            }

            existingPodcasts = filteredFormatPodcasts.filter(podcast => podcast.collectionId == podcastId);

          }

          setFilteredPodcasts(existingPodcasts);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setErrorMessage('Error fetching podcast episodes. Please try again later.');
        }
      };

      fetchData();
    }, [ podcastId ]);



    useEffect(() => {
      const collectionCount = filteredPodcasts.length;
      setCollectionCounts({ [ podcastId as string ]: collectionCount });
    }, [ filteredPodcasts, podcastId ]);

    return (
      <div className="podcast-list">
        <div className="podcast-list__num-chapters">
          <h2 className="podcast-list__num-chapters-title">Episodes { collectionCounts[podcastId as string ]}</h2>
        </div>
        { isLoading ? (
          <div className="loader">
            <div className="loader__content">
              <div className="loader__spinner"></div>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="error-message">
            <div className="error-message__content">
              { errorMessage }
            </div>
          </div>
        ) : (
          <ul className="podcast-list__list">
            <li className="podcast-list__list-item podcast-list__list-item--head">
              <div className="podcast-list__head-title">Title</div>
              <div className="podcast-list__head-date">Date</div>
              <div className="podcast-list__head-time">Duration</div>
            </li>
            {filteredPodcasts.map((podcast, index) => (
              <li className="podcast-list__list-item" key={ index }>
                <Link to={`/podcast/${podcastId}/chapter/${podcast.trackId}`} className="podcast-list__link">
                  { podcast.trackName }
                </Link>
                <div className="podcast-list__list-date">{ formatDate(podcast.releaseDate) }</div>
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