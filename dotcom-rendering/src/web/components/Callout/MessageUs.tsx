import { css } from '@emotion/react';
import { brand, neutral, space, textSans } from '@guardian/source-foundations';
import { LinkButton, SvgWhatsApp } from '@guardian/source-react-components';

const calloutPrimaryButton = css`
	background: ${brand[500]};
	color: ${neutral[100]};
	width: 100%;
	justify-content: center;
	margin-bottom: ${space[4]}px;
	:hover {
		background-color: ${neutral[0]};
	}
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
const TELEGRAM_GUIDANCE_URL =
	'https://www.theguardian.com/info/2022/mar/15/telegram-sharing-stories-with-the-guardian';
const SECURE_DROP_URL = 'https://www.theguardian.com/securedrop';
const WHATSAPP_SIGNAL_NUMBER = '+447766780300';
const TELEGRAM_NUMBER = '+447799 322095';

const OPEN_WHATSAPP_URL = `https://wa.me/${WHATSAPP_SIGNAL_NUMBER}`;
const OPEN_SIGNAL_URL = `https://signal.me/#p/${WHATSAPP_SIGNAL_NUMBER}`;
const OPEN_TELEGRAM_URL = `https://telegram.me/${TELEGRAM_NUMBER}`;

export const MessageUs = () => {
	return (
		<div className="js-message-us-tab">
			<p css={descriptionStyles}>
				You can contact us on WhatsApp or Signal at{' '}
				{WHATSAPP_SIGNAL_NUMBER} or Telegram at {TELEGRAM_NUMBER}. For
				more information, please see our guidance on{' '}
				<a href={WHATSAPP_GUIDANCE_URL}>contacting us via WhatsApp</a>{' '}
				and our guidance on{' '}
				<a href={TELEGRAM_GUIDANCE_URL}>contacting us via Telegram</a>.
			</p>
			<p css={descriptionStyles}>
				For true anonymity please use our{' '}
				<a href={SECURE_DROP_URL}>SecureDrop</a> service instead.
			</p>
			<LinkButton
				data-ignore="global-link-styling"
				cssOverrides={calloutPrimaryButton}
				type="submit"
				priority="primary"
				icon={<SvgWhatsApp />}
				href={OPEN_WHATSAPP_URL}
				target="_blank"
				nudgeIcon={false}
			>
				Message us on Whatsapp
			</LinkButton>
			<LinkButton
				data-ignore="global-link-styling"
				cssOverrides={calloutPrimaryButton}
				type="submit"
				priority="primary"
				href={OPEN_TELEGRAM_URL}
				target="_blank"
			>
				Message us on Telegram
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
				target="_blank"
			>
				Message us on Signal
			</LinkButton>
		</div>
	);
};
