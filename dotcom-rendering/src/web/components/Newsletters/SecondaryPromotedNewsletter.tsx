import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	brandBackground,
	headline,
	space,
} from '@guardian/source-foundations';
import {
	// Column,
	// Columns,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { ContainerLayout } from '../ContainerLayout';
import { NewsletterCategory } from './NewsletterCategory';

type NewsletterPromotedBlockProps = Pick<
	Newsletter,
	'name' | 'description' | 'frequency'
> & {
	signupPage?: string;
};

const headingStyle = css`
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;

	span {
		${headline.small({ fontWeight: 'bold' })}
		color: ${brandAlt[400]};
	}
`;

const flexContainer = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${brand[500]};
	color: #f6f6f6;
	border: 1px dashed;
	border-radius: 4px;
	margin: 8px 0;
	padding: 4px;
`;

const newsletterImage = css`
	flex-basis: 20%;
	min-width: 0;
	overflow: hidden;
`;

const newsletterDetail = css`
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
	margin-left: 8px;
`;
const newsletterSignup = css`
	display: flex;
	align-self: flex-end;
	padding: 8px;
	flex-basis: 25%;
`;

const newsletterFrequency = css`
	display: flex;
	align-self: flex-start;
	flex-basis: 5%;
	/* padding: 8px; */
`;

export const SecondaryPromotedNewsletter = ({
	name,
	description,
	frequency,
	signupPage,
}: NewsletterPromotedBlockProps) => (
	<ContainerLayout
		innerBackgroundColour={brandBackground.primary}
		leftContent={
			<h2 css={headingStyle}>
				<span>You might also enjoy</span>
			</h2>
		}
		verticalMargins={false}
		padContent={false}
		// padSides={false}
	>
		<div css={flexContainer}>
			{/* <Columns> */}
			{/* <Column> */}
			<div css={newsletterImage}>
				<img src="https://i.guim.co.uk/img/uploads/2022/01/11/pushing_buttons_thrasher_hi.png?width=700&quality=50&s=f4be90f0ca470076df70cf895aeecda1"></img>
			</div>
			{/* </Column> */}

			{/* <Column> */}
			<div css={newsletterDetail}>
				<h2
					css={css`
						${headline.small({ fontWeight: 'bold' })}
						margin-bottom: 4px;
					`}
				>
					{name}
				</h2>
				<p
					css={css`
						${headline.xxsmall()}
						margin-bottom: 4px;
					`}
				>
					{description}
				</p>
			</div>
			{/* </Column> */}

			<div css={newsletterSignup}>
				<LinkButton
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					priority="secondary"
					size="small"
					href={signupPage}
				>
					Sign up
				</LinkButton>
			</div>

			<div css={newsletterFrequency}>
				<NewsletterCategory text={frequency} />
			</div>
		</div>
		{/* </Columns> */}
	</ContainerLayout>
);
