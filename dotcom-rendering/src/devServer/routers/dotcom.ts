import { Router } from 'express';
import { Article } from '../docs/article';
import { Dotcom } from '../docs/dotcom';
import { Front } from '../docs/front';
import { Interactive } from '../docs/interactive';
import { Newsletters } from '../docs/newsletters';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/article', sendReact('Article', Article));
dotcom.get('/front', sendReact('Front', Front));
dotcom.get('/tag-page', sendReact('Tag Page', TagPage));
dotcom.get('/interactive', sendReact('Interactive', Interactive));
dotcom.get('/newsletters', sendReact('All Newsletters', Newsletters));

export { dotcom };
