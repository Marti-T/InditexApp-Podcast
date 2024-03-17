import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useFetchPodcasts } from '../../podcasts/hooks';

export const Navbar: FC = () => {

  const { isLoadingPodcasts } = useFetchPodcasts();

  return (
    <div className="navbar">
      <div className="navbar__content">
        <Link to={'/'} className="navbar__title">Podcaster</Link>
        { isLoadingPodcasts && (
          <div className="loader">
            <div className="loader__spinner"></div>
          </div>
        )}
      </div>
      <div className="navbar__line"></div>
    </div>
  );
};