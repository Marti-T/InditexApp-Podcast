import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastData } from './../../api/podcastDetailApi';
import { Podcast } from '../../types/types';
import { PodcastCardSummary } from '../components/PodcastCardSummary';


export const PodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del podcast de los parámetros de la URL
  const [ podcast, setPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    const localStoragePodcastsData = localStorage.getItem('localStoragePodcastsData');
    if (localStoragePodcastsData) {
      const podcasts: Podcast[] = JSON.parse(localStoragePodcastsData);
      const findPodcastId = podcasts.find(podcast => podcast.id === id);

      if (findPodcastId) {
        setPodcast(findPodcastId);
      } else {
        fetchPodcastData(id as string)
          .then(data => {
            setPodcast(data as any);
          })
          .catch(error => {
            console.error('Error find podcast id:', error);
          });
      }
    }
  }, [id]);

  return (
    <div className="podcast-page">
      <div className="container">
        <div className="podcast-page__content">
          { podcast ? (
              <div className="podcast-page__card">
                <PodcastCardSummary podcast={ podcast } key={ podcast.id } />
              </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="podcast-page__list">
            <p>List podcasts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

