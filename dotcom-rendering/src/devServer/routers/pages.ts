import { Router } from 'express';
import { Pages } from '../docs/pages';
import { Front } from '../docs/front';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/front', sendReact('Front', Front));

export { pages };
