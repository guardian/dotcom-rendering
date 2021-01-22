import { initPingEditionsRendering } from '@guardian/renditions';
import { ShareIcon } from 'components/editions/shareIcon';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';

initPingEditionsRendering();

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));
