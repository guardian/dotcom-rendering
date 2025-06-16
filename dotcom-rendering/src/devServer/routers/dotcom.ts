import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { Front } from '../docs/front';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/front', sendReact('Front', Front));

export { dotcom };
