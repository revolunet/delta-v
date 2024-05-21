import { Router } from 'express';
import { putDefaultCountry } from './putDefaultCountry';

export const userRouter = Router().use(putDefaultCountry);
