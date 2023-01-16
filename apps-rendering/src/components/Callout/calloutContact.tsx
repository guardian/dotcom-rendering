import { LinkButton } from '@guardian/source-react-components';
import type { FC } from 'react';
import { calloutLinkContainer, calloutPrimaryButton, info } from './styles';

const WHATSAPP_GUIDANCE_URL =
	'https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian';
const SECURE_DROP_URL = 'https://www.theguardian.com/securedrop';
const WHATSAPP_SIGNAL_NUMBER = '+447766780300';

const OPEN_WHATSAPP_URL = `https://wa.me/${WHATSAPP_SIGNAL_NUMBER}`;
const OPEN_SIGNAL_URL = `https://signal.me/#p/${WHATSAPP_SIGNAL_NUMBER}`;

const CalloutContact: FC = () => {
	return (
		<div className="js-message-us-tab">
			<p css={[info, calloutLinkContainer]}>
				You can contact us on WhatsApp or Signal at{' '}
				{WHATSAPP_SIGNAL_NUMBER}. For more information, please see our
				guidance on{' '}
				<a href={WHATSAPP_GUIDANCE_URL}>contacting us via WhatsApp</a>.
			</p>

			<p css={[info, calloutLinkContainer]}>
				For true anonymity please use our{' '}
				<a href={SECURE_DROP_URL}>SecureDrop</a> service instead.
			</p>

			<LinkButton
				css={calloutPrimaryButton}
				type="submit"
				priority="primary"
				href={OPEN_WHATSAPP_URL}
				target="_blank"
				rel="noopener"
			>
				Message us on Whatsapp
			</LinkButton>

			<LinkButton
				css={calloutPrimaryButton}
				type="submit"
				priority="primary"
				href={OPEN_SIGNAL_URL}
				target="_blank"
				rel="noopener"
			>
				Message us on Signal
			</LinkButton>
		</div>
	);
};

export default CalloutContact;
