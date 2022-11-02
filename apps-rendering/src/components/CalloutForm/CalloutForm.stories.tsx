// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticleFormat, ArticlePillar } from '@guardian/libs';
import Callout from './callout';
import ExpandingWrapper from './expandingWrapper';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const mockDesc = '<p>If you have been affected or have any information, we\'d like to hear from you. You can get in touch by filling in the form below or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447766780300">clicking here&nbsp;</a>or\n adding the contact +44(0)7766780300. Only the Guardian can see your \ncontributions and one of our journalists may contact you to discuss \nfurther.&nbsp;<em>If you’re having trouble using the form, click&nbsp;<a href="https://guardiannewsandmedia.formstack.com/forms/facebook_whatsapp_and_instagram_outage">here</a>. Read terms of service&nbsp;<a href="https://www.theguardian.com/help/terms-of-service">here</a>&nbsp;and privacy policy&nbsp;<a href="https://www.theguardian.com/help/privacy-policy">here</a>.<br></em></p>'
const mockCampaigns = [
	{
		id: '1fc53dab-1c76-4258-8194-b4b3d8399052',
		name: 'CALLOUT: ghost flights',
		priority: 0,
		displayOnSensitive: false,
		fields: {
			callout: 'Share your experiences',
			formId: 4711223,
			tagName: 'callout-ghost-flights',
			description:
				'<p>If you have been affected or have any information, we\'d like to hear from you. You can get in touch by filling in the form below or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447766780300">clicking here&nbsp;</a>or\n adding the contact +44(0)7766780300. Only the Guardian can see your \ncontributions and one of our journalists may contact you to discuss \nfurther.&nbsp;<em>If you’re having trouble using the form, click&nbsp;<a href="https://guardiannewsandmedia.formstack.com/forms/facebook_whatsapp_and_instagram_outage">here</a>. Read terms of service&nbsp;<a href="https://www.theguardian.com/help/terms-of-service">here</a>&nbsp;and privacy policy&nbsp;<a href="https://www.theguardian.com/help/privacy-policy">here</a>.<br></em></p>',
			formFields: [
				{
					mandatory: true,
					text_size: 50,
					name: 'name',
					hide_label: '0',
					label: 'Name',
					id: '121575455',
					type: 'text',
					required: '1',
					options: [
						{
							label: 'Yes, entirely',
							value: 'Yes, entirely',
						},
					],
				},
				{
					mandatory: true,
					name: 'share_your_experiences_of_ghost_flights_during_the_pandemic',
					description: 'Include as much detail as possible.',
					hide_label: '0',
					label: 'Share your experiences of ghost flights during the pandemic',
					id: '121575458',
					type: 'textarea',
					required: '1',
					options: [
						{
							label: 'Yes, entirely',
							value: 'Yes, entirely',
						},
					],
				},
				{
					mandatory: true,
					text_size: '30',
					name: 'if_you_are_happy_to_please_upload_a_photo_of_yourself',
					hide_label: '0',
					label: 'If you are happy to, please upload a photo of yourself',
					id: '121575460',
					type: 'file',
					required: '0',
					options: [
						{
							label: 'Yes, entirely',
							value: 'Yes, entirely',
						},
					],
				},
				{
					mandatory: true,
					name: 'can_we_publish_your_response',
					options: [
						{
							label: 'Yes, entirely',
							value: 'Yes, entirely',
						},
						{
							label: 'Yes, but contact me first',
							value: 'Yes, but contact me first',
						},
						{
							label: 'Yes, but please keep me anonymous',
							value: 'Yes, but please keep me anonymous',
						},
						{
							label: 'No, this is information only',
							value: 'No, this is information only',
						},
					],
					hide_label: '0',
					label: 'Can we publish your response?',
					id: '121575461',
					type: 'radio',
					required: '1',
				},
			],
			formUrl:
				'https://guardiannewsandmedia.formstack.com/forms/ghost_flights',
		},
	},
];




const callout = () => {
	// const docParser = (html: string) => fragment;

	const frag = document.createDocumentFragment();
	const el = document.createElement('p');
	el.appendChild(document.createTextNode('If you have been affected or have any information, we\'d like to hear from you. You can get in touch by filling in the form below or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447766780300">clicking here&nbsp;</a>or\n adding the contact +44(0)7766780300. Only the Guardian can see your \ncontributions and one of our journalists may contact you to discuss \nfurther.&nbsp;<em>If you’re having trouble using the form, click&nbsp;<a href="https://guardiannewsandmedia.formstack.com/forms/facebook_whatsapp_and_instagram_outage">here</a>. Read terms of service&nbsp;<a href="https://www.theguardian.com/help/terms-of-service">here</a>&nbsp;and privacy policy&nbsp;<a href="https://www.theguardian.com/help/privacy-policy">here</a>.<br></em>'));
	frag.appendChild(el);

	return (
	<div style={{padding: '10px'}}>
		<Callout format={mockFormat} campaign={mockCampaigns[0]} description={frag} />
		</div>
)};


const collapsibleCallout = () => (
	<div style={{padding: '10px'}}>
		<ExpandingWrapper format={mockFormat}>
			<div>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ultricies libero in aliquam. Nullam sollicitudin purus vitae lacus elementum accumsan. Nam pulvinar dui euismod, viverra felis eu, rhoncus urna. In sodales lobortis magna, vitae mollis ante tristique in. Donec quis lacus orci. Pellentesque eget arcu sed elit scelerisque posuere. Duis tempus rhoncus leo at convallis. Ut massa quam, blandit eget porttitor a, eleifend vel dolor. Nulla mi est, egestas eget elementum eu, imperdiet sed lacus. Nulla dictum urna porta interdum volutpat. Etiam malesuada odio at eros bibendum aliquet. Aenean porttitor lobortis purus sed consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum, libero ut porttitor egestas, diam ex viverra nunc, a vestibulum elit sem vitae lectus. Fusce in volutpat libero, vitae laoreet turpis. Fusce sagittis massa metus.
				</p>
				<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ultricies libero in aliquam. Nullam sollicitudin purus vitae lacus elementum accumsan. Nam pulvinar dui euismod, viverra felis eu, rhoncus urna. In sodales lobortis magna, vitae mollis ante tristique in. Donec quis lacus orci. Pellentesque eget arcu sed elit scelerisque posuere. Duis tempus rhoncus leo at convallis. Ut massa quam, blandit eget porttitor a, eleifend vel dolor. Nulla mi est, egestas eget elementum eu, imperdiet sed lacus. Nulla dictum urna porta interdum volutpat. Etiam malesuada odio at eros bibendum aliquet. Aenean porttitor lobortis purus sed consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum, libero ut porttitor egestas, diam ex viverra nunc, a vestibulum elit sem vitae lectus. Fusce in volutpat libero, vitae laoreet turpis. Fusce sagittis massa metus.
				</p>
			</div>

		{/* <CalloutForm
			format={mockFormat}
			campaign={mockCampaigns[0]}
			description={document.createDocumentFragment()}

			/> */}
			</ExpandingWrapper>
			</div>
);


export default {
	component: callout,
	title: 'AR/Callout',
};

export { callout, collapsibleCallout };
