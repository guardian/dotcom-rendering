/// <reference types="@fastly/js-compute" />
import { createEventHandler } from '@fastly/remix-server-adapter';
import { moduleAssets, getServer } from '../static-publisher/statics.js';

/** @type {import('@remix-run/server-runtime').ServerBuild} */
const build = moduleAssets.getAsset('/build/index.js').getStaticModule();

/** @type {import('@fastly/compute-js-static-publish').PublisherServer} */
const server = getServer();

addEventListener('fetch', createEventHandler({ build, server }));
