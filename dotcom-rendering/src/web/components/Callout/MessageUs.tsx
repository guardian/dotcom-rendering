import { css } from '@emotion/react';
import { brand, space, textSans } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

const calloutPrimaryButton = css`
	width: 100%;
	justify-content: center;
	margin-bottom: ${space[4]}px;
`;

const descriptionStyles = css`
	a {
		color: ${brand[500]};
		border-bottom: 1px solid ${brand[500]};
		text-decoration: none;
	}
	padding-bottom: ${space[4]}px;
	${textSans.small()}

	p {
		margin-bottom: ${space[3]}px;
	}
	margin-top: ${space[2]}px;
`;

const WHATSAPP_GUIDANCE_URL =
	'https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian';
const SECURE_DROP_URL = 'https://www.theguardian.com/securedrop';
const WHATSAPP_SIGNAL_NUMBER = '+447766780300';

const OPEN_WHATSAPP_URL = `https://wa.me/${WHATSAPP_SIGNAL_NUMBER}`;
const OPEN_SIGNAL_URL = `https://signal.me/#p/${WHATSAPP_SIGNAL_NUMBER}`;

export const MessageUs = () => {
	return (
		<div className="js-message-us-tab">
			<p css={descriptionStyles}>
				You can contact us on WhatsApp or Signal at{' '}
				{WHATSAPP_SIGNAL_NUMBER}. For more information, please see our
				guidance on{' '}
				<a
					data-ignore="global-link-styling"
					href={WHATSAPP_GUIDANCE_URL}
				>
					contacting us via WhatsApp
				</a>
				.
			</p>
			<p css={descriptionStyles}>
				For true anonymity please use our{' '}
				<a data-ignore="global-link-styling" href={SECURE_DROP_URL}>
					SecureDrop
				</a>{' '}
				service instead.
			</p>
			<LinkButton
				data-ignore="global-link-styling"
				cssOverrides={calloutPrimaryButton}
				type="submit"
				priority="primary"
				href={OPEN_WHATSAPP_URL}
				rel="noopener"
				target="blank"
				nudgeIcon={false}
			>
				Message us on WhatsApp
			</LinkButton>
			<LinkButton
				data-ignore="global-link-styling"
				cssOverrides={[
					calloutPrimaryButton,
					css`
						margin-bottom: ${space[9]}px;
					`,
				]}
				type="submit"
				priority="primary"
				href={OPEN_SIGNAL_URL}
				rel="noopener"
				target="blank"
			>
				Message us on Signal
			</LinkButton>
		</div>
	);
};
