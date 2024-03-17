import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PodcastDetail } from '../../types/types';
import { getPodcastCollection } from '../../api';

export const useFetchCollections = () => {

  const { podcastId } = useParams<{ podcastId: string }>();
  const [ collections, setCollections ] = useState<PodcastDetail[]>([]);
  const [ isLoadingCollections, setIsLoadingCollections ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  const getCollections = useCallback(async () => {
    setIsLoadingCollections(true);

    const { data, status } = await getPodcastCollection(podcastId as string);

    if (status === 'success') {
      if (data.results) {
        const formatPodcasts = data.results.map((result: any) => ({
          collectionId: result.collectionId,
          collectionName: result.collectionName,
          trackName: result.trackName,
          releaseDate: result.releaseDate,
          trackId: result.trackId,
          trackTimeMillis: result.trackTimeMillis,
          description: result.description,
          episodeUrl: result.episodeUrl,
        }));

        const localStorageCollectionsList = localStorage.getItem('localStorageCollectionsList');
        let collectionsList: any[] = [];

        if (localStorageCollectionsList) {
          collectionsList = JSON.parse(localStorageCollectionsList);
        }

        const filteredFormatPodcasts = formatPodcasts.filter((podcast: any) => podcast.episodeUrl !== '' && podcast.episodeUrl !== undefined);
        const newFilteredPodcastsToAdd = filteredFormatPodcasts.filter((podcast: any) => !collectionsList.find((item: any) => item.trackId === podcast.trackId));
        collectionsList = [...collectionsList, ...newFilteredPodcastsToAdd];

        localStorage.setItem('localStorageCollectionsList', JSON.stringify(collectionsList));

        const localStoragePodcastsTime = localStorage.getItem('localStoragePodcastsTime');
        const currentTime = Date.now();

        if (localStoragePodcastsTime && currentTime - parseInt(localStoragePodcastsTime) > 24 * 60 * 60 * 1000) {
          localStorage.removeItem('localStorageCollectionsList');
        }

        const filteredCollections = collectionsList.filter((item: any) => item.collectionId == podcastId);
        setCollections(filteredCollections);
      }
    } else {
      setErrorMessage(data);
    }

    setIsLoadingCollections(false);
  }, [podcastId]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return { collections, isLoadingCollections, errorMessage };
};