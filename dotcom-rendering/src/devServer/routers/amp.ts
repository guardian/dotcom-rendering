import express from 'express';
import { Amp } from '../docs/amp';
import { Article } from '../docs/article';
import { sendReact } from '../send';

const amp = express.Router();

amp.get('/', sendReact('AMP', Amp));
amp.get('/article', sendReact('Article', Article));

export { amp };
