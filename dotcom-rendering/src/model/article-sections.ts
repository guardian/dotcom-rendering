export const sections: SectionNielsenAPI[] = [
	{
		name: 'Guardian',
		apiID: '2879C1E1-7EF9-459B-9C5C-6F4D2BC9DD53',
	},
	{
		name: 'Books',
		apiID: '4994D04B-4279-4184-A2C5-E8BB1DD50AB9',
	},
	{
		name: 'Business',
		apiID: '163BF72C-72D0-4702-82A9-17A548A39D79',
	},
	{
		name: 'CommentIsFree',
		apiID: 'C962A2C3-C9E1-40DD-9B58-7B1095EDB16E',
	},
	{
		name: 'Culture',
		apiID: '87C0725C-D478-4567-967B-E3519ECD12E8',
	},
	{
		name: 'Education',
		apiID: 'DD50B111-D493-4D25-8980-2B0752E16ED1',
	},
	{
		name: 'Environment',
		apiID: 'FEC0766C-C766-4A77-91B3-74C5525E680F',
	},
	{
		name: 'Fashion',
		apiID: '1639B19E-B581-491E-94B7-FBACB6823C43',
	},
	{
		name: 'Film',
		apiID: 'D5BB97FE-637C-4E9E-B972-C8EA88101CB7',
	},
	{
		name: 'LifeStyle',
		apiID: 'B32533F9-65CF-4261-8BB9-2A707F59712A',
	},
	{
		name: 'Media',
		apiID: '385AA13F-9B64-4927-9536-BE70F9AD54BD',
	},
	{
		name: 'Money',
		apiID: '10BE8096-BF69-4252-AC27-C4127D8631F6',
	},
	{
		name: 'Music',
		apiID: '9D928193-7B5C-45A9-89E4-C47F42B8FB73',
	},
	{
		name: 'News',
		apiID: '66BEC53C-9890-477C-B639-60879EC4F762',
	},
	{
		name: 'Politics',
		apiID: 'C5C73A36-9E39-4D42-9049-2528DB5E998D',
	},
	{
		name: 'ProfessionalNetwork',
		apiID: '9DFEFF7E-9D45-4676-82B3-F29A6BF05BE1',
	},
	{
		name: 'Science',
		apiID: 'F4867E05-4149-49F0-A9DE-9F3496930B8C',
	},
	{
		name: 'Society',
		apiID: '617F9FB9-2D34-4C3A-A2E7-383AE877A35D',
	},
	{
		name: 'Sport',
		apiID: '52A6516F-E323-449F-AA57-6A1B2386F8F6',
	},
	{
		name: 'Technology',
		apiID: '4F448B55-305F-4203-B192-8534CB606C12',
	},
	{
		name: 'Travel',
		apiID: '05A03097-D4CA-46BF-96AD-935252967239',
	},
	{
		name: 'TvRadio',
		apiID: '3277F0D0-9389-4A32-A4D6-516B49D87E45',
	},
];

const subsections: { [key: string]: any } = {
	books: sections[1],
	'childrens-books-site': sections[1],
	business: sections[2],
	'better-business': sections[2],
	'business-to-business': sections[2],
	'working-in-development': sections[2],
	commentisfree: sections[3],
	culture: sections[4],
	artanddesign: sections[4],
	'culture-network': sections[4],
	'culture-professionals-network': sections[4],
	games: sections[4],
	stage: sections[4],
	education: sections[5],
	'higher-education-network': sections[5],
	'teacher-network': sections[5],
	environment: sections[6],
	'animals-farmed': sections[6],
	fashion: sections[7],
	film: sections[8],
	lifeandstyle: sections[9],
	media: sections[10],
	money: sections[11],
	music: sections[12],
	news: sections[13],
	'australia-news': sections[13],
	cardiff: sections[13],
	cities: sections[13],
	community: sections[13],
	edinburgh: sections[13],
	'global-development': sections[13],
	'government-computing-network': sections[13],
	law: sections[13],
	leeds: sections[13],
	local: sections[13],
	'local-government-network': sections[13],
	'media-network': sections[13],
	'uk-news': sections[13],
	'us-news': sections[13],
	weather: sections[13],
	world: sections[13],
	politics: sections[14],
	'guardian-professional': sections[15],
	'global-development-professionals-network': sections[15],
	'small-business-network': sections[15],
	science: sections[16],
	society: sections[17],
	'healthcare-network': sections[17],
	'housing-network': sections[17],
	inequality: sections[17],
	'public-leaders-network': sections[17],
	'social-care-network': sections[17],
	'social-enterprise-network': sections[17],
	'society-professionals': sections[17],
	'women-in-leadership': sections[17],
	sport: sections[18],
	football: sections[18],
	technology: sections[19],
	travel: sections[20],
	'travel/offers': sections[20],
	'tv-and-radio': sections[21],
};

export const findBySubsection = (subsection: string): SectionNielsenAPI => {
	const section = subsections[subsection];
	if (section) {
		return section;
	}

	return sections[0];
};
