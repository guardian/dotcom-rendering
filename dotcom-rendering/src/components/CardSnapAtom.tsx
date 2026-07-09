import type { SnapAtoms } from '../types/front';
import { AudioAtomWrapper } from './AudioAtomWrapper.island';
import { CallToActionAtom } from './CallToActionAtom';
import { ExplainerAtom } from './ExplainerAtom';
import { FootballCompetitionAtom } from './FootballCompetitionAtom.island';
import { GuideAtomWrapper } from './GuideAtomWrapper.island';
import { Island } from './Island';
import { ProfileAtomWrapper } from './ProfileAtomWrapper.island';
// import { QandaAtom } from './QandaAtom.island';
import { TimelineAtom } from './TimelineAtom.island';

type Props = {
	atoms: SnapAtoms;
};

/**
 * Renders an atom (guide, Q&A, profile, timeline, audio, explainer or CTA) that
 * has been placed on a front as a snap and pre-fetched by facia-press.
 *
 * Mirrors the equivalent atom cases in `renderElement`, keeping the conditional
 * atom logic out of `Card`.
 */
export const CardSnapAtom = ({ atoms }: Props) => {
	console.log('test');
	if (atoms.guide) {
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<GuideAtomWrapper
					id={atoms.guide.id}
					title={atoms.guide.title}
					html={atoms.guide.html}
					image={atoms.guide.img}
					credit={atoms.guide.credit}
				/>
			</Island>
		);
	}

	if (atoms.qanda) {
		const mockData = {
			competitionId: '700',
			footballCompetitionComponentType: 'match-day',
		};

		// for testing until the capi flow is setup
		if (mockData) {
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<FootballCompetitionAtom
						footballCompetitionData={mockData}
					/>
				</Island>
			);
		}

		//  // return (
		//  //  <Island priority="feature" defer={{ until: 'visible' }}>
		//  //      <QandaAtom
		//  //          id={atoms.qanda.id}
		//  //          title={atoms.qanda.title}
		//  //          html={atoms.qanda.html}
		//  //          image={atoms.qanda.img}
		//  //          credit={atoms.qanda.credit}
		//  //      />
		//  //  </Island>
		//  // );
	}

	if (atoms.profile) {
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<ProfileAtomWrapper
					id={atoms.profile.id}
					title={atoms.profile.title}
					html={atoms.profile.html}
					image={atoms.profile.img}
					credit={atoms.profile.credit}
				/>
			</Island>
		);
	}

	if (atoms.timeline) {
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<TimelineAtom
					id={atoms.timeline.id}
					title={atoms.timeline.title}
					events={atoms.timeline.events}
					description={atoms.timeline.description}
				/>
			</Island>
		);
	}

	if (atoms.audio) {
		return (
			<Island priority="critical" defer={{ until: 'visible' }}>
				<AudioAtomWrapper
					id={atoms.audio.id}
					trackUrl={atoms.audio.trackUrl}
					kicker={atoms.audio.kicker}
					title={atoms.audio.title}
					duration={atoms.audio.duration}
					contentIsNotSensitive={true}
					aCastisEnabled={false}
					readerCanBeShownAds={false}
				/>
			</Island>
		);
	}

	if (atoms.explainer) {
		return (
			<ExplainerAtom
				id={atoms.explainer.id}
				title={atoms.explainer.title}
				html={atoms.explainer.body}
			/>
		);
	}

	if (atoms.cta) {
		return (
			<CallToActionAtom
				linkUrl={atoms.cta.url}
				backgroundImage={atoms.cta.image}
				text={atoms.cta.label}
				buttonText={atoms.cta.btnText}
			/>
		);
	}

	// if (atoms.footballcompetition) {
	// 	return (
	// 		<FootballCompetitionAtom
	// 			footballCompetitionData={atoms.footballcompetition}
	// 		/>
	// 	);
	// }

	return null;
};
