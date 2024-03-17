import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


import { formatDate, formatDurationTrack } from '../helpers';
import { useFetchCollections } from '../hooks';


export const PodcastList: FC = () => {

    const { podcastId } = useParams<{ podcastId: string }>();
    const [ collectionCounts, setCollectionCounts ] = useState<{ [key: string]: number }>({});

    const { collections, isLoadingCollections, errorMessage } = useFetchCollections();

    useEffect(() => {
      const collectionCount = collections.length;
      setCollectionCounts({ [ podcastId as string ]: collectionCount });
    }, [ collections, podcastId ]);

    return (
      <div className="podcast-list">
        <div className="podcast-list__num-chapters">
          <h2 className="podcast-list__num-chapters-title">Episodes { collectionCounts[podcastId as string ]}</h2>
        </div>
        { isLoadingCollections ? (
          <div className="loader">
            <div className="loader__content">
              <div className="loader__spinner"></div>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="error-message">
            <div className="error-message__content">
              { errorMessage }
            </div>
          </div>
        ) : (
          <ul className="podcast-list__list">
            <li className="podcast-list__list-item podcast-list__list-item--head">
              <div className="podcast-list__head-title">Title</div>
              <div className="podcast-list__head-date">Date</div>
              <div className="podcast-list__head-time">Duration</div>
            </li>
            { collections.map((podcast, index) => (
              <li className="podcast-list__list-item" key={ index }>
                <Link to={`/podcast/${podcastId}/chapter/${podcast.trackId}`} className="podcast-list__link">
                  { podcast.trackName }
                </Link>
                <div className="podcast-list__list-date">{ formatDate(podcast.releaseDate) }</div>
                <div className="podcast-list__list-time">
                  { podcast.trackTimeMillis ? formatDurationTrack(podcast.trackTimeMillis) : '' }
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };