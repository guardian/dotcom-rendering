import { runk6 } from './k6.mjs';

const { options, run } = runk6('./front.json', 'FrontValibot');

export { options };

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	run();
}
