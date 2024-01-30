import { css } from '@emotion/react';
import { headline, space, textSans } from '@guardian/source-foundations';
import { Link, TextInput } from '@guardian/source-react-components';
import { useState } from 'react';
import { palette as schemedPalette } from '../../palette';
import { PillarButton } from './PillarButton';
import { Preview } from './Preview';
import { Row } from './Row';

const textStyling = css`
	${textSans.small()};
`;

const linkStyles = css`
	color: ${schemedPalette('--discussion-link')};
`;

const Text = ({ children }: { children: React.ReactNode }) => (
	<p css={textStyling}>{children}</p>
);

const inputLabelStyles = css`
	> label {
		> * {
			color: inherit;
		}
	}
`;
const textInputStyles = css`
	background-color: transparent;
	color: inherit;
`;

type Props = {
	error?: string;
	submitForm: (userName: string) => Promise<void>;
	cancelSubmit: () => void;
	previewBody: string;
};

export const FirstCommentWelcome = ({
	error = '',
	submitForm,
	cancelSubmit,
	previewBody,
}: Props) => {
	const [userName, setUserName] = useState<string>('');

	return (
		<div
			css={css`
				padding: ${space[2]}px;
			`}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					void submitForm(userName);
				}}
			>
				<h3
					css={css`
						${headline.xxsmall({ fontWeight: 'bold' })};
					`}
				>
					Welcome, you’re about to make your first comment!
				</h3>
				<Text>
					Before you post, we’d like to thank you for joining the
					debate - we’re glad you’ve chosen to participate and we
					value your opinions and experiences.
				</Text>
				<Text>
					Please choose your username under which you would like all
					your comments to show up. You can only set your username
					once.
				</Text>
				<div css={inputLabelStyles}>
					<TextInput
						label="Username:"
						supporting="Must be 6-20 characters, letters and/or numbers only, no spaces."
						value={userName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUserName(e.target.value)
						}
						width={30}
						error={error}
						cssOverrides={textInputStyles}
					/>
				</div>
				<Text>
					<>
						Please keep your posts respectful and abide by the{' '}
						<Link
							href="/community-standards"
							priority="primary"
							subdued={true}
							rel="nofollow"
							cssOverrides={linkStyles}
						>
							<span css={textStyling}>community guidelines</span>
						</Link>
						{` -`} and if you spot a comment you think doesn’t
						adhere to the guidelines, please use the ‘Report’ link
						next to it to let us know.
					</>
				</Text>
				<Text>
					Please preview your comment below and click ‘post’ when
					you’re happy with it.
				</Text>
				<Preview previewHtml={previewBody} showSpout={false} />
				<Row>
					<PillarButton
						onClick={() => void submitForm(userName)}
						linkName="post comment"
						size="small"
					>
						Post your comment
					</PillarButton>
					<div
						css={css`
							width: ${space[3]}px;
						`}
					></div>
					<PillarButton
						priority="subdued"
						onClick={cancelSubmit}
						linkName="cancel-post-comment"
						size="small"
					>
						Cancel
					</PillarButton>
				</Row>
			</form>
		</div>
	);
};
