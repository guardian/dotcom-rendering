import { findBySubsection } from '@frontend/model/article-sections';

describe('returns section for each subsection', () => {
    it('returns Books section for all its subsections', () => {
        const subsections = ['books', 'childrens-books-site'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Books');
        });
    });

    it('returns Business section for all its subsections', () => {
        const subsections = ['business', 'better-business', 'business-to-business', 'working-in-development'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Business');
        });
    });

    it('return CommentIsFree section for all its subsections', () => {
        const subsections = ['commentisfree'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('CommentIsFree');
        });
    });

    it('return Culture section for all its subsections', () => {
        const subsections = ['culture', 'artanddesign', 'culture-network', 'culture-professionals-network', 'games', 'stage'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Culture');
        });
    });

    it('return Education section for all its subsections', () => {
        const subsections = ['education', 'higher-education-network', 'teacher-network'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Education');
        });
    });


    it('return Environment section for all its subsections', () => {
        const subsections = ['environment', 'animals-farmed'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Environment');
        });
    });

    it('return Fashion section for all its subsections', () => {
        const subsections = ['fashion'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Fashion');
        });
    });


    it('return Film section for all its subsections', () => {
        const subsections = ['film'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Film');
        });
    });

    it('return LifeStyle section for all its subsections', () => {
        const subsections = ['lifeandstyle'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('LifeStyle');
        });
    });


    it('return Media section for all its subsections', () => {
        const subsections = ['media'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Media');
        });
    });

    it('return Money section for all its subsections', () => {
        const subsections = ['money'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Money');
        });
    });

    it('return Music section for all its subsections', () => {
        const subsections = ['music'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Music');
        });
    });

    it('return News section for all its subsections', () => {
        const subsections = ['news', 'australia-news', 'cardiff', 'cities', 'community', 'edinburgh', 'global-development', 'government-computing-network', 'law', 'leeds', 'local', 'local-government-network', 'media-network', 'uk-news', 'us-news', 'weather', 'world'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('News');
        });
    });

    it('return Politics section for all its subsections', () => {
        const subsections = ['politics'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Politics');
        });
    });

    it('return ProfessionalNetwork section for all its subsections', () => {
        const subsections = ['guardian-professional', 'global-development-professionals-network', 'small-business-network'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('ProfessionalNetwork');
        });
    });

    it('return Science section for all its subsections', () => {
        const subsections = ['science'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Science');
        });
    });


    it('return Society section for all its subsections', () => {
        const subsections = ['society', 'healthcare-network', 'housing-network', 'inequality', 'public-leaders-network', 'social-care-network', 'social-enterprise-network', 'society-professionals', 'women-in-leadership'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Society');
        });
    });

    it('return Sport section for all its subsections', () => {
        const subsections = ['sport', 'football'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Sport');
        });
    });


    it('return Technology section for all its subsections', () => {
        const subsections = ['technology'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Technology');
        });
    });

    it('return Travel section for all its subsections', () => {
        const subsections = ['travel', 'travel/offers'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('Travel');
        });
    });

    it('return TvRadio section for all its subsections', () => {
        const subsections = ['tv-and-radio'];
        subsections.forEach(subsection => {
            expect(findBySubsection(subsection).name).toEqual('TvRadio');
        });
    });

    it('return Guardian for empty subsections', () => {
        expect(findBySubsection("").name).toEqual('Guardian');
    });
});
