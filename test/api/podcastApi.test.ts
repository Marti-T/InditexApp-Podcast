import axios from 'axios';
import { getPodcasts } from '../../src/api';

jest.mock('axios');

describe('Pruebas en podcastApi', () => {
  test('Debe retornar los podcasts correctamente', async () => {
    const mockData = {
      data: {
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '1' } },
              'im:name': { label: 'Podcast 1' },
              'im:artist': { label: 'Artist 1' },
              'im:image': [{ label: 'image_url' }],
              summary: { label: 'Summary 1' }
            },
            {
              id: { attributes: { 'im:id': '2' } },
              'im:name': { label: 'Podcast 2' },
              'im:artist': { label: 'Artist 2' },
              'im:image': [{ label: 'image_url' }],
              summary: { label: 'Summary 2' }
            }
          ]
        }
      }
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockData);

    const result = await getPodcasts();

    expect(result.status).toBe('success');
    expect(result.data).toEqual([
      {
        id: '1',
        name: 'Podcast 1',
        artist: 'Artist 1',
        image: expect.any(String),
        summary: 'Summary 1',
      },
      {
        id: '2',
        name: 'Podcast 2',
        artist: 'Artist 2',
        image: expect.any(String),
        summary: 'Summary 2',
      },
    ]);
  });

  test('Debe de controlar los errores del servicio correctamente', async () => {
    const errorMessage = 'Error fetching data';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const result = await getPodcasts();

    expect(result.status).toBe('fail');
    expect(result.data).toBe(errorMessage);
  });
});