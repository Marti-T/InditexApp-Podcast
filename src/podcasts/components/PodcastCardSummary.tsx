import { FC } from 'react';

import { Podcast } from '../../types/types';


interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCardSummary: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="podcast-card-summary">
      <div className="podcast-card-summary__item">
        <img
          src={ podcast.image }
          alt={ podcast.name }
          className="podcast-card-summary__image"
        />
        <p className="podcast-card-summary__title"><b>{ podcast.name }</b><br /> <i>by { podcast.artist }</i></p>
        <p className="podcast-card-summary__title-description">Description:</p>
        <p className="podcast-card-summary__summary">{ podcast.summary }</p>
      </div>
    </div>
  );
};
