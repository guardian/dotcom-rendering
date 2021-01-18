import { ShareIcon } from 'components/editions/shareIcon';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { initPingEditionsRendering } from './editionsCommunication';

initPingEditionsRendering();

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));
