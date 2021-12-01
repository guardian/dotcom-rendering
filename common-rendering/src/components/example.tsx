// ----- Imports ----- //

import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { body } from "@guardian/source-foundations";
import type { Person } from "@guardian/common-rendering/src/example";
import { fullName } from "@guardian/common-rendering/src/example";

// ----- Component ----- //

const styles: SerializedStyles = css`
	${body.medium()}
`;

interface Props {
	person: Person;
}

const Example: FC<Props> = ({ person }) => (
	<p css={styles}>Hello {fullName(person)}</p>
);

// ----- Exports ----- //

export default Example;
