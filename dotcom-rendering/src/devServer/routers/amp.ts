import express from 'express';
import { Amp } from '../docs/amp';
import { sendReact } from '../send';

const amp = express.Router();

amp.get('/', sendReact('AMP', Amp));

export { amp };
