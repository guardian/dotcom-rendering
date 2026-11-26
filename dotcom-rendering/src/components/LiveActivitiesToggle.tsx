import { log } from '@guardian/libs';
import {
	SvgNotificationsOff,
	SvgNotificationsOn,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { LiveActivitiesClient } from '../lib/bridgetApi';
import type { ColourName } from '../paletteDeclarations';
import { ToggleButton } from './ToggleButton';

type Props = {
	id: string;
	activityType: 'football-match';
	liveActivitiesClient: LiveActivitiesClient;
	colour: ColourName;
	backgroundColour: ColourName;
	iconColour: ColourName;
	className?: string;
};

export const LiveActivitiesToggle = (props: Props) => {
	const [isFollowing, setIsFollowing] = useIsFollowing(
		props.id,
		props.activityType,
		props.liveActivitiesClient,
	);

	return (
		<ToggleButton
			colour={props.colour}
			icon={
				isFollowing ? (
					<SvgNotificationsOn size="xsmall" />
				) : (
					<SvgNotificationsOff size="xsmall" />
				)
			}
			iconBackground={isFollowing ? props.iconColour : undefined}
			iconBorder={props.iconColour}
			iconFill={isFollowing ? props.backgroundColour : props.iconColour}
			onClick={toggleLiveActivity(
				props.id,
				props.activityType,
				props.liveActivitiesClient,
				isFollowing,
				setIsFollowing,
			)}
			className={props.className}
		>
			Live match updates {isFollowing ? 'on' : 'off'}
		</ToggleButton>
	);
};

/**
 * Retrieves information about whether the user is following a particular live
 * activity, via Bridget, and stores it in a state variable for use in the rest
 * of the component. Also supplies a setter to update that state, similar to
 * `useState`.
 */
const useIsFollowing = (
	id: string,
	activityType: Props['activityType'],
	liveActivitiesClient: Props['liveActivitiesClient'],
): [
	boolean | undefined,
	React.Dispatch<React.SetStateAction<boolean | undefined>>,
] => {
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		void liveActivitiesClient
			.isFollowing(activityType, id)
			.then(setIsFollowing)
			.catch(handleError('isFollowing'));
	}, [id, activityType, liveActivitiesClient]);

	return [isFollowing, setIsFollowing];
};

const toggleLiveActivity = (
	id: string,
	activityType: Props['activityType'],
	liveActivitiesClient: Props['liveActivitiesClient'],
	isFollowing: boolean | undefined,
	setIsFollowing: (a: boolean) => void,
): (() => void) =>
	isFollowing === undefined
		? () => undefined
		: () => {
				if (isFollowing) {
					void liveActivitiesClient
						.unfollow(activityType, id)
						.then((success) => {
							if (success) {
								setIsFollowing(false);
							}
						})
						.catch(handleError('unfollow'));
				} else {
					void liveActivitiesClient
						.follow(activityType, id)
						.then((success) => {
							if (success) {
								setIsFollowing(true);
							}
						})
						.catch(handleError('follow'));
				}
			};

const handleError =
	(methodName: 'follow' | 'unfollow' | 'isFollowing') =>
	(error: any): void => {
		window.guardian.modules.sentry.reportError(
			error,
			`bridget-getLiveActivitiesClient-${methodName}-error`,
		);
		log(
			'dotcom',
			`Bridget getLiveActivitiesClient.${methodName} Error:`,
			error,
		);
	};
