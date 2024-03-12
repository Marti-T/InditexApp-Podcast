import { Navbar} from './ui/components/Navbar';
import { SearchPage } from './podcasts/pages/SearchPage';



export const PodcastApp = () => {
  return (
    <>
      <Navbar />
      <SearchPage />
    </>
  )
}