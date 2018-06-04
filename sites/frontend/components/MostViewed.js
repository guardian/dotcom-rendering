// @flow
import { Component, styled } from '@guardian/guui';
import { headline, textEgyptian } from '@guardian/pasteup/fonts';
import palette from '@guardian/pasteup/palette';
import { desktop } from '@guardian/pasteup/breakpoints';
import Numbers from '@guardian/guui/big-numbers';

const Heading = styled('h2')({
    fontFamily: headline,
    color: palette.neutral[1],
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 900,
    marginTop: 27,
    marginBottom: 1,
});

const ListItem = styled('li')({
    columnFill: 'balance',
    [desktop]: {
        columnWidth: 600,
    },
    height: '100%',
    display: 'inline-block',
    width: '100%',
    paddingTop: '0.1875rem',
    paddingBottom: 0,
    minHeight: '4.5rem',
});

const Number = styled('span')({
    float: 'left',
});

const Headline = styled('h2')({
    marginLeft: '4.375rem',
});

const HeadlineBody = styled('a')({
    color: palette.neutral[2],
    fontFamily: textEgyptian,
});

export default class MostViewed extends Component {
    constructor() {
        super();
        this.state = { trails: [] };
    }

    componentDidMount() {
        fetch('https://api.nextgen.guardianapps.co.uk/most-read-geo.json?guui')
            .then(resp => resp.json())
            .then(({ trails }) => {
                this.setState({
                    trails,
                });
            });
    }

    render() {
        return (
            <div>
                <Heading>Most Viewed</Heading>
                <ul>
                    {this.state.trails.map((trail, i) => (
                        <ListItem key={trail.url}>
                            <Number>
                                <Numbers index={i + 1} />
                            </Number>

                            <Headline>
                                <HeadlineBody href={trail.url}>
                                    {trail.linkText}
                                </HeadlineBody>
                            </Headline>
                        </ListItem>
                    ))}
                </ul>
            </div>
        );
    }
}
