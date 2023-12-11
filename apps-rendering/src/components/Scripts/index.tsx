// ----- Section ----- //

import type { Option } from '../../../vendor/@guardian/types/index';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Sub-Components ----- //

interface ClientJsProps {
	src: Option<string>;
}

const ClientJs: FC<ClientJsProps> = ({ src }) =>
	pipe(
		src,
		map((s) => <script src={s}></script>),
		withDefault<ReactElement | null>(null),
	);

// ----- Component ----- //

interface Props {
	clientScript: Option<string>;
	twitter: boolean;
}

const Scripts: FC<Props> = ({ clientScript, twitter }) => (
	<>
		<ClientJs src={clientScript} />
		{twitter ? (
			<script src="https://platform.twitter.com/widgets.js"></script>
		) : null}
	</>
);

// ----- Exports ----- //

export default Scripts;
