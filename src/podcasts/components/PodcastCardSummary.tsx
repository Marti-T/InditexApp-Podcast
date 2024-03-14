import { FC } from 'react';
import { Link } from "react-router-dom";

import { Podcast } from '../../types/types';


interface PodcastCardProps {
  podcast: Podcast;
  podcastId: string;
}

export const PodcastCardSummary: FC<PodcastCardProps> = ({ podcast, podcastId }) => {
  return (
    <div className="podcast-card-summary">
      <div className="podcast-card-summary__item">
        { podcastId ? (
          <Link to={`/podcast/${podcastId}`}>
            <img
              src={ podcast.image }
              alt={ podcast.name }
              className="podcast-card-summary__image"
            />
          </Link>
        ) : (
          <img
            src={ podcast.image }
            alt={ podcast.name }
            className="podcast-card-summary__image"
          />
        )}
        <div className="podcast-card-summary__title">
          <b>{ podcast.name }</b>
          <br />
          <i>by</i>  { podcastId ? ( <Link to={`/podcast/${ podcastId }`} className="podcast-card-summary__link">{ podcast.artist }</Link>
          ) : (
              <div className="podcast-card-summary__link podcast-card-summary__link--no-link">{ podcast.artist }</div>
          )}
        </div>
        <p className="podcast-card-summary__title-description">Description:</p>
        <p className="podcast-card-summary__summary">{ podcast.summary }</p>
      </div>
    </div>
  );
};
