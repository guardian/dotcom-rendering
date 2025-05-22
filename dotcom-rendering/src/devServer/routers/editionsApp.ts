import express from 'express';
import { EditionsApp } from '../docs/editionsApp';
import { EditionsCrosswords } from '../docs/editionsCrosswords';
import { sendReact } from '../send';

const editionsApp = express.Router();

editionsApp.get('/', sendReact('Editions App', EditionsApp));
editionsApp.get(
	'/crosswords',
	sendReact('Editions Crosswords', EditionsCrosswords),
);

export { editionsApp };
