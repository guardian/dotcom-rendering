// ----- Imports ----- //
import { css } from '@emotion/react';
import type { FC } from 'react';
import Placeholder from '../placeholder';
import useOnlineStatus from '../utils/useOnlineStatus';

// ----- Styles ----- //

const videoWrapperStyles = css`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
`;

const videoStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

// ----- Component ----- //

interface Props {
	title: string;
	atomId: string;
}

const Video: FC<Props> = ({ title, atomId }) => {
	const online = useOnlineStatus();
	const text =
		'Sorry, we couldn’t load this video. Please ensure you’re online in order to watch it.';

	return online ? (
		<div css={videoWrapperStyles}>
			<iframe
				title={title}
				css={videoStyles}
				frameBorder="0"
				scrolling="no"
				allowFullScreen
				src={`https://embed.theguardian.com/embed/atom/media/${atomId}#noadsaf`}
			></iframe>
		</div>
	) : (
		<Placeholder text={text} />
	);
};

// ----- Exports ----- //

export default Video;
