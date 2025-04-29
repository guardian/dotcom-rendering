import { Router } from 'express';
import { Targets } from '../docs/targets';
import { sendReact } from '../send';

const targets = Router();

targets.get('/', sendReact('Targets', Targets));

export { targets };
