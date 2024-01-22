/**
 * Presentational components that display the comments and forms.
 */

type CommentEntryProps = {
	text: string;
	onChange: (comment: string) => void;
	postComment: () => void;
};

/**
 * The form fields used to write and post comments.
 */
const CommentEntry = ({ text, onChange, postComment }: CommentEntryProps) => (
	<>
		<textarea
			rows={5}
			cols={80}
			placeholder="A comment..."
			value={text}
			onChange={(e) => onChange(e.target.value)}
		/>
		<button onClick={() => postComment()}>Post Comment</button>
	</>
);

type Props = {
	comments: string[];
	postComment: CommentEntryProps['postComment'];
	errorMessage: string | undefined;
	commentEntryText: CommentEntryProps['text'];
	commentEntryChange: CommentEntryProps['onChange'];
};

/**
 * The list of comments, form fields for posting comments, and an error message.
 */
const Comments = ({
	comments,
	postComment,
	errorMessage,
	commentEntryText,
	commentEntryChange,
}: Props) => {
	return (
		<>
			<ul>
				{comments.map((comment) => (
					<li key={comment}>{comment}</li>
				))}
			</ul>
			<CommentEntry
				text={commentEntryText}
				onChange={commentEntryChange}
				postComment={postComment}
			/>
			{errorMessage === undefined ? null : <p>{errorMessage}</p>}
		</>
	);
};

export { Comments };
