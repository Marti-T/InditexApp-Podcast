import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Podcast } from '../../types/types';
import { PodcastCardDetail, PodcastCardSummary } from '../components';


export const PodcastDetailPage: FC = () => {

  const { podcastId } = useParams<{ podcastId: string }>();
  const [ podcast, setPodcast ] = useState<Podcast | null>(null);

  useEffect(() => {

    const localStoragePodcastsData = localStorage.getItem('localStoragePodcastsData');

    if (localStoragePodcastsData) {

      const podcasts: Podcast[] = JSON.parse(localStoragePodcastsData);
      const findPodcastId = podcasts.find(podcast => podcast.id === podcastId);

      if (findPodcastId) {
        setPodcast(findPodcastId);
      } else {
        console.error('Podcast not in localStorage');
      }

    } else {
      console.error('No podcasts localStorage');
    }
  }, [podcastId]);

  return (
    <div className="podcast-page">
      <div className="container">
        <div className="podcast-page__content">
          { podcast ? (
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