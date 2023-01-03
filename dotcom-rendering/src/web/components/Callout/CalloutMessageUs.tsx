import { css, SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	LinkButton,
	SvgGps,
	SvgWhatsApp,
} from '@guardian/source-react-components';
import type { FC } from 'react';
import { decidePalette } from '../../../web/lib/decidePalette';
import { space, neutral, textSans } from '@guardian/source-foundations';
import type { CampaignFieldType } from '../../../types/content';

interface CalloutContactProps {
	format: ArticleFormat;
}

const calloutPrimaryButton = (format: ArticleFormat): SerializedStyles => css`
	background: ${decidePalette(format).text.calloutAccent};
	color: ${neutral[100]} !important;
	width: 100%;
	justify-content: center;
	margin-bottom: ${space[4]}px;
	:hover {
		background-color: ${neutral[0]};
	}
`;

const descriptionStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
			border-bottom: 1px solid ${decidePalette(format).text.richLink};
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
const CONTACT_NUMBER = '+447766780300';

const OPEN_WHATSAPP_URL = `https://wa.me/${CONTACT_NUMBER}`;
const OPEN_TELEGRAM_URL = `https://telegram.me/${CONTACT_NUMBER}`;

export const CalloutMessageUs = ({ format }: CalloutContactProps) => {
	return (
		<div className="js-message-us-tab">
			<p css={descriptionStyles(format)}>
				You can contact us on WhatsApp or Telegram at {CONTACT_NUMBER}.
				For more information, please see our guidance on{' '}
				<a href={WHATSAPP_GUIDANCE_URL}>contacting us via WhatsApp</a>{' '}
				and our guidance on{' '}
				<a href={TELEGRAM_GUIDANCE_URL}>contacting us via Telegram</a>.
			</p>

			<p css={descriptionStyles(format)}>
				For true anonymity please use our{' '}
				<a href={SECURE_DROP_URL}>SecureDrop</a> service instead.
			</p>

			<LinkButton
				cssOverrides={calloutPrimaryButton(format)}
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
				cssOverrides={calloutPrimaryButton(format)}
				type="submit"
				priority="primary"
				icon={<SvgGps />}
				href={OPEN_TELEGRAM_URL}
				target="_blank"
			>
				Message us on Telegram
			</LinkButton>
		</div>
	);
};
