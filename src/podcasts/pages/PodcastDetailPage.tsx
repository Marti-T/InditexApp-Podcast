import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Podcast } from '../../types/types';
import { PodcastCardDetail, PodcastCardSummary } from '../components';


export const PodcastDetailPage: FC = () => {

  const { podcastId } = useParams<{ podcastId: string }>();
  const [ podcast, setPodcast ] = useState<Podcast | null>(null);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {

    const localStoragePodcastsData = localStorage.getItem('localStoragePodcastsData');

    if (localStoragePodcastsData) {

      const podcasts: Podcast[] = JSON.parse(localStoragePodcastsData);
      const findPodcastId = podcasts.find(podcast => podcast.id === podcastId);

      if (findPodcastId) {
        setPodcast(findPodcastId);
      } else {
        setErrorMessage(`Podcast Summary not in found`);
      }

    } else {
      setErrorMessage(`No podcasts localStorage`);
    }
  }, [podcastId]);

  return (
    <div className="podcast-page">
      <div className="container">
        <div className="podcast-page__content">
          { errorMessage ? (
            <div className="error-message">
              <div className="error-message__content">
                { errorMessage }
              </div>
            </div>
          ) : podcast ? (
            <div className="podcast-page__card">
              <PodcastCardSummary podcast={ podcast } key={ podcast.id } />
            </div>
          ) : (
            <div className="loader">
              <div className="loader__content">
                <div className="loader__spinner"></div>
              </div>
            </div>
          )}
          <PodcastCardDetail />
        </div>
      </div>
    </div>
  );
};