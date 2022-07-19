import { css } from "@emotion/react";
import { breakpoints, from } from "@guardian/source-foundations";
import { FC } from "react";
import { PinnedPost } from "./PinnedPost";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

// export default {
// 	component: PinnedPost,
// 	title: 'Components/PinnedPost',
// 	parameters: {
// 		backgrounds: {
// 			default: 'grey',
// 			values: [{ name: 'grey', value: 'lightgrey' }],
// 		},
// 		chromatic: {
// 			viewports: [breakpoints.mobile, breakpoints.wide],
// 		},
// 	},
// };

const Default: FC = () => (
    <Wrapper>
        {/* <PinnedPost>

        </PinnedPost> */}
    </Wrapper>
);