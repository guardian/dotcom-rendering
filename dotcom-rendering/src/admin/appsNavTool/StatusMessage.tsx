import {
	palette,
	space,
	textEgyptian17Object,
} from '@guardian/source/foundations';
import { InlineSuccess, InlineError } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type { State } from './state';
import type { AppsNavError } from './error';
import { css } from '@emotion/react';

type Props = {
	message: State['statusMessage'];
};

export const StatusMessage = (props: Props) => {
	if (props.message === undefined) {
		return null;
	}

	return (
		<Output messageKind={props.message.kind}>
			<MessageText message={props.message} />
		</Output>
	);
};

type Message = Exclude<Props['message'], undefined>;

const Output = (props: {
	messageKind: Message['kind'];
	children: ReactNode;
}) => (
	<output
		css={{
			...textEgyptian17Object,
			display: 'block',
			position: 'sticky',
			bottom: 0,
			paddingLeft: space[4],
			paddingTop: space[2],
			paddingBottom: props.messageKind === 'ok' ? space[1] : space[2],
			borderWidth: 3,
			borderStyle: 'solid',
			backgroundColor: palette.neutral[100],
		}}
		style={{
			borderColor:
				props.messageKind === 'ok'
					? palette.success[400]
					: palette.error[400],
		}}
	>
		{props.children}
	</output>
);

const MessageText = (props: { message: Message }) => {
	switch (props.message.kind) {
		case 'ok':
			return <InlineSuccess>{props.message.value}</InlineSuccess>;
		case 'error':
			return <ErrorMessage error={props.message.error} />;
	}
};

const ErrorMessage = (props: { error: AppsNavError }) => {
	switch (props.error.kind) {
		case 'PublishError':
			switch (props.error.details) {
				case 'NetworkError':
					return (
						<>
							<InlineError>
								Publication issue due to a&nbsp;
								<Strong>network error</Strong>.
							</InlineError>
							Publication may or may not have succeeded, so you
							may want to check in the apps. If you retry and get
							a <Strong>version error</Strong> then it's possible
							that publication succeeded.
						</>
					);
				case 'VersionMismatch':
					return (
						<>
							<InlineError>
								Publication issue due to a&nbsp;
								<Strong>version error</Strong>.
							</InlineError>
							It appears the previous version of the nav has
							changed since you started editing it, which means
							someone else may be editing it at the same time. You
							will likely have to refresh and start again.
						</>
					);
				case 'ServerError':
					return (
						<>
							<InlineError>
								Publication issue due to a&nbsp;
								<Strong>server error</Strong>.
							</InlineError>
							You could try again, but if the problem persists you
							may want to contact the team who maintains this
							tool.
						</>
					);
			}
		case 'InsertError':
			return (
				<UnexpectedError>
					Could not insert the section. ({props.error.details} error
					occured for location [{props.error.location.join(', ')}])
				</UnexpectedError>
			);
		case 'DeleteError':
			return (
				<UnexpectedError>
					Could not delete the section. ({props.error.details} error
					occured for location [{props.error.location.join(', ')}])
				</UnexpectedError>
			);
		case 'MoveError':
			return (
				<UnexpectedError>
					Could not move the section. ({props.error.details} error
					occured for location [{props.error.location.join(', ')}],
					when attempting to move
					{props.error.distance < 0 ? ' up ' : ' down '}
					{Math.abs(props.error.distance)})
				</UnexpectedError>
			);
		case 'UpdateError':
			return (
				<UnexpectedError>
					Could not update the section. ({props.error.details} error
					occured for location [{props.error.location.join(', ')}])
				</UnexpectedError>
			);
		case 'NoHistoryError':
			return (
				<UnexpectedError>
					Could not undo anything, there is no history.
				</UnexpectedError>
			);
	}
};

const Strong = (props: { children: ReactNode }) => (
	<strong
		css={css({
			fontWeight: 'bold',
		})}
	>
		{props.children}
	</strong>
);

const UnexpectedError = (props: { children: ReactNode }) => (
	<>
		<InlineError>{props.children}</InlineError>
		This problem should not occur, so you may want to contact the team who
		maintains this tool, with steps to reproduce the problem if possible.
	</>
);
