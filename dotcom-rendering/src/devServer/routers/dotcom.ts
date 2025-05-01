import { Router } from 'express';
import { Dotcom } from '../docs/dotcom';
import { sendReact } from '../send';

const dotcom = Router();

dotcom.get('/', sendReact('Dotcom', Dotcom));

export { dotcom };
