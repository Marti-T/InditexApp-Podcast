import { render, fireEvent } from '@testing-library/react';
import { SearchPage } from '../../../src/podcasts/pages/SearchPage';


describe('SearchPage testing', () => {
  it('The search form must be displayed correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchPage />);
    const input = getByPlaceholderText('Filter podcasts ...') as HTMLInputElement;
    const form = getByTestId('search-form');

    expect(input).toBeTruthy();
    expect(form).toBeTruthy();
    expect(input.getAttribute('name')).toEqual('searchText');
  });

  it('Check whether the searchText state is updated', () => {
    const { getByPlaceholderText } = render(<SearchPage />);
    const input = getByPlaceholderText('Filter podcasts ...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('Check status when change input value', () => {
    const { getByPlaceholderText } = render(<SearchPage />);
    const input = getByPlaceholderText('Filter podcasts ...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});