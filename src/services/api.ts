import axios from 'axios';
import { Preview, Show } from '../types/podcast';

const BASE_URL = 'https://podcast-api.netlify.app';

/**
 * Custom error class for API-related errors
 * Includes optional status code for more detailed error handling
 */
export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetches detailed information about a specific show
 * @param id Show ID
 * @returns Promise containing show details
 * @throws ApiError if request fails
 */
export const fetchShow = async (id: string): Promise<Show> => {
  try {
    const response = await axios.get<Show>(`${BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch show',
        error.response?.status
      );
    }
    throw new ApiError('An unexpected error occurred');
  }
};

/**
 * Fetches preview information for all available shows
 * @returns Promise containing array of show previews
 * @throws ApiError if request fails
 */
export const fetchPreviews = async (): Promise<Preview[]> => {
  try {
    const response = await axios.get<Preview[]>(BASE_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch previews',
        error.response?.status
      );
    }
    throw new ApiError('An unexpected error occurred');
  }
};