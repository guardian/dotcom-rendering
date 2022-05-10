import { css } from '@emotion/react';
import {
	Button,
	CheckboxGroup,
	Checkbox,
} from '@guardian/source-react-components';
import { useState } from 'react';
import { getTags, getAvailableTags, saveTags } from './SignInGate/wellbeing';

interface Props {
	tags: TagType[];
}

export const ManageWellbeingPrefs = ({ tags }: Props) => {
	const userTags = getTags();
	const availableTags = getAvailableTags(tags);
	const defaultTagState: Record<string, boolean> = {};
	availableTags.forEach((tag) => {
		if (userTags.includes(tag)) {
			defaultTagState[tag] = true;
		} else {
			defaultTagState[tag] = false;
		}
	});
	const [tagState, setTagState] = useState(defaultTagState);

	const saveUserTags = () => {
		const newTags = Object.keys(tagState).filter((tag) => tagState[tag]);
		saveTags(newTags);
		window.location.reload();
	};

	return (
		<div>
			<CheckboxGroup
				label="Choose tags to hide"
				name="tags"
				supporting="These are your selected and available tags"
			>
				{availableTags.map((tag) => {
					return (
						<Checkbox
							id={tag}
							checked={tagState[tag]}
							label={tag}
							value={tag}
							onChange={() => {
								setTagState({
									...tagState,
									[tag]: !tagState[tag],
								});
							}}
						/>
					);
				})}
			</CheckboxGroup>
			<div
				css={css`
					margin-top: 8px;
				`}
			>
				<Button onClick={() => saveUserTags()}>Save</Button>
			</div>
		</div>
	);
};
