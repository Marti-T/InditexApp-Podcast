import { FC, ChangeEvent, useEffect, useState } from 'react';

import { Podcast } from '../../types/types';
import { PodcastCard } from '../components';
import { useFetchPodcasts } from '../hooks/useFetchPodcats';

export const SearchPage: FC = () => {

  const [ searchText, setSearchText ] = useState<string>('');
  const [ filteringPodcasts, setFilteringPodcasts ] = useState<Podcast[]>([]);
  const { podcasts, isLoading, errorMessage} = useFetchPodcasts();

  useEffect(() => {
    const filtering = podcasts.filter((podcast) =>
      podcast.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteringPodcasts(filtering);
  }, [podcasts, searchText]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search">
      <div className="search__filter">
        <div className="search__num-podcasts">{filteringPodcasts.length}</div>
        <form className="search__form">
          <input
            type="text"
            placeholder="Filter podcasts ..."
            className="search__input"
            name="searchText"
            value={searchText}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="search__results">
        <div className="container">

          {
            errorMessage &&
            <div className="error-message">
              <div className="error-message__content">
                { errorMessage }
              </div>
            </div>
          }

          { isLoading ? (
            <div className="loader">
              <div className="loader__content">
                <div className="loader__spinner"></div>
              </div>
            </div>
          ) : (
            filteringPodcasts.length === 0 ? (
              <div className="error-message">
                <div className="error-message__content">
                  No podcast found
                </div>
              </div>
            ) : (
              <ul className="search__list-filter">
                {filteringPodcasts.map((podcast) => (
                  <PodcastCard podcast={ podcast } key={ podcast.id } />
                ))}
              </ul>
            )
         )}
        </div>
      </div>
    </div>
  );
};
