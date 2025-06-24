import { Router } from 'express';
import { Article } from '../docs/article';
import { Dotcom } from '../docs/dotcom';
import { Front } from '../docs/front';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/article', sendReact('Article', Article));
dotcom.get('/front', sendReact('Front', Front));
dotcom.get('/tag-page', sendReact('Tag Page', TagPage));

export { dotcom };
