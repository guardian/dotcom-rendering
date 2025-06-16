import { Router } from 'express';
import { Front } from '../docs/front';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/front', sendReact('Front', Front));

export { pages };
