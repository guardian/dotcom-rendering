import { MarketingConsentEmail } from 'src/types/content';
import { TagType } from 'src/types/tag';

// consents are hard-coded into the identity codebase:
// https://github.com/guardian/identity/blob/main/identity-model/src/main/scala/com/gu/identity/model/Consent.scala#L91
// https://github.com/guardian/identity/blob/main/docs/user-model.md
// https://github.com/guardian/identity/blob/main/docs/consents-model.md

// Add the "promotionTagId" property to a MarketingConsentEmail
// to set which tag will cause a MarketingEmailSignupBlockElement
// promoting thr email to be inserted into the article body.
export const marketingEmails: MarketingConsentEmail[] = [
	{
		id: 'jobs',
		name: 'Guardian Jobs',
		description:
			'Find your next job with the Guardian Jobs weekly email. Get the latest job listings, as well as tips and advice on taking your next career step.',
	},
	{
		id: 'supporter',
		name: 'Supporting the Guardian',
		description:
			'Stay up-to-date with the latest offers and the aims of the organisation, as well as ways you can enjoy and support our independent journalism.',
	},
	{
		id: 'holidays',
		name: 'Holidays & Vacations',
		description:
			'Ideas and inspiration for your next trip away, as well as the latest offers from Guardian Holidays in the UK and Guardian Vacations in the US.',
	},
	{
		id: 'events',
		name: 'Guardian Live events',
		description:
			'Receive weekly newsletters about our new livestreamed and interactive events that you can access from wherever you are in the world.',
	},
	{
		id: 'offers',
		name: 'Trusted Partners',
		description:
			"Offers and competitions from the Guardian's carefully selected and trusted partners that we think you might like, such as Glastonbury competitions and charity appeals.",
	},
];

export const findPromotedMarketingEmail = (tags?: TagType[]) => {
	const tagIds = tags?.map((tag) => tag.id);
	return (
		tagIds &&
		marketingEmails.find(
			(email) =>
				email.promotionTagId && tagIds.includes(email.promotionTagId),
		)
	);
};
