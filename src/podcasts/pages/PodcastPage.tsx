import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Podcast } from '../../types/types';
import { PodcastCardSummary, PodcastList } from '../components';


export const PodcastPage: FC = () => {

  const { podcastId } = useParams<{ podcastId: string }>();
  const [ podcast, setPodcast ] = useState<Podcast | null>(null);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  useEffect(() => {

    const localStoragePodcastsData = localStorage.getItem('localStoragePodcastsData');

    if (localStoragePodcastsData) {

      const podcasts: Podcast[] = JSON.parse(localStoragePodcastsData);
      const findPodcastId = podcasts.find(podcast => podcast.id === podcastId);

      if (findPodcastId) {
        setPodcast(findPodcastId);
      } else {
        setErrorMessage('Podcast not in localStorage');
      }

    } else {
      setErrorMessage('No podcasts in localStorage');
    }

  }, [podcastId]);

  return (
    <div className="podcast-page">
      <div className="container">
        <div className="podcast-page__content">

          { errorMessage &&
            <div className="error-message">
                <div className="error-message__content">
                  { errorMessage }
                </div>
            </div>
          }

          { !errorMessage && !podcast &&
            <div className="loader">
                <div className="loader__content">
                    <div className="loader__spinner"></div>
                </div>
            </div>
          }
          { podcast && (
            <div className="podcast-page__card">
              <PodcastCardSummary podcast={ podcast } key={ podcast.id } />
            </div>
          )}
          <PodcastList />
        </div>
      </div>
    </div>
  );
};