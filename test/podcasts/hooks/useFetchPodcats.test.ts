import { renderHook } from '@testing-library/react-hooks';
import { getPodcasts } from '../../../src/api';
import { useFetchPodcasts } from '../../../src/podcasts/hooks';
import { Podcast } from '../../../src/types/types';


jest.mock('../../../src/api', () => ({
  getPodcasts: jest.fn() as jest.Mock<Promise<{ data: Podcast[]; status: string }>>,
}));

describe('useFetchPodcasts', () => {

  test('Debe de verificar que se obtienen correctamete los podcasts', async () => {

    const mockPodcasts: Podcast[] = [
      { id: '1', name: 'Podcast 1', image: 'imagen_podcast_1.png', artist: 'Artista 1', summary: 'Resumen del podcast 1' },
      { id: '2', name: 'Podcast 2', image: 'imagen_podcast_2.png', artist: 'Artista 2', summary: 'Resumen del podcast 2' }
    ];
    // Configura el comportamiento mock de getPodcasts
    (getPodcasts as jest.Mock).mockResolvedValueOnce({ data: mockPodcasts, status: 'success' });

    const { result, waitForNextUpdate } = renderHook(() => useFetchPodcasts());

    // isLoadingPodcasts es verdadero mientras se cargan los datos
    expect(result.current.isLoadingPodcasts).toBe(true);

    // Espera a que los datos se carguen
    await waitForNextUpdate();

    // Se espera que getPodcasts haya sido llamado una vez
    expect(getPodcasts).toHaveBeenCalledTimes(1);
    // Se espera que los podcasts obtenidos sean los esperados
    expect(result.current.podcasts).toEqual(mockPodcasts);
    // Se espera que no haya errores
    expect(result.current.errorMessage).toBe(null);
    // Se espera que isLoadingPodcasts sea falso después de cargar los datos
    expect(result.current.isLoadingPodcasts).toBe(false);
  });

});
