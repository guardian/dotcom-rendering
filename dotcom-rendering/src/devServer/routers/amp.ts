import express from 'express';
import { Amp } from '../docs/amp';
import { Article } from '../docs/article';
import { Interactive } from '../docs/interactive';
import { sendReact } from '../send';

const amp = express.Router();

amp.get('/', sendReact('AMP', Amp));
amp.get('/article', sendReact('Article', Article));
amp.get('/interactive', sendReact('Interactive', Interactive));

export { amp };
