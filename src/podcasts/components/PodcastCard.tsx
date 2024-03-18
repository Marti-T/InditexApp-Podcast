import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Podcast } from '../../types/types';

const baseUrl = import.meta.env.VITE_API_URL;

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="podcast-card">
      <Link to={`${baseUrl}/podcast/${ podcast.id }`} key={ podcast.id }>
        <li>
          <div className="podcast-card__item">
            <img
              src={ podcast.image }
              alt={ podcast.name }
              className="podcast-card__image"
              aria-label="image-card"
            />
            <p className="podcast-card__title" aria-label="name-card">
              { podcast.name }
            </p>
            <p
              className="podcast-card__author"
              aria-label="author-card"
            >
              Author: { podcast.artist }
            </p>
          </div>
        </li>
      </Link>
    </div>
  );
};
