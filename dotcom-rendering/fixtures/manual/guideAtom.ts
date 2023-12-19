import { ArticleDesign, Pillar } from '@guardian/libs';

export const defaultStoryExpanded = {
	id: 'a76d998e-d4b0-4d00-8afb-773eddb4064c',
	title: "Wednesday's Hong Kong tips",
	html: '<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>',
	pillar: Pillar.Sport,
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

// Non expanded version needed for Cypress
export const defaultStory = {
	id: 'a76d998e-d4b0-4d00-8afb-773eddb4064c',
	title: "Wednesday's Hong Kong tips",
	html: '<p><b>Happy Valley&nbsp;</b></p><p><b>11.45</b> Happy Good Guys <b>12.15</b> Salto Olimpico <b>12.45</b> Seize The Spirit <b>1.15</b> Allied Agility <b>1.45 </b>Hero Time <b>2.15</b> Simply Fluke <b>2.45</b> Brave King <b>3.15</b> Golden Dash <b>3.50</b> This Is Class</p>',
	expandForStorybook: false,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

export const listStoryExpanded = {
	id: '0a09a661-0ee2-41ea-b0a0-9e1deefd9268',
	label: 'Quick Guide',
	title: 'What are coronavirus symptoms and should I go to a doctor?',
	html: '<p>Covid-19 is caused by a member of the coronavirus family that has never been encountered before. Like other coronaviruses, it has come from animals. The World Health Organization (WHO) has declared it a pandemic.</p><p>According to the WHO, the most common symptoms of Covid-19 are fever, tiredness and a dry cough. Some patients may also have a runny nose, sore throat, nasal congestion and aches and pains or diarrhoea. Some people report losing their sense of taste and/or smell. About 80% of people who get Covid-19 experience a mild case – about as serious as a regular cold – and recover without needing any special treatment.</p><p>About one in six people, the WHO says, become seriously ill. The elderly and people with underlying medical problems like high blood pressure, heart problems or diabetes, or chronic respiratory conditions, are at a greater risk of serious illness from Covid-19.</p><p>In the UK, the National health Service (NHS) has identified the specific symptoms to look for as experiencing either:</p><ul><li>a high temperature - you feel hot to touch on your chest or back</li><li>a new continuous cough - this means you’ve started coughing repeatedly</li></ul><p>As this is viral pneumonia, antibiotics are of no use. The antiviral drugs we have against flu will not work, and there is currently no vaccine. Recovery depends on the strength of the immune system.</p><p>Medical advice varies around the world - with many countries imposing travel bans and lockdowns to try and prevent the spread of the virus. In many place people are being told to stay at home rather than visit a doctor of hospital in person. Check with your local authorities.</p><p>In the UK, NHS advice is that anyone with symptoms should<b> stay at home for at least 7 days</b>. If you live with other people, <b>they should stay at home for at least 14 days</b>, to avoid spreading the infection outside the home.</p>',
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

export const orderedListStoryExpanded = {
	id: 'b4c77875-8ba3-40d0-926b-0cd7956eed8a',
	title: 'The locations in England with the highest annual average levels of NO2',
	html: '<ol><li>Chideock Hill, West Dorset 97.7</li><li>Station Taxi Rank, Sheffield 91.7</li><li>North Street Clock Tower, Brighton 90.8</li><li>Neville Street Tunnel, Leeds 88</li><li>Strand, City of Westminster 88</li><li>Walbrook Wharf, City of London 87</li><li>Hickleton opp Fir Tree Close, Doncaster 86</li><li>Marylebone Road, City of Westminster 85</li><li>Euston Road, London Borough of Camden 82.3</li><li>Hickleton, John O’Gaunts, Doncaster 82</li></ol><p>&nbsp;Latest data is from 2018.&nbsp; The Annual Air Quality Objective is set at 40ug/m3. Source: Friends of the Earth&nbsp;<br></p>',
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

export const imageStoryExpanded = {
	id: '249abe8e-134a-45e3-afcf-b45a665c9a93',
	label: 'Quick Guide',
	title: 'Tory party leadership contest',
	html: "<p>As she <a href='https://www.theguardian.com/politics/video/2019/may/24/prime-minister-theresa-mays-resignation-speech-in-full-video'>announced on 24 May</a>, Theresa May stepped down formally as Conservative leader on Friday 7 June, although she remains in place as prime minister until her successor is chosen.</p><p>In a Conservative leadership contest MPs hold a series of votes, in order to narrow down the initially crowded field to two leadership hopefuls, who go to a postal ballot of members.<br></p><p><b>How does the voting work?</b></p><p>MPs choose one candidate, in a secret ballot held in a committee room in the House of Commons. The votes are tallied and the results announced on the same day.</p><p>In the first round any candidate who won the support of less than 17 MPs was eliminated. In the second round anybody reaching less than 33 votes was eliminated. In subsequent rounds the bottom placed contender drops out until there are only two left. The party membership then chooses between them.</p><p><b>When will the results be announced?</b><br></p><p>The postal ballot of members has begun, and the Tory party says it will announce the new prime minister on 23 July..</p>",
	credit: 'Photograph: Neil Hall/EPA',
	image: 'https://i.guim.co.uk/img/media/d032f9d883807ea5003356289b7a1e9783cc67e5/0_37_4131_2480/4131.jpg?width=620&quality=85&auto=format&fit=max&s=53971cc47cb7c125202b7a647e82a44d',
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

export const lifestylePillarStoryExpanded = {
	id: 'acf5fd97-28ab-4971-96f2-2acaab08b5e9',
	title: 'What is the energy price cap and how does it work?',
	html: "<p>The cap, one of the biggest shake-ups of the energy market since privatisation,&nbsp;<a href='https://www.theguardian.com/business/2018/dec/31/millions-to-see-annual-energy-bills-drop-as-price-cap-takes-effect'>came into effect on 1 January 2019</a>&nbsp;for 11m households on default tariffs, known as standard variable tariffs (SVTs). The government told the energy regulator, Ofgem, to set the cap because ministers argued people on SVTs were being ripped off by big energy firms capitalising on consumer loyalty. The limit is not an absolute one but the maximum suppliers can charge per unit of energy and for a standing charge. There is a separate cap for 4m homes on prepayment meters.</p><p><b>Does that mean energy bills will never go up?</b></p><p>No. It is not <a href='https://www.theguardian.com/money/2017/apr/23/energy-prices-tory-cap-miliband-freeze'>a freeze</a>, it is a movable cap. The energy cap has fallen twice since it was put in place because the wholesale price of electricity and gas, the biggest variable influencing prices, have fallen. But if energy market prices climb higher, the cap would move higher, too. Homes may also face higher bills if they use more energy because the cap applies to the price of each unit of energy - not the whole bill.&nbsp;</p><p><b>Is there any way to avoid the increase?</b></p><p>Yes. Homes can save hundreds of pounds a year by spending a few minutes on one of the many comparison sites, or sign up to an <a href='https://www.theguardian.com/money/2019/feb/02/energy-bills-will-these-sites-save-you-a-flipping-fortune'>auto-switching service</a>, and move to a cheaper tariff, either with your existing supplier or a rival one. Fixed tariffs, which are not covered by the cap, are almost always much cheaper than SVTs, although <a href='https://www.theguardian.com/money/2018/oct/22/third-dual-fuel-tariffs-break-government-price-cap'>there are exceptions</a>, so watch out. Several smaller suppliers also offer good customer service and variable tariffs that are well below the cap.&nbsp;</p><p><b>Could bills fall again?</b></p><p>Maybe. Energy market experts believe gas and electricity wholesale prices will remain low through 2020 because energy demand is lower than normal because of the Covid-19 crisis. But wholesale costs are not the only factor in setting the level of the cap. Ofgem, the regulator, includes the cost of using energy networks and paying for government policies, too. These costs are expected to keep rising.&nbsp;</p>",
	credit: '',
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};

export const analysisStoryExpanded = {
	id: 'a76d998e-d4b0-4d00-8afb-773eddb4064c',
	title: 'Qatar: beyond the football',
	html: '<p>It was a World Cup like no other. For the last 12 years the Guardian has been reporting on the issues surrounding Qatar 2022, from corruption and human rights abuses to the treatment of migrant workers and discriminatory laws. <br/> The best of our journalism is gathered on our dedicated <a href="https://www.theguardian.com/news/series/qatar-beyond-the-football">Qatar: Beyond the Football</a> home page for those who want to go deeper into the issues beyond the pitch. <br/> <br/> Guardian reporting goes far beyond what happens on the pitch. Support our investigative journalism today.</p>',
	image: 'https://i.guim.co.uk/img/media/48be60e8b3371ffecc4f784e0411526ed9f3f3ba/1700_1199_1330_1331/1330.jpg?width=620&quality=85&auto=format&fit=max&s=8b3ad26c4ab238688c860e907b2cb116',
	pillar: Pillar.Sport,
	design: ArticleDesign.Analysis,
	expandForStorybook: true,
	likeHandler: (): null => null,
	dislikeHandler: (): null => null,
	expandCallback: (): null => null,
};
