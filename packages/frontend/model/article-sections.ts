export const sections: ArticleSection[] = [
    {
        name: 'Guardian',
        subsections: [],
        apiID: '2879C1E1-7EF9-459B-9C5C-6F4D2BC9DD53'
    },
    {
        name: 'Books',
        subsections: ['books', 'childrens-books-site'],
        apiID: '4994D04B-4279-4184-A2C5-E8BB1DD50AB9'
    },
    {
        name: 'Business',
        subsections: ['business', 'better-business', 'business-to-business', 'working-in-development'],
        apiID: '163BF72C-72D0-4702-82A9-17A548A39D79'
    },
    {
        name: 'CommentIsFree',
        subsections: ['commentisfree'],
        apiID: 'C962A2C3-C9E1-40DD-9B58-7B1095EDB16E'
    },
    {
        name: 'Culture',
        subsections: ['culture', 'artanddesign', 'culture-network', 'culture-professionals-network', 'games', 'stage'],
        apiID: '87C0725C-D478-4567-967B-E3519ECD12E8'
    },{
        name: 'Education',
        subsections: ['education', 'higher-education-network', 'teacher-network'],
        apiID: 'DD50B111-D493-4D25-8980-2B0752E16ED1'
    },
    {
        name: 'Environment',
        subsections: ['environment', 'animals-farmed'],
        apiID: 'FEC0766C-C766-4A77-91B3-74C5525E680F'
    },
    {
        name: 'Fashion',
        subsections: ['fashion'],
        apiID: '1639B19E-B581-491E-94B7-FBACB6823C43'
    },
    {
        name: 'Film',
        subsections: ['film'],
        apiID: 'D5BB97FE-637C-4E9E-B972-C8EA88101CB7'
    },
    {
        name: 'LifeStyle',
        subsections: ['lifeandstyle'],
        apiID: 'B32533F9-65CF-4261-8BB9-2A707F59712A'
    },
    {
        name: 'Media',
        subsections: ['media'],
        apiID: '385AA13F-9B64-4927-9536-BE70F9AD54BD'
    },
    {
        name: 'Money',
        subsections: ['money'],
        apiID: '10BE8096-BF69-4252-AC27-C4127D8631F6'
    },
    {
        name: 'Music',
        subsections: ['music'],
        apiID: '9D928193-7B5C-45A9-89E4-C47F42B8FB73'
    },
    {
        name: 'News',
        subsections: ['news', 'australia-news', 'cardiff', 'cities', 'community', 'edinburgh', 'global-development', 'government-computing-network', 'law', 'leeds', 'local', 'local-government-network', 'media-network', 'uk-news', 'us-news', 'weather', 'world'],
        apiID: '66BEC53C-9890-477C-B639-60879EC4F762'
    },
    {
        name: 'Politics',
        subsections: ['politics'],
        apiID: 'C5C73A36-9E39-4D42-9049-2528DB5E998D'
    },
    {
        name: 'ProfessionalNetwork',
        subsections: ['guardian-professional', 'global-development-professionals-network', 'small-business-network'],
        apiID: '9DFEFF7E-9D45-4676-82B3-F29A6BF05BE1'
    },
    {
        name: 'Science',
        subsections: ['science'],
        apiID: 'F4867E05-4149-49F0-A9DE-9F3496930B8C'
    },
    {
        name: 'Society',
        subsections: ['society', 'healthcare-network', 'housing-network', 'inequality', 'public-leaders-network', 'social-care-network', 'social-enterprise-network', 'society-professionals', 'women-in-leadership'],
        apiID: '617F9FB9-2D34-4C3A-A2E7-383AE877A35D'
    },
    {
        name: 'Sport',
        subsections: ['sport', 'football'],
        apiID: '52A6516F-E323-449F-AA57-6A1B2386F8F6'
    },
    {
        name: 'Technology',
        subsections: ['technology'],
        apiID: '4F448B55-305F-4203-B192-8534CB606C12'
    },
    {
        name: 'Travel',
        subsections: ['travel', 'travel/offers'],
        apiID: '05A03097-D4CA-46BF-96AD-935252967239'
    },
    {
        name: 'TvRadio',
        subsections: ['tv-and-radio'],
        apiID: '3277F0D0-9389-4A32-A4D6-516B49D87E45'
    }];

export const findBySubsection = (subsection: string): ArticleSection => {
    const section = sections.find(section => section.subsections.some(_ => _ === subsection));

    if (section) {
        return section;
    }

    return sections[0];
};
