// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { FC } from 'react';
import { body } from '@guardian/src-foundations/typography';
import type { Person } from '../example';
import { fullName } from '../example';

// ----- Component ----- //

const styles: SerializedStyles = css`
	${body.medium()}
`;

interface Props {
	person: Person;
}

const Example: FC<Props> = ({ person }) =>
	<p css={styles}>Hello {fullName(person)}</p>

// ----- Exports ----- //

export default Example;
