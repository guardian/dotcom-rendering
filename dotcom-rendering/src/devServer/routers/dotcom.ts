import { Router } from 'express';
import { Article } from '../docs/article';
import { Dotcom } from '../docs/dotcom';
<<<<<<< add-newsletters-docs-to-dev-server
import { Newsletters } from '../docs/newsletters';
=======
import { Front } from '../docs/front';
import { Interactive } from '../docs/interactive';
import { TagPage } from '../docs/tagPage';
>>>>>>> main
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
<<<<<<< add-newsletters-docs-to-dev-server
dotcom.get('/newsletters', sendReact('All Newsletters', Newsletters));
=======
dotcom.get('/article', sendReact('Article', Article));
dotcom.get('/front', sendReact('Front', Front));
dotcom.get('/tag-page', sendReact('Tag Page', TagPage));
dotcom.get('/interactive', sendReact('Interactive', Interactive));
>>>>>>> main

export { dotcom };
