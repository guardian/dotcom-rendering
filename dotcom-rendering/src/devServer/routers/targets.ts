import { Router } from 'express';
import { Targets } from '../docs/targets';
import { sendReact } from '../send';
import { amp } from './amp';
import { dotcom } from './dotcom';
import { editionsApp } from './editionsApp';
import { liveApps } from './liveApps';

const targets = Router();

targets.get('/', sendReact('Targets', Targets));
targets.use('/dotcom', dotcom);
targets.use('/live-apps', liveApps);
targets.use('/editions-app', editionsApp);
targets.use('/amp', amp);

export { targets };
