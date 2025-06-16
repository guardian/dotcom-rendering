import { Router } from 'express';
import { Interactive } from '../docs/interactive';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/interactive', sendReact('Interactive', Interactive));

export { pages };
