import { Route, Routes } from 'react-router-dom';
import { Navbar } from './ui/components';
import { SearchPage, PodcastPage } from './podcasts/pages';

export const PodcastApp: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/podcast/:id" element={<PodcastPage />} />
      </Routes>
    </>
  );
}