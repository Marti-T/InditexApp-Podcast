import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { htmlConverterReact } from 'html-converter-react';

import { PodcastDetail } from '../../types/types';

export const PodcastCardDetail: FC = () => {

  const { chapterId } = useParams<{ chapterId: string }>();
  const [ chapter, setPodcastChapter ] = useState<PodcastDetail | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {

    setIsLoading(true);

    const localStorageCollectionsList = localStorage.getItem('localStorageCollectionsList');

    if (localStorageCollectionsList) {
      const podcastChapter: PodcastDetail[] = JSON.parse(localStorageCollectionsList);
      const findChapterId = podcastChapter.find(chapter => chapter.trackId == chapterId as any);

      if (findChapterId) {
        setPodcastChapter(findChapterId);
        setIsLoading(false);
      } else {
        setErrorMessage(`The chapter ${ chapter?.trackName } has not been found`);
        setIsLoading(false);
      }
    } else {
      setErrorMessage(`The chapter ${ chapter?.trackName } has not been found`);
      setIsLoading(false);
    }

  }, [chapterId]);


  return (
    <div className="podcast-card-detail">
      <div className="podcast-card-detail__content">
        {isLoading ? (
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
          <>
            <h2 className="podcast-card-detail__title">
              { chapter?.trackName }
            </h2>
            <div className="podcast-card-detail__description">
              { htmlConverterReact(( chapter?.description as string ).replace(/\n/g, '<br />')) }
            </div>
            <audio controls className="podcast-card-detail__audio">
              <source src={ chapter?.episodeUrl } type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </>
        )}
      </div>
    </div>
  );
};
