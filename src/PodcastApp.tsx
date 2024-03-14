import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './ui/components';
import { SearchPage, PodcastPage, PodcastDetailPage } from './podcasts/pages';

export const PodcastApp: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/podcast/:podcastId" element={<PodcastPage />} />
        <Route path="/podcast/:podcastId/chapter/:chapterId" element={<PodcastDetailPage />} />
      </Routes>
    </>
  );
}