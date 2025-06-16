import { Router } from 'express';
import { Pages } from '../docs/pages';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/tag-page', sendReact('Tag Page', TagPage));

export { pages };
