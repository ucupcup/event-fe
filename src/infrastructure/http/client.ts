import axios from 'axios';
import { env } from '@shared/config/env';

export const http = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

