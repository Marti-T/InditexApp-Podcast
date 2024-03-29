import { useCallback, useEffect, useState } from 'react';

import { Podcast } from '../../types/types';
import { getPodcasts } from "../../api";

export const useFetchPodcasts = () => {

  const [ podcasts, setPodcasts ] = useState<Podcast[]>([]);
  const [ isLoadingPodcasts, setIsLoadingPodcasts ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  //console.log("isLoadingPodcasts: ", isLoadingPodcasts);

  const getStorePodcasts = useCallback(async () => {

    setIsLoadingPodcasts(true);

    const { data, status } = await getPodcasts();

    if (status === 'success') {
      setPodcasts(data);
      localStorage.setItem('localStoragePodcastsData', JSON.stringify(data));
      localStorage.setItem('localStoragePodcastsTime', new Date().getTime().toString());
    } else {
      setErrorMessage(data);
    }

    setIsLoadingPodcasts(false);

  }, []);

  useEffect(() => {

    const localStorageData = localStorage.getItem('localStoragePodcastsData');
    const localStorageHours = localStorage.getItem('localStoragePodcastsTime');

    if (localStorageHours && localStorageData) {
      const initHours = parseInt(localStorageHours);
      const currentHours = new Date().getTime();
      const diff = currentHours - initHours;
      const hoursDiff = diff / (1000 * 60 * 60);

      if (hoursDiff >= 24) {
        localStorage.removeItem('localStoragePodcastsData');
        localStorage.removeItem('localStoragePodcastsTime');
      } else {
        setPodcasts(JSON.parse(localStorageData));
        return;
      }
    } else {

      getStorePodcasts();
    }

  }, [getStorePodcasts]);

  return { podcasts, isLoadingPodcasts, errorMessage };
}