import { render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { PodcastCard } from '../../../src/podcasts/components/PodcastCard';

const mockPodcast = {
  id: '1',
  name: 'Podcast Name',
  image: 'podcast.jpg',
  artist: 'Podcast Author',
  summary: 'This is a podcast summary.'
};

describe('Pruebas en <PodcastsCard />', () => {
  test('Debe mostrar correctamente el componente PodcastCard', () => {

    const { getByLabelText } = render(
      <Router>
        <PodcastCard podcast={mockPodcast} />
      </Router>
    );

    const image = getByLabelText('image-card') as HTMLImageElement;
    expect(image.src).toContain('podcast.jpg');

    const name = getByLabelText('name-card');
    expect(name.textContent).toContain('Podcast Name');

    const artist = getByLabelText('author-card');
    expect(artist.textContent).toContain('Podcast Author');
  });
});
