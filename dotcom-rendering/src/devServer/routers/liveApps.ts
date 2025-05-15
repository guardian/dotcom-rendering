import express from 'express';
import { LiveApps } from '../docs/liveApps';
import { sendReact } from '../send';

const liveApps = express.Router();

liveApps.get('/', sendReact('Live Apps', LiveApps));

export { liveApps };
