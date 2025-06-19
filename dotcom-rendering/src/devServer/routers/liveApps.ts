import express from 'express';
import { Interactive } from '../docs/interactive';
import { LiveApps } from '../docs/liveApps';
import { sendReact } from '../send';

const liveApps = express.Router();

liveApps.get('/', sendReact('Live Apps', LiveApps));
liveApps.get('/interactive', sendReact('Interactive', Interactive));

export { liveApps };
