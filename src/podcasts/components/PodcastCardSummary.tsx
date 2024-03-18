import { FC } from 'react';
import { Link } from "react-router-dom";

import { Podcast } from '../../types/types';

const baseUrl = import.meta.env.VITE_API_URL;

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCardSummary: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="podcast-card-summary">
      <div className="podcast-card-summary__item">
        <Link to={`${baseUrl}/podcast/${podcast.id}`}>
          <img
            src={ podcast.image }
            alt={ podcast.name }
            className="podcast-card-summary__image"
          />
        </Link>
        <div className="podcast-card-summary__title">
          <b>{ podcast.name }</b>
          <br />
          <i>by</i>  <Link to={`${baseUrl}/podcast/${ podcast.id }`} className="podcast-card-summary__link">{ podcast.artist }</Link>
        </div>
        <p className="podcast-card-summary__title-description">Description:</p>
        <p className="podcast-card-summary__summary">{ podcast.summary }</p>
      </div>
    </div>
  );
};
