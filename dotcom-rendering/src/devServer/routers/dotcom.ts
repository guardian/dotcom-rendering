import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { Interactive } from '../docs/interactive';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));
dotcom.get('/interactive', sendReact('Interactive', Interactive));

export { dotcom };
