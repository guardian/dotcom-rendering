import { Router } from 'express';
import { Article } from '../docs/article';
import { Front } from '../docs/front';
import { Interactive } from '../docs/interactive';
import { Pages } from '../docs/pages';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const pages = Router();

pages.get('/', sendReact('Pages', Pages));
pages.get('/article', sendReact('Article', Article));
pages.get('/front', sendReact('Front', Front));
pages.get('/tag-page', sendReact('Tag Page', TagPage));
pages.get('/interactive', sendReact('Interactive', Interactive));

export { pages };
