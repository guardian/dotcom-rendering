import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	brandBackground,
	headline,
	space,
} from '@guardian/source-foundations';
import {
	Column,
	Columns,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { ContainerLayout } from '../ContainerLayout';
import { NewsletterDetail } from './NewsletterDetail';

// TODO: Change this when we decide how to get this data through
const MAIN_MEDIA =
	'https://i.guim.co.uk/img/uploads/2022/01/11/pushing_buttons_thrasher_hi.png?width=700&quality=50&s=f4be90f0ca470076df70cf895aeecda1';

type Props = {
	newsletter: Newsletter & {
		mainMedia?: string; // just optional for now - see MAIN_MEDIA
		signupPage: string;
	};
};

const headingStyle = css`
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	${headline.small({ fontWeight: 'bold' })}
	color: ${brandAlt[400]};
`;

const flexContainer = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${brand[500]};
	color: #f6f6f6;
	border: 1px dashed;
	border-radius: ${space[2]}px;
	margin: ${space[2]}px 0;
	padding: ${space[2]}px;
`;

const newsletterImage = css`
	min-width: 0;
	overflow: hidden;
`;

const newsletterFrequency = css`
	display: flex;
	align-self: flex-start;
`;

export const SecondaryPromotedNewsletter: React.FC<Props> = ({
	newsletter,
}) => {
	const bannerTitle = <h2 css={headingStyle}>You might also enjoy</h2>;
	const titleAndDescription = (
		<div>
			<h2
				css={css`
					${headline.small({ fontWeight: 'bold' })}
					margin-bottom: 4px;
				`}
			>
				{newsletter.name}
			</h2>
			<p
				css={css`
					${headline.xxsmall()}
					margin-bottom: 4px;
				`}
			>
				{newsletter.description}
			</p>
		</div>
	);

	const signupButton = (
		<LinkButton
			icon={<SvgArrowRightStraight />}
			iconSide="right"
			priority="secondary"
			size="small"
			href={newsletter.signupPage}
			css={css`
				align-self: flex-end;
			`}
		>
			Sign up
		</LinkButton>
	);

	return (
		<ContainerLayout
			innerBackgroundColour={brandBackground.primary}
			leftContent={bannerTitle}
			showTopBorder={false}
			padContent={false}
			stretchRight={true}
			verticalMargins={false}
			// padSides={false}
		>
			<Columns css={flexContainer}>
				<Column width={1 / 3}>
					<div css={newsletterImage}>
						<img src={MAIN_MEDIA} height="100px" />
					</div>
				</Column>
				<Column width={2 / 3}>
					<div
						css={css`
							display: flex;
						`}
					>
						{titleAndDescription}

						{signupButton}
					</div>
				</Column>

				<div css={newsletterFrequency}>
					<NewsletterDetail text={newsletter.frequency} />
				</div>
			</Columns>
		</ContainerLayout>
	);
};
