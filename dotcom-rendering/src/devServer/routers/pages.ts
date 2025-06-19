import { Router } from 'express';
import { Newsletters } from '../docs/newsletters';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/newsletters', sendReact('All Newsletters', Newsletters));

export { pages };
