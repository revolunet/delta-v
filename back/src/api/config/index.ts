import { Router } from 'express';
import { putDefaultCountry } from './putDefaultCountry';

export const configRouter = Router().use(putDefaultCountry);
