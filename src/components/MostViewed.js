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

const Main = styled('div')({
    '.headline-column--desktop': {
        columnFill: 'balance',
        [desktop]: {
            columnWidth: 600,
        },
    },
    '.headline-column--desktop__item': {
        height: '100%',
        display: 'inline-block',
        width: '100%',
    },
    '.headline-list__item': {
        paddingTop: '0.1875rem',
        paddingBottom: 0,
        minHeight: '4.5rem',
    },
    '.inline-numbers': {
        float: 'left',
    },
    '.headline-list__text': {
        marginLeft: '4.375rem',
    },
    '.inline-garnett-quote__svg': {
        height: '1rem',
        width: '0.54rem',
        marginRight: '0.5rem',
        transform: 'translateY(-0.0625rem)',
    },
    '.headline-list__body': {
        color: palette.neutral[2],
        fontFamily: textEgyptian,
    },
});

export default class MostViewed extends Component {
    constructor() {
        super();
        this.setState({
            json: { trails: [] },
        });
    }

    componentDidMount() {
        fetch('https://api.nextgen.guardianapps.co.uk/most-read-geo.json?guui')
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    json,
                });
            });
    }

    render() {
        return (
            <div>
                <Heading>Most Viewed</Heading>
                <Main>
                    <ul>
                        {this.state.json.trails.map((trail, i) => (
                            <li className="headline-list__item headline-column__item headline-column--tablet__item headline-column--desktop__item tone-news--most-popular fc-item--pillar-news">
                                <div
                                    className="headline-list__link"
                                    data-link-name="2 | text"
                                >
                                    <span
                                        className={`most-popular__number-${i}`}
                                    >
                                        <span
                                            className={`inline-number-${i +
                                                1} inline-numbers`}
                                        >
                                            <Numbers index={i + 1} />
                                        </span>
                                    </span>

                                    <div className="headline-list__text">
                                        <h2 className="fc-item__title">
                                            <a
                                                href={trail.url}
                                                className="fc-item__link"
                                                data-link-name="article"
                                            >
                                                <span className="headline-list__body fc-item__headline">
                                                    <span className="js-headline-text">
                                                        {trail.linkText}
                                                    </span>
                                                </span>
                                            </a>
                                        </h2>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Main>
            </div>
        );
    }
}
