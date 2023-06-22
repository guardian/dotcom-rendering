import { css } from '@emotion/react';
import { removeCookie, setCookie } from '@guardian/libs';
import { space, textSans } from '@guardian/source-foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import { isString } from 'lodash';
import { useState } from 'react';
import type { AustralianTerritory } from '../types/territory';

const styles = css`
	padding: ${space[2]}px;
`;

const territories = {
	'AU-NSW': 'New South Wales',
	'AU-QLD': 'Queensland',
	'AU-VIC': 'Victoria',
} as const satisfies Record<AustralianTerritory, string>;

const controls = 'change-territory';
const controlsStyles = css`
	max-width: 700px;
`;

const labelStyles = css`
	${textSans.medium()}
	padding-bottom: ${space[3]}px;
	display: block;

	strong {
		${textSans.medium({ fontWeight: 'bold' })}
	}
`;

type Props = {
	targetedTerritory: AustralianTerritory;
};
export const AustralianTerritorySwitcher = ({ targetedTerritory }: Props) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div css={styles}>
			<Button
				priority="subdued"
				onClick={() => {
					setExpanded(!expanded);
				}}
				icon={
					expanded ? <SvgChevronUpSingle /> : <SvgChevronDownSingle />
				}
				iconSide="right"
				aria-expanded={expanded}
				aria-controls={controls}
			>
				Not in {territories[targetedTerritory]}? Change region
			</Button>

			{expanded && (
				<div id={controls} css={controlsStyles}>
					<label htmlFor="territory" css={labelStyles}>
						<strong>
							The articles above have been curated for you based
							on the state you are in.
						</strong>{' '}
						If we have your location wrong or you want to see
						coverage of a different state, please select from the
						links below. We hope to expand this service to other
						states in the future.
					</label>

					<ChoiceCardGroup
						name="territory"
						onChange={({ target }) => {
							if ('value' in target && isString(target.value)) {
								const value = target.value;

								removeCookie({ name: 'GU_territory' });
								setCookie({
									name: 'GU_territory',
									value,
								});
								window.location.reload();
							}
						}}
					>
						<>
							{Object.entries(territories).map(([id, label]) => (
								<ChoiceCard
									key={id}
									id={id}
									value={id}
									label={label}
									checked={id === targetedTerritory}
								/>
							))}
						</>
					</ChoiceCardGroup>
				</div>
			)}
		</div>
	);
};
