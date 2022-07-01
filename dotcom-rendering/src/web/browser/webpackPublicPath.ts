// allows us to define public path dynamically
// dynamic imports will use this as the base to find their assets

import { decidePublicPath } from './decidePublicPath';

// https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ = decidePublicPath();
