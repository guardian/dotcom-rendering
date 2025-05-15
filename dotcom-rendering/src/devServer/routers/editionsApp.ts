import express from 'express';
import { EditionsApp } from '../docs/editionsApp';
import { sendReact } from '../send';

const editionsApp = express.Router();

editionsApp.get('/', sendReact('Editions App', EditionsApp));

export { editionsApp };
