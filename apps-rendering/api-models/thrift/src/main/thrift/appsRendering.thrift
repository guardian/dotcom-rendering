include "content/v1.thrift"

namespace scala com.gu.mobile.ar.models
namespace typescript _at_guardian.apps_rendering_api_models

enum RelatedItemType {
    ARTICLE,
    FEATURE,
    ANALYSIS,
    GALLERY,
    SPECIAL,
    AUDIO,
    LIVE,
    VIDEO,
    REVIEW,
    ADVERTISEMENT_FEATURE,
    COMMENT
}

enum Edition {
	UK,
	US,
	AU,
	INTERNATIONAL
}

struct Image {
    1: required string url
    2: required i32 height
    3: required i32 width
    4: optional string altText
}

struct RelatedItem {
    1: required string title
    2: optional v1.CapiDateTime lastModified
    3: optional Image headerImage
    4: required string link
    5: required RelatedItemType type
    6: required v1.Pillar pillar
    7: optional string mediaDuration
    8: optional string starRating
    9: optional string byline
    10: optional string bylineImage
    11: optional v1.CapiDateTime webPublicationDate
}

struct RelatedContent {
    1: required string title
    2: required list<RelatedItem> relatedItems
}

struct Branding {
    1: required string brandingType
    2: required string sponsorName
    3: required string logo
    4: required string sponsorUri
    5: required string label
    6: optional string altLogo
    7: required string aboutUri
}

struct FormOption {
    1: required string label
    2: required string value
}

struct FormField {
    1: required string id
    2: required string label
    3: required string name
    4: optional string description
    5: required string type
    6: required bool mandatory
    7: required list<FormOption> options
}

struct Fields {
    1: required string callout
    2: required i32 formId
    3: required string tagName
    4: optional string description
    5: required list<FormField> formFields
    6: optional string formUrl
}

struct Campaign {
    1: required string id
    2: required string name
    3: required i32 priority
    4: optional i64 activeFrom
    5: optional i64 activeUntil
    6: required bool displayOnSensitive
    7: required Fields fields
}

struct Scorer {
    1: required string player
    2: required i32 timeInMinutes
    3: optional string additionalInfo
}

struct FootballTeam {
    1: required string id
    2: required string name
    3: required string shortCode
    4: required string crestUri
    5: required i32 score
    6: required list<Scorer> scorers
}

struct FootballContent {
    1: required string id
    2: required string status
    4: required string kickOff
    5: required string competitionDisplayName
    6: required FootballTeam homeTeam
    7: required FootballTeam awayTeam
    8: optional string venue
}


struct Newsletter {
    1: required string identityName
    2: required string name
    3: required string theme
    4: required string description
    5: required string frequency
    6: required i32 listId
    7: required string group
	8: required string successDescription

}

struct RenderingRequest {
    1: required v1.Content content
    2: optional i32 commentCount
    3: optional bool specialReport
    4: optional map<string,string> targetingParams
    5: optional Branding branding
    6: optional list<Campaign> campaigns
    7: optional RelatedContent relatedContent
    8: optional FootballContent footballContent
    9: optional Edition edition
	10: optional Newsletter promotedNewsletter
}
