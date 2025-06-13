import { Router } from 'express';
import { Article } from '../docs/article';
import { Dotcom } from '../docs/dotcom';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/article', sendReact('Article', Article));

export { dotcom };
