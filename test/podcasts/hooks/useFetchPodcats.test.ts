import { renderHook } from '@testing-library/react-hooks';
import { getPodcasts } from '../../../src/api';
import { useFetchPodcasts } from '../../../src/podcasts/hooks';
import { Podcast } from '../../../src/types/types';


jest.mock('../../../src/api', () => ({
  getPodcasts: jest.fn() as jest.Mock<Promise<{ data: Podcast[]; status: string }>>,
}));

describe('Testing on useFetchPodcasts', () => {

  test('You should check that you get the podcasts correctly.', async () => {

    const mockPodcasts: Podcast[] = [
      { id: '1', name: 'Podcast 1', image: 'imagen_podcast_1.png', artist: 'Artista 1', summary: 'Resumen del podcast 1' },
      { id: '2', name: 'Podcast 2', image: 'imagen_podcast_2.png', artist: 'Artista 2', summary: 'Resumen del podcast 2' }
    ];
    // Configura el comportamiento mock de getPodcasts
    (getPodcasts as jest.Mock).mockResolvedValueOnce({ data: mockPodcasts, status: 'success' });

    const { result, waitForNextUpdate } = renderHook(() => useFetchPodcasts());


    expect(result.current.isLoadingPodcasts).toBe(true);

    await waitForNextUpdate();

    expect(getPodcasts).toHaveBeenCalledTimes(1);
    expect(result.current.podcasts).toEqual(mockPodcasts);
    expect(result.current.errorMessage).toBe(null);
    expect(result.current.isLoadingPodcasts).toBe(false);
  });

});
