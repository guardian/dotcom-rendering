import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { TagPage } from '../docs/tagPage';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/tag-page', sendReact('Tag Page', TagPage));

export { dotcom };
