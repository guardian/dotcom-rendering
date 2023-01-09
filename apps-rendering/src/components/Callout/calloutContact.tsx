import type { ArticleFormat } from '@guardian/libs';
import { LinkButton } from '@guardian/source-react-components';
import type { FC } from 'react';
import { calloutLinkContainer, calloutPrimaryButton, info } from './styles';

interface CalloutContactProps {
	format: ArticleFormat;
}

const WHATSAPP_GUIDANCE_URL =
	'https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian';
const TELEGRAM_GUIDANCE_URL =
	'https://www.theguardian.com/info/2022/mar/15/telegram-sharing-stories-with-the-guardian';
const SECURE_DROP_URL = 'https://www.theguardian.com/securedrop';
const WHATSAPP_SIGNAL_NUMBER = '+447766780300';
const TELEGRAM_NUMBER = '+447799 322095';

const OPEN_WHATSAPP_URL = `https://wa.me/${WHATSAPP_SIGNAL_NUMBER}`;
const OPEN_TELEGRAM_URL = `https://telegram.me/${TELEGRAM_NUMBER}`;
const OPEN_SIGNAL_URL = `https://signal.me/#p/${WHATSAPP_SIGNAL_NUMBER}`;

const CalloutContact: FC<CalloutContactProps> = ({ format }) => {
	return (
		<div className="js-message-us-tab">
			<p css={[info, calloutLinkContainer(format)]}>
				You can contact us on WhatsApp or Signal at{' '}
				{WHATSAPP_SIGNAL_NUMBER} or Telegram at {TELEGRAM_NUMBER}. For
				more information, please see our guidance on{' '}
				<a href={WHATSAPP_GUIDANCE_URL}>contacting us via WhatsApp</a>{' '}
				and our guidance on{' '}
				<a href={TELEGRAM_GUIDANCE_URL}>contacting us via Telegram</a>.
			</p>

			<p css={[info, calloutLinkContainer(format)]}>
				For true anonymity please use our{' '}
				<a href={SECURE_DROP_URL}>SecureDrop</a> service instead.
			</p>

			<LinkButton
				css={calloutPrimaryButton(format)}
				type="submit"
				priority="primary"
				href={OPEN_WHATSAPP_URL}
				target="_blank"
			>
				Message us on Whatsapp
			</LinkButton>

			<LinkButton
				css={calloutPrimaryButton(format)}
				type="submit"
				priority="primary"
				href={OPEN_TELEGRAM_URL}
				target="_blank"
			>
				Message us on Telegram
			</LinkButton>

			<LinkButton
				css={calloutPrimaryButton(format)}
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

export default CalloutContact;
