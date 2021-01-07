import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { ShareIcon } from 'components/editions/shareIcon';
import {
	initPingEditionsRendering,
	pingEditionsNative,
} from './editionsCommunication';

initPingEditionsRendering();

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));

pingEditionsNative({ kind: 'platform-query' });
