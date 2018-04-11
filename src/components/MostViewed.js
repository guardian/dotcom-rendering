// @flow
import { Component } from 'preact';
import styled from 'preact-emotion';
import { headline, textEgyptian } from 'pasteup/fonts';
import palette from 'pasteup/palette';
import { desktop } from 'pasteup/breakpoints';
import Numbers from 'pasteup/numberSVGs';

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

const Headline = styled('div')({
    marginLeft: '4.375rem',
});

const HeadlineBody = styled('span')({
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
            .then(json => {
                this.setState({
                    trails: json.trails,
                });
            });
    }

    render() {
        return (
            <div>
                <Heading>Most Viewed</Heading>
                <div>
                    <ul>
                        {this.state.trails.map((trail, i) => (
                            <ListItem>
                                <div>
                                    <Number>
                                        <Numbers index={i + 1} />
                                    </Number>

                                    <Headline>
                                        <h2>
                                            <a href={trail.url}>
                                                <HeadlineBody>
                                                    {trail.linkText}
                                                </HeadlineBody>
                                            </a>
                                        </h2>
                                    </Headline>
                                </div>
                            </ListItem>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
