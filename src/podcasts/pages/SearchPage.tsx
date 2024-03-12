import { useEffect, useState } from 'react';
import { getPodcasts } from '../../api/podcastApi';
import { Podcast } from '../../types/types';


export const SearchPage = () => {


  const [ podcasts, setPodcasts ] = useState<Podcast[]>([]);
  const [ searchText, setSearchText ] = useState<string>('');
  const [ filteringPodcasts, setFilteringPodcasts] = useState<Podcast[]>([]);


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
    }

    getStorePodcasts();
  }, []);


  useEffect(() => {
    const filtering = podcasts.filter((podcast) =>
      podcast.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteringPodcasts(filtering);
  }, [podcasts, searchText]);


  const getStorePodcasts = async () => {
    try {
      const listPodcasts = await getPodcasts();
      setPodcasts(listPodcasts);
      localStorage.setItem('localStoragePodcastsData', JSON.stringify(listPodcasts));
      localStorage.setItem('localStoragePodcastsTime', new Date().getTime().toString());
    } catch (error) {
      console.error('Error fetching', error);
    }
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };


  return (
    <div className="search">
      <div className="search__filter">
        <div className="search__num-podcasts">{ filteringPodcasts.length }</div>
        <form className="search__form">
          <input
            type="text"
            placeholder="Filter podcasts ..."
            className="search__input"
            name="searchText"
            value={ searchText }
            onChange={ handleSearchChange }
          />
        </form>
      </div>
      <div className="search__results">
        <div className="container">
          <ul className="search__list-filter">
            {filteringPodcasts.map(( podcast ) => (
              <li key={ podcast.id }>
                <div className="search__list-filter-item">
                  <img src={ podcast.image } alt={ podcast.name } className="search__list-filter-image" />
                  <p className="search__list-filter-title">{ podcast.name }</p>
                  <p className="search__list-filter-author">Author: { podcast.artist }</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

