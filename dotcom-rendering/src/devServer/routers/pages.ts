import { Router } from 'express';
import { Article } from '../docs/article';
import { Pages } from '../docs/pages';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/article', sendReact('Article', Article));

export { pages };
