import express from 'express';
import { Article } from '../docs/article';
import { LiveApps } from '../docs/liveApps';
import { sendReact } from '../send';

const liveApps = express.Router();

liveApps.get('/', sendReact('Live Apps', LiveApps));
liveApps.get('/article', sendReact('Article', Article));

export { liveApps };
