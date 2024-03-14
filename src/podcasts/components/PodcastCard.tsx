import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Podcast } from '../../types/types';


interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="podcast-card">
      <Link to={`/podcast/${ podcast.id }`} key={ podcast.id }>
        <li>
          <div className="podcast-card__item">
            <img
              src={ podcast.image }
              alt={ podcast.name }
              className="podcast-card__image"
            />
            <p className="podcast-card__title">{ podcast.name }</p>
            <p className="podcast-card__author">Author: { podcast.artist }</p>
          </div>
        </li>
      </Link>
    </div>
  );
};
