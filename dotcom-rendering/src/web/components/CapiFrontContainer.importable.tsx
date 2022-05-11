import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import { TextInput, Button } from '@guardian/source-react-components';
import { storage } from '@guardian/libs';
import {DecideContainer} from "../lib/DecideContainer";
import {ContainerLayout} from "./ContainerLayout";

const inputContainerStyle = css`
	margin: 0 10px 10px;
	display: flex;
`;
const inputStyles = css`
	width: 500px;
`;
const clearButtonStyle = css`
	align-self: flex-end;
	margin-left: 5px;
`;

const tagListStyle = css`
	display: flex;
	flex-direction: column;
	background-color: white;
	position: absolute;
	top: 79px;
  	z-index: 99;
  	0 0 5px 5px;
  	border-radius: 20px;

`;
const tagButtonStyle = css`
	margin: 5px;
	width: 500px;
`;

interface CapiItem {
	id: string;
	webTitle: string;
	webPublicationDate: string;
	fields: {
		trailText: string;
		thumbnail: string;
	}
}

interface CapiTag {
	id: string;
	webTitle: string;
	sectionName?: string;
	type: string;
}

const capiItemToFrontCard = ({ id, webTitle, webPublicationDate, fields }: CapiItem): DCRFrontCard => ({
	format: { display: 0, theme: 0, design: 0 },
	dataLinkName: 'news',
	url: `/${id}`,
	headline: webTitle,
	trailText: fields.trailText,
	webPublicationDate,
	image: fields.thumbnail,
	kickerText: undefined,
});

interface Query {
	tags: CapiTag[];
}

interface Props {
	collection: DCRCollectionType,
	ophanName: string;
	index: number;
}

const capiRequest = (type: 'content' | 'tag', body: any): Promise<any> =>
	fetch(`http://localhost:3030/capi/${type}`, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
	})
	.then(response => response.json())

export const CapiFrontContainer = ({
	collection,
	ophanName,
	index,
}: Props) => {
	const stored = storage.local.get('capi-collection');
	const initialQuery = stored ? JSON.parse(stored) : {tags: []}

	const [query, setQuery] = useState<Query>(initialQuery);
	const [trails, setTrails] = useState<DCRFrontCard[]>([]);
	const [tags, setTags] = useState<CapiTag[]>([]);

	useEffect(() => {
		console.log({query})
		if (query.tags.length > 0) {
			capiRequest('content', query)
				.then(json => {
					console.log(json)
					setTrails(json.map(capiItemToFrontCard));
				})
				.catch(err => console.log("content error", err))
		} else {
			setTrails([]);
		}
	}, [query]);

	const onInputChange = (event: React.FocusEvent<HTMLInputElement>): void => {
		if (event.target.value.length > 2) {
			capiRequest('tag', {query: event.target.value})
				.then(json => setTags(json))
				.catch(err => console.log("tag error", err))
		} else {
			setTags([]);
		}
		event.preventDefault()
	}

	const updateQueryTags = (newTags: CapiTag[]): void => {
		const newQuery = {
			...query,
			// tags: [...query.tags, tag.id]
			tags: newTags
		};
		setQuery(newQuery);
		storage.local.set('capi-collection', JSON.stringify(newQuery));
	}

	const TagsList = () => (
		<div css={tagListStyle} key="tags-list">
			{tags.map(tag => (
				<Button
					priority="secondary"
					css={tagButtonStyle}
					onClick={() => {
						console.log('clicked', tag.id)
						setTags([]);
						updateQueryTags([tag]);
					}}
				>
					{tag.webTitle} ({tag.sectionName || tag.type})
				</Button>
			))}
		</div>
	)

	// Only uses one tag for now
	const currentTag = query.tags[0];

	return (
		<ContainerLayout
			key="capi-container"
			title={collection.displayName}
			// TODO: This logic should be updated, as this relies
			// on the first container being 'palette styles do not delete'
			showTopBorder={true}
			sideBorders={true}
			padContent={false}
			centralBorder="partial"
			url={collection.href}
			// same as above re 'palette styles' for index increment
			ophanComponentLink={`container-${
				index + 1
			} | ${ophanName}`}
			ophanComponentName={`${ophanName}`}
			containerPalette={collection.containerPalette}
		>
			<div css={inputContainerStyle} key="capi-input-container">
				<div>
					<TextInput
						css={inputStyles}
						key="capi-input"
						label={currentTag ? `Currently showing content about ${currentTag.webTitle}` : 'Enter a search term...'}
						onChange={onInputChange}
					/>
				</div>
				{ query.tags.length > 0 &&
					<Button
						css={clearButtonStyle}
						onClick={() => {
							updateQueryTags([]);
						}}
					>
						Clear
					</Button>
				}
			</div>
			<TagsList />
			{trails.length > 0 &&
				<DecideContainer
					trails={trails}
					containerType={collection.collectionType}
					containerPalette={collection.containerPalette}
				/>
			}
		</ContainerLayout>
	)
}
