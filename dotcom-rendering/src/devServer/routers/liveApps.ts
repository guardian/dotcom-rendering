import express from 'express';
import { Article } from '../docs/article';
import { Interactive } from '../docs/interactive';
import { LiveApps } from '../docs/liveApps';
import { sendReact } from '../send';

const liveApps = express.Router();

liveApps.get('/', sendReact('Live Apps', LiveApps));
liveApps.get('/article', sendReact('Article', Article));
liveApps.get('/interactive', sendReact('Interactive', Interactive));

export { liveApps };
