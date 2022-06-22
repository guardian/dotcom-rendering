type Props = {
	topics: Topic[];
};

export const TopicFilterBank = ({ topics }: Props) => {
	console.log(topics);
	return (
		<div>
			<div>
				Filters (<span>BETA</span>):
			</div>
			{topics.map((topic) => {
				return <h1>{topic.value}</h1>;
			})}
		</div>
	);
};
