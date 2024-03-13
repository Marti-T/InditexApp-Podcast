import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Podcast } from '../../types/types';
import { PodcastCardSummary } from '../components/PodcastCardSummary';
import { PodcastList } from '../components/PodcastList';

export const PodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del podcast de los parámetros de la URL
  const [ podcast, setPodcast ] = useState<Podcast | null>(null);

  useEffect(() => {
    const localStoragePodcastsData = localStorage.getItem('localStoragePodcastsData');
    if (localStoragePodcastsData) {
      const podcasts: Podcast[] = JSON.parse(localStoragePodcastsData);
      const findPodcastId = podcasts.find(podcast => podcast.id === id);

      if (findPodcastId) {
        setPodcast(findPodcastId);
      } else {
        console.error('Podcast not found in localStorage');
      }
    } else {
      console.error('No podcasts data in localStorage');
    }
  }, [id]);

  return (
    <div className="podcast-page">
      <div className="container">
        <div className="podcast-page__content">
          {podcast ? (
            <div className="podcast-page__card">
              <PodcastCardSummary podcast={ podcast } key={ podcast.id } />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <PodcastList />
        </div>
      </div>
    </div>
  );
};