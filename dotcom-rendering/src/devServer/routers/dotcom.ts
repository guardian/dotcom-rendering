import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { Newsletters } from '../docs/newsletters';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/newsletters', sendReact('All Newsletters', Newsletters));

export { dotcom };
