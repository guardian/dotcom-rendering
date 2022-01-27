import { css } from '@emotion/react';
import { joinUrl } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { useApi } from '../lib/useApi';

type Props = {
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
};

const Toast = ({
	onClick,
	noOfNewPosts,
}: {
	onClick: () => void;
	noOfNewPosts: number;
}) => {
	// TODO: Style and absolute position this component
	return (
		<nav
			css={css`
				position: fixed;
				top: 20px;
				left: 50px;
				display: flex;
				width: 100%;
				align-items: center;
			`}
		>
			<button onClick={onClick}>{`${noOfNewPosts} blah`}</button>
		</nav>
	);
};

function hydrateBlocks() {
	console.log('hydrateBlocks');
	// TODO Call existing hydration solution targetted to these elements
	// Maybe we can make doHydration work for all gu-islands things
	// where the gu-hydrated data attribute isn't set?
}

/**
 * insertNewBlocks takes html and inserts it at the top of the liveblog
 *
 * @param html The block html to be inserted
 * @returns void
 */
function insertNewBlocks(html: string) {
	/**
	 * TODO: We need to make the call to get new posts idempotent. As such, this
	 * action needs to first remove any existing posts with ids the same as the
	 * batch beforing inserting
	 */
	const latestBlock = document.querySelector('#maincontent :first-child');

	if (!latestBlock) return;

	latestBlock.insertAdjacentHTML('beforebegin', `<article>${html}</article>`);
}

/**
 * revealNewBlocks - style any blocks that have been inserted but are hidden such that
 * they are revealed
 */
function revealNewBlocks() {
	console.log('revealNewBlocks');
}

const isServer = typeof window === 'undefined';

const topOfBlog: Element | null | false =
	!isServer && window.document.querySelector('[data-gu-marker=top-of-blog]');

function topOfBlogVisible() {
	return topOfBlog && topOfBlog.classList.contains('in-viewport');
}

if (topOfBlog) {
	const observer = new window.IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-viewport');
				return;
			}
			entry.target.classList.remove('in-viewport');
		},
		{
			root: null,
			threshold: 0.1,
		},
	);

	observer.observe(topOfBlog);
}

// TODO: Should we dismiss the toast on escape key press?

export const Liveness = ({ pageId, webTitle, ajaxUrl }: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [noOfNewPosts, setNoOfNewPosts] = useState(0);

	const latestBlockId: string =
		(!isServer &&
			document.querySelector('#maincontent :first-child')?.id) ||
		'';

	// TODO: Read `filterKeyEvents` from the url
	// TODO: Do we need `filterKeyEvents` and `isLivePage` here?
	const url = `${joinUrl(
		ajaxUrl,
		pageId,
	)}.json?lastUpdate=${latestBlockId}&isLivePage=true&filterKeyEvents=false`;

	// useApi returns { data, loading, error } but we're not using them here
	useApi<{
		numNewBlocks: number;
		html: string;
	}>(url, {
		refreshInterval: 10000,
		refreshWhenHidden: true,
		// onSuccess runs (once) after every successful api call. This is useful because it
		// allows us to avoid the problems of imperative code being executed multiple times
		// inside react's declarative structure (things get re-rendered when any state changes)
		onSuccess: (data: { numNewBlocks: number; html: string }) => {
			// TODO: What if we've made the same call previously?
			if (data && data.numNewBlocks && data.numNewBlocks > 0) {
				// Always insert the new blocks in the dom (but hidden)
				insertNewBlocks(data.html);
				hydrateBlocks();

				if (topOfBlogVisible()) {
					revealNewBlocks();
					setNoOfNewPosts(0);
				} else {
					setShowToast(true);
					// Increment the count of new posts
					setNoOfNewPosts(noOfNewPosts + data.numNewBlocks);
				}
			}
		},
	});

	useEffect(() => {
		document.title =
			noOfNewPosts > 0 ? `(${noOfNewPosts}) ${webTitle}` : webTitle;
	}, [noOfNewPosts, webTitle]);

	const handleToastClick = () => {
		setShowToast(false);
		if (topOfBlog) topOfBlog.scrollIntoView();
		revealNewBlocks();
		setNoOfNewPosts(0);
	};

	if (showToast) {
		return <Toast onClick={handleToastClick} noOfNewPosts={noOfNewPosts} />;
	}

	// Raw CAPI response as a string
	return (
		<button
			onClick={() =>
				insertNewBlocks(
					'<p><strong>Conor Burns</strong>, a Northern Ireland minister and one of the arch Johnson loyalists in government, told BBC News that, with the Covid pandemic easing, the PM would “relish getting back to the domestic agenda”. He also said he thought Boris Johnson would see off the threat to his leadership. He said:</p> <blockquote class="quoted"> <p>I believe that there will not be a vote of confidence, I believe that Boris Johnson will be prime minister for many years ahead, and I believe that Boris Johnson will win the next general election.</p> </blockquote> <p>The lack of doubt on show from the Johnson Praetorian Guard today (see Jacob Rees-Mogg this morning at <a href="https://www.theguardian.com/politics/live/2022/jan/25/boris-johnson-birthday-party-live-news-partygate-covid-coronavirus-omicron-politics?page=with:block-61efe2fb8f08f876e67516e2#block-61efe2fb8f08f876e67516e2">11.51am</a> for another example) is certainly a notch or two beyond what we have heard from them in the past. But their public certainty is probably in inverse proportion to the confidence they feel in private about the PM’s chances of survival.</p>  <figure class="element element-image" data-media-id="9662ba450311a7e5986fecadb4d32f0e8fbf5274"> <img src="https://media.guim.co.uk/9662ba450311a7e5986fecadb4d32f0e8fbf5274/0_0_1622_906/1000.jpg" alt="Conor Burns" width="1000" height="559" class="gu-image" /> <figcaption> <span class="element-image__caption">Conor Burns</span> <span class="element-image__credit">Photograph: BBC News</span> </figcaption> </figure>',
				)
			}
		>
			Click me
		</button>
	);
};
