import { Router } from 'express';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));

export { pages };
