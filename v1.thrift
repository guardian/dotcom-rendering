struct CapiDateTime {

    /*
     * Date times are represented as i64 - epoch millis
     */
    1: required i64 dateTime

    /*
     * Also represent as a string (yyyy-MM-dd`T`HH:mm:ss.SSSZZ) in order to preserve timezone info.
     *
     * Note: this field makes the i64 representation redundant.
     */
    2: required string iso8601

}

enum ContentType {
    ARTICLE = 0,
    LIVEBLOG = 1,
    GALLERY = 2,
    INTERACTIVE = 3,
    PICTURE = 4,
    VIDEO = 5,
    CROSSWORD = 6,
    AUDIO = 7
}

/*
 * The supported Element types, the types inform what fields to expect and how the Element renders as HTML
 */
enum ElementType {

    /*
     * A bog standard text element
     */
    TEXT = 0,

    /*
     * An element with an image, will have Assets
     */
    IMAGE = 1,

    /*
     * Generic embed Element
     */
    EMBED = 2,

    /*
     * an element containing a formstack form
     */
    FORM = 3,

    /*
     * An element containing a text to be treated a pull quote
     */
    PULLQUOTE = 4,

    /*
     * An element containing a javascript interactive (although actual interactivity varies)
     */
    INTERACTIVE = 5,

    /*
     * An embeded comment from discussion
     */
    COMMENT = 6,

    /*
     * A rich link to guardian content - presents a nice trail outside of the content body
     */
    RICH_LINK = 7,

    /*
     * A table
     */
    TABLE = 8,

    /*
     * A video element, will contain Assets
     */
    VIDEO = 9,

    /*
     * A tweet element
     */
    TWEET = 10,

    /*
     * An embedded piece of witness UGC
     */
    WITNESS = 11,

    /*
     * An element containing computer codez, this is syntax highlighted.
     * This is used almost exclusively for the developer blog and dogfooding composer.
     */
    CODE = 12,

    /*
     * An audio embed, typically via embedly
     */
    AUDIO = 13,

    /*
     * A map element, embedded via embedly
     */
    MAP = 14,

    /*
     * A document element, ebedded via embedly
     */
    DOCUMENT = 15,

    /*
     * A Guardian Membership event
     */
    MEMBERSHIP = 16

    /*
     * An instagram element, will contain assets
     */
    INSTAGRAM = 17

    /*
     * A content atom
     */
    CONTENTATOM = 18

    /*
     * A vine element, will contain assets
     */
    VINE = 19


}

enum TagType {

    CONTRIBUTOR = 0,

    KEYWORD = 1,

    SERIES = 2,

    NEWSPAPER_BOOK_SECTION = 3,

    NEWSPAPER_BOOK = 4,

    BLOG = 5,

    TONE = 6,

    TYPE = 7,

    PUBLICATION = 8,

    TRACKING = 9,

    PAID_CONTENT = 10,

    CAMPAIGN = 11

}

enum CrosswordType {

    QUICK = 0,

    CRYPTIC = 1,

    QUIPTIC = 2,

    SPEEDY = 3,

    PRIZE = 4,

    EVERYMAN = 5,

    DIAN_QUIPTIC_CROSSWORD = 6,

    WEEKEND = 7
}

enum Office {
    UK = 0,
    US = 1,
    AUS = 2
}

enum AssetType {
    IMAGE = 0,
    VIDEO = 1,
    AUDIO = 2,
    EMBED = 3,
    TWEET = 4
}

enum MembershipTier {
    MEMBERS_ONLY = 0,
    PAID_MEMBERS_ONLY = 1
}

enum SponsorshipType {
    SPONSORED = 0,
    FOUNDATION = 1,
    PAID_CONTENT = 2
}

struct Rights {

    1: optional bool syndicatable = false

    2: optional bool subscriptionDatabases = false

    3: optional bool developerCommunity = false
}

struct AssetFields {

  1: optional string aspectRatio

  2: optional string altText

  3: optional bool isInappropriateForAdverts

  4: optional string caption

  5: optional string credit

  6: optional bool embeddable

  7: optional string photographer

  8: optional string source

  9: optional string stillImageUrl

  10: optional i32 width

  11: optional i32 height

  12: optional string name

  13: optional string secureFile

  14: optional bool isMaster

  15: optional i64 sizeInBytes

  16: optional i32 durationMinutes

  17: optional i32 durationSeconds

  18: optional bool displayCredit

  19: optional string thumbnailUrl

  20: optional string role

  21: optional string mediaId

  22: optional string iframeUrl

  23: optional string scriptName

  24: optional string scriptUrl

  25: optional bool blockAds

  26: optional string html

  27: optional string embedType

  28: optional bool explicit

  29: optional bool clean

  30: optional string thumbnailImageUrl

  31: optional string linkText

  32: optional string linkPrefix

  33: optional string shortUrl

  34: optional string imageType

  35: optional string suppliersReference

  36: optional string mediaApiUri

  37: optional string copyright

  38: optional string mimeType

  39: optional string url

  40: optional string originalUrl

  41: optional string id

  42: optional string attribution

  43: optional string description

  44: optional string title

  45: optional string contentAuthSystem

  46: optional string alt

  47: optional string picdarUrn

  48: optional string comment

  49: optional string witnessEmbedType

  50: optional string authorName

  51: optional string authorUsername

  52: optional string authorWitnessProfileUrl

  53: optional string authorGuardianProfileUrl

  54: optional string apiUrl

  55: optional CapiDateTime dateCreated

  56: optional string youtubeUrl

  57: optional string youtubeSource

  58: optional string youtubeTitle

  59: optional string youtubeDescription

  60: optional string youtubeAuthorName

  61: optional string youtubeHtml

  62: optional string venue

  63: optional string location

  64: optional string identifier

  65: optional string price

  66: optional CapiDateTime start

  67: optional CapiDateTime end

  68: optional bool safeEmbedCode
}

struct Asset {

    1: required AssetType type

    2: optional string mimeType

    3: optional string file

    4: optional AssetFields typeData
}

struct TextElementFields {

    1: optional string html
}

struct PullquoteElementFields {

    1: optional string html

    2: optional string attribution

    3: optional string role
}

struct TweetElementFields {

    1: optional string source

    2: optional string url

    3: optional string id

    4: optional string html

    5: optional string originalUrl

    6: optional string role
}

struct AudioElementFields {

    1: optional string html

    2: optional string source

    3: optional string description

    4: optional string title

    5: optional string credit

    6: optional string caption

    7: optional i32 durationMinutes

    8: optional i32 durationSeconds

    9: optional bool clean

    10: optional bool explicit
}

struct VideoElementFields {

    1: optional string url

    2: optional string description

    3: optional string title

    4: optional string html

    5: optional string source

    6: optional string credit

    7: optional string caption

    8: optional i32 height

    9: optional i32 width

    10: optional i32 duration

    11: optional string contentAuthSystem

    12: optional string embeddable

    13: optional bool isInappropriateForAdverts

    14: optional string mediaId

    15: optional string stillImageUrl

    16: optional string thumbnailUrl

    17: optional string shortUrl

    18: optional string role

    19: optional string originalUrl
}

struct ImageElementFields {

    1: optional string caption

    2: optional string copyright

    3: optional bool displayCredit

    4: optional string credit

    5: optional string source

    6: optional string photographer

    7: optional string alt

    8: optional string mediaId

    9: optional string mediaApiUri

    10: optional string picdarUrn

    11: optional string suppliersReference

    12: optional string imageType

    13: optional string comment

    14: optional string role

}

struct InteractiveElementFields {
    1: optional string url
    2: optional string originalUrl
    3: optional string source
    4: optional string caption
    5: optional string alt
    6: optional string scriptUrl
    7: optional string html
    8: optional string scriptName
    9: optional string iframeUrl
    10: optional string role
    11: optional bool isMandatory
}

struct StandardElementFields {
    1: optional string url
    2: optional string originalUrl
    3: optional string source
    4: optional string title
    5: optional string description
    6: optional string credit
    7: optional string caption
    8: optional i32 width
    9: optional i32 height
    10: optional string html
    11: optional string role
    12: optional bool isMandatory
}

struct WitnessElementFields {
    1: optional string url
    2: optional string originalUrl
    3: optional string witnessEmbedType
    4: optional string mediaId
    5: optional string source
    6: optional string title
    7: optional string description
    8: optional string authorName
    9: optional string authorUsername
    10: optional string authorWitnessProfileUrl
    11: optional string authorGuardianProfileUrl
    12: optional string caption
    13: optional string alt
    14: optional i32 width
    15: optional i32 height
    16: optional string html
    17: optional string apiUrl
    18: optional string photographer
    19: optional CapiDateTime dateCreated
    20: optional string youtubeUrl
    21: optional string youtubeSource
    22: optional string youtubeTitle
    23: optional string youtubeDescription
    24: optional string youtubeAuthorName
    25: optional string youtubeHtml
    26: optional string role
}


struct SponsorshipTargeting {
    1: optional CapiDateTime publishedSince

    2: optional list<string> validEditions
}

struct SponsorshipLogoDimensions {

    1: required i32 width

    2: required i32 height

}

struct Sponsorship {

    1: required SponsorshipType sponsorshipType

    2: required string sponsorName

    3: required string sponsorLogo

    4: required string sponsorLink

    5: optional SponsorshipTargeting targeting

    6: optional string aboutLink

    7: optional SponsorshipLogoDimensions sponsorLogoDimensions

    8: optional string highContrastSponsorLogo

    9: optional SponsorshipLogoDimensions highContrastSponsorLogoDimensions

    10: optional CapiDateTime validFrom

    11: optional CapiDateTime validTo

}

struct RichLinkElementFields {
    1: optional string url
    2: optional string originalUrl
    3: optional string linkText
    4: optional string linkPrefix
    5: optional string role
    6: optional Sponsorship sponsorship
}

struct MembershipElementFields {
    1: optional string originalUrl
    2: optional string linkText
    3: optional string linkPrefix
    4: optional string title
    5: optional string venue
    6: optional string location
    7: optional string identifier
    8: optional string image
    9: optional string price
    10: optional CapiDateTime start
    11: optional CapiDateTime end
}

struct EmbedElementFields {

    1: optional string html

    2: optional bool safeEmbedCode

    3: optional string alt

    4: optional bool isMandatory
}

struct InstagramElementFields {

    1: required string originalUrl

    2: required string title

    3: required string source

    4: required string authorUrl

    5: required string authorUsername

    6: optional string html

    7: optional i32 width

    8: optional string alt

    9: optional string caption

}

struct CommentElementFields {

    1: optional string source

    2: optional string discussionKey

    3: optional string commentUrl

    4: optional string originalUrl

    5: optional string sourceUrl

    6: optional string discussionUrl

    7: optional string authorUrl

    8: optional string html

    9: optional string authorName

    10: optional i32 commentId
}

struct VineElementFields {

    1: required string originalUrl

    2: required string title

    3: required string source

    4: required string authorUrl

    5: required string authorUsername

    6: optional string html

    7: optional i32 width

    8: optional i32 height

    9: optional string alt

    10: optional string caption

}

struct ContentAtomElementFields {

  1: required string atomId

  2: required string atomType

}


struct BlockElement {

    1: required ElementType type

    2: required list<Asset> assets

    3: optional TextElementFields textTypeData

    4: optional VideoElementFields videoTypeData

    5: optional TweetElementFields tweetTypeData

    6: optional ImageElementFields imageTypeData

    7: optional AudioElementFields audioTypeData

    8: optional PullquoteElementFields pullquoteTypeData

    9: optional InteractiveElementFields interactiveTypeData

    10: optional StandardElementFields mapTypeData

    11: optional StandardElementFields documentTypeData

    12: optional StandardElementFields tableTypeData

    13: optional WitnessElementFields witnessTypeData

    14: optional RichLinkElementFields richLinkTypeData

    15: optional MembershipElementFields membershipTypeData

    16: optional EmbedElementFields embedTypeData

    17: optional InstagramElementFields instagramTypeData

    18: optional CommentElementFields commentTypeData

    19: optional VineElementFields vineTypeData

    20: optional ContentAtomElementFields contentAtomTypeData

}

struct MembershipPlaceholder {

    1: optional string campaignCode
}

struct BlockAttributes {

    1: optional bool keyEvent

    2: optional bool summary

    3: optional string title

    4: optional bool pinned

    5: optional MembershipPlaceholder membershipPlaceholder
}

struct User {

    1: required string email

    2: optional string firstName

    3: optional string lastName
}

struct Block {

    /*
     * The unique ID of the block.
     */
    1: required string id

    /*
     * The HTML body of the block.
     */
    2: required string bodyHtml

    /*
     * The textual content of the block, with HTML tags stripped.
     * This will not include any non-textual content such as pullquotes, tweet embeds, etc.
     */
    3: required string bodyTextSummary

    /*
     * The block's title, if it has one.
     */
    4: optional string title

    /*
     * Metadata about the block.
     */
    5: required BlockAttributes attributes

    /*
     * Whether this block is currently live.
     */
    6: required bool published

    /*
     * The first time this block was created.
     */
    7: optional CapiDateTime createdDate

    /*
     * The first time this block was published.
     */
    8: optional CapiDateTime firstPublishedDate

    /*
     * The last time this block was published.
     */
    9: optional CapiDateTime publishedDate

    /*
     * The last time this block was modified.
     */
    10: optional CapiDateTime lastModifiedDate

    /*
     * People who contributed to this block.
     */
    11: required list<string> contributors

    /*
     * Person who created this block.
     */
    12: optional User createdBy

    /*
     * Person who last modified this block.
     */
    13: optional User lastModifiedBy

    /*
     * The elements associated with this block.
     */
    14: required list<BlockElement> elements = []
}

struct Blocks {

    /*
     * The main block, which will include the main image and other furniture
     */
    1: optional Block main

    /*
     * The block(s) that make up the body of the content. For a liveblog there may be multiple blocks.
     * Any other content will have only one block.
     */
    2: optional list<Block> body

    /*
     * The total number of body blocks in the content.
     * This field will only be present if you request some or all of the body blocks.
     */
    3: optional i32 totalBodyBlocks

    /*
     * Any requested subsets of body blocks.
     * This field will only be present if you requested one or more body block subsets.
     */
    4: optional map<string, list<Block>> requestedBodyBlocks
}

struct CrosswordDimensions {

    1: required i32 cols

    2: required i32 rows
}

struct CrosswordPosition {

    1: required i32 x

    2: required i32 y
}

struct CrosswordCreator {

    1: required string name

    2: required string webUrl
}

struct CrosswordEntry {

    1: required string id

    2: optional i32 number

    3: optional string humanNumber

    4: optional string direction

    5: optional CrosswordPosition position

    6: optional map<string, list<i32>> separatorLocations

    7: optional i32 length

    8: optional string clue

    9: optional list<string> group

    10: optional string solution

    11: optional string format
}

struct Crossword {

    1: required string name

    2: required CrosswordType type

    3: required i32 number

    4: required CapiDateTime date

    5: required CrosswordDimensions dimensions

    6: required list<CrosswordEntry> entries

    7: required bool solutionAvailable

    8: required bool hasNumbers

    9: required bool randomCluesOrdering

    10: optional string instructions

    11: optional CrosswordCreator creator

    12: optional string pdf

    13: optional string annotatedSolution

    14: optional CapiDateTime dateSolutionAvailable

}

struct Element {

    1: required string id

    2: required string relation

    3: required ElementType type

    4: optional i32 galleryIndex

    5: required list<Asset> assets
}

struct ContentFields {

    1: optional string headline

    2: optional string standfirst

    3: optional string trailText

    4: optional string byline

    5: optional string main

    6: optional string body

    7: optional i32 newspaperPageNumber

    8: optional i32 starRating

    9: optional string contributorBio

    10: optional MembershipTier membershipAccess

    11: optional i32 wordcount

    12: optional CapiDateTime commentCloseDate

    13: optional bool commentable

    14: optional CapiDateTime creationDate

    15: optional string displayHint

    16: optional CapiDateTime firstPublicationDate

    17: optional bool hasStoryPackage

    18: optional string internalComposerCode

    19: optional string internalOctopusCode

    20: optional i32 internalPageCode

    21: optional i32 internalStoryPackageCode

    22: optional bool isInappropriateForSponsorship

    23: optional bool isPremoderated

    24: optional CapiDateTime lastModified

    25: optional bool liveBloggingNow

    26: optional CapiDateTime newspaperEditionDate

    27: optional Office productionOffice

    28: optional string publication

    29: optional CapiDateTime scheduledPublicationDate

    30: optional string secureThumbnail

    31: optional string shortUrl

    32: optional bool shouldHideAdverts

    33: optional bool showInRelatedContent

    34: optional string thumbnail

    35: optional bool legallySensitive

    36: optional bool allowUgc

    37: optional bool sensitive

    38: optional string lang

    39: optional i32 internalRevision

    40: optional i32 internalContentCode

    41: optional bool isLive

    /*
     * A short id used as a key for discussion and save for later feature
     */
    42: optional string internalShortId

    43: optional string shortSocialShareText

    44: optional string socialShareText

    45: optional string bodyText

    46: optional i32 charCount

    47: optional string internalVideoCode

    48: optional bool shouldHideReaderRevenue

    49: optional i32 internalCommissionedWordcount

    50: optional bool showAffiliateLinks

    51: optional string bylineHtml
}

struct Reference {

    1: required string id

    2: required string type
}

struct PodcastCategory {

    1: required string main

    2: optional string sub
}

struct Podcast {

    1: required string linkUrl

    2: required string copyright

    3: required string author

    4: optional string subscriptionUrl

    5: required bool explicit

    6: optional string image

    7: optional list<PodcastCategory> categories

    8: optional string podcastType

    9: optional string googlePodcastsUrl

    10: optional string spotifyUrl
}

struct Tag {

    /*
     * The id of this tag: this should always be the path
     * to the tag page on www.theguardian.com
     */
    1: required string id

    /*
     * The type of this tag
     */
    2: required TagType type

    /*
     * Section is usually provided: some tags (notably contributor tags)
     * does not belong to any section so this will be None
     */
    3: optional string sectionId

    /*
     * The display name of the section.  Will be None if sectionId is None.
     */
    4: optional string sectionName

    /*
     * Short description of this tag.
     */
    5: required string webTitle

    /*
     * Full url on which tag page can be found on www.theguardian.com
     */
    6: required string webUrl

    /*
     * Full url on which full information about this tag can be found on
     * the content api.
     *
     * For tags, this allows access to the editorsPicks for the tag,
     * and automatically shows the most recent content for the tag.
     */
    7: required string apiUrl

    /*
     * List of references associated with the tag. References are
     * strings that identify things beyond the content api. A good example
     * is an isbn number, which associates the tag with a book.
     *
     * Use showReferences passing in the the type of reference you want to
     * see or 'all' to see all references.
     */
    8: required list<Reference> references

    /**
     * A tag *may* have a description field.
     *
     * Contributor tags never have a description field. They may
     * instead have a 'bio' field.
     */
    9: optional string description

    /**
     * If this tag is a contributor then we *may* have a small bio
     * for the contributor.
     *
     * This field is optional in all cases, even contributors are not
     * guaranteed to have one.
     */
    10: optional string bio

    /*
     * If this tag is a contributor then we *may* have a small byline
     * picturefor the contributor.
     *
     * This field is optional in all cases, even contributors are not
     * guaranteed to have one.
     */
    11: optional string bylineImageUrl

    /**
     * If this tag is a contributor then we *may* have a large byline
     * picture for the contributor.
     */
    12: optional string bylineLargeImageUrl

    /*
     * If this tag is a series it could be a podcast.
     */
    13: optional Podcast podcast

    /*
     * If the tag is a contributor it may have a first name, a last name, email address and a twitter handle.
     */
    14: optional string firstName

    15: optional string lastName

    16: optional string emailAddress

    17: optional string twitterHandle

    /**
    * A list of all the active sponsorships running against this tag
    */
    18: optional list<Sponsorship> activeSponsorships

    19: optional string paidContentType

    20: optional string paidContentCampaignColour

    21: optional string rcsId

    22: optional string r2ContributorId

    /*
     * A set of schema.org types, e.g. "Person", "Place"
     */
    23: optional set<string> tagCategories

    /*
     * A set of Guardian Entity IDs associated with this Tag
     */
    24: optional set<string> entityIds

    /**
    * If the tag is a campaign, it should have a subtype eg callout
    */
    25: optional string campaignInformationType

    /**
    * The internal name of the tag
    */
    26: optional string internalName
}

struct Edition {

    /*
     * he path of the edition, e.g. 'au/business'
     */
    1: required string id

    /*
     * Short description of the edition
     */
    2: required string webTitle

    /*
     * Edition URL for the main Guardian website
     */
    3: required string webUrl

    /*
     * Path from which the edition is available in the Content API
     */
    4: required string apiUrl

    /*
     * The edition code, e.g. 'uk' or 'default'.
     */
    5: required string code
}

struct Section {

    /*
     * The id of this section: this should always be the path to the section front on www.theguardian.com
     */
    1: required string id

    /*
     * Short description of this section.
     */
    2: required string webTitle

    /*
     * Full url on which section front can be found on www.theguardian.com
     */
    3: required string webUrl

    /*
     * Full url on which full information about this section can be found on
     * the content api.
     *
     * For sections, this allows access to the editorsPicks for the section,
     * mostRead content in the section,
     * and automatically shows the most recent content for the section.
     */
    4: required string apiUrl

    /*
     * List of available editions for this section
     */
    5: required list<Edition> editions

    /**
    * A list of all the active sponsorships running against this section
    */
    6: optional list<Sponsorship> activeSponsorships
}

struct ContentStats {

   /*
    * The number of videos that exist in a piece of content.
    */
    1: required i32 videos

   /*
    * The number of images that exist in a piece of content.
    */
    2: required i32 images

   /*
    * The number of text elements that exist in a piece of content.
    */
    3: required i32 text

   /*
    * The number of tweets that exist in a piece of content.
    */
    4: required i32 tweets

   /*
    * The number of pullquotes that exist in a piece of content.
    */
    5: required i32 pullquotes

   /*
    * The number of audio elements that exist in a piece of content.
    */
    6: required i32 audio

   /*
    * The number of interactives that exist in a piece of content.
    */
    7: required i32 interactives

   /*
    * The number of witness elements that exist in a piece of content.
    */
    8: required i32 witness

    /*
    * The number of richlinks that exist in a piece of content.
    */
    9: required i32 richlinks

   /*
    * The number of membership elements that exist in a piece of content.
    */
    10: required i32 membership

   /*
    * The number of embeds that exist in a piece of content.
    */
    11: required i32 embeds

   /*
    * The number of comments that exist in a piece of content.
    */
    12: required i32 comments

   /*
    * The number of instragam elements that exist in a piece of content.
    */
    13: required i32 instagram

   /*
    * The number of vines that exist in a piece of content.
    */
    14: required i32 vines
}

struct Debug {

    1: optional CapiDateTime lastSeenByPorterAt

    2: optional i64 revisionSeenByPorter

    3: optional string contentSource

    4: optional string originatingSystem
}

struct Content {

    /*
     * The id of this item of content: this should always be the path to the item on www.theguardian.com
     */
    1: required string id

    /*
     * The content type of the content. Defaults to article if none is specified.
     */
    2: required ContentType type = ContentType.ARTICLE

    /*
     * Section is usually provided: some content (such as user help information)
     * does not belong to any section so this will be None
     */
    3: optional string sectionId

    /*
     * The display name of the section. Will be None if sectionId is None.
     */
    4: optional string sectionName

    /*
     * The date and time when this content was published to the web. Note that
     * editors can set this field manually so does not necessarily exactly match
     * when it actually appeared on the web. Current convention is that when
     * "significant updates" are made to a story the web publication date is
     * updated.
     */
    5: optional CapiDateTime webPublicationDate

    /*
     * Short description of this item of content.
     */
    6: required string webTitle

    /*
     * Full url on which the content can be found on www.theguardian.com
     */
    7: required string webUrl

    /*
     * Full url on which full information about this content can be found on
     * the content api. You need to access this to find, e.g. related content
     * for the item.
     */
    8: required string apiUrl

    /*
     * Optional field list containing other variable information about this
     * content. Fields are only returned if you specify showFields("xxx") on the request
     * with either a comma separated list of fields or "all".
     *
     * Note that the set of fields returned vary per item of content, and may
     * vary over time as the api evolves (although we will make every effort
     * to maintain compatibility, we do not promise it).
     */
    9: optional ContentFields fields

    /*
     * List of tags associated with this content.
     *
     * Only returned if you specify showTags("xxx") on the request
     * with either a comma separated list of tag types or "all".
     *
     * The order of tags is significant; tags towards the top of the list
     * are considered editorially more important than those towards the end.
     */
    10: required list<Tag> tags = []

    /*
     * New representation to elements (assets lists) only returns if show-elements("all")
     * or show-elements("image") is specified
     */
    11: optional list<Element> elements

    /*
     * List of references associated with the content. References are
     * strings that identify things beyond the content api. A good example
     * is an isbn number, which associates a piece of content with a book.
     *
     * Use showReferences passing in the the type of reference you want to
     * see or 'all' to see all references.
     */
    12: required list<Reference> references = []

    /*
     * Set to true if the rights to this content have expired. Expired
     * content is only available to internal users.
     */
    13: optional bool isExpired

    /*
     * The blocks that make up a piece of content.
     */
    14: optional Blocks blocks

    15: optional Rights rights

    16: optional Crossword crossword

    18: optional ContentStats stats

    /*
     * The section associated with this content.
     * Only returned if you specify showSection(true) on the request
     */
    19: optional Section section

    20: optional Debug debug

    21: optional bool isGone

    // NOT USED. This field was added in the wrong place.
    //22: optional bool isLive

    /*
     * Indicates whether the content is hosted content i.e content we have been paid to put on the Guardian.
     */
    23: required bool isHosted = false

    24: optional string pillarId

    25: optional string pillarName
}

struct NetworkFront {

    /*
     * The id of the network front, e.g. 'au'
     */
    1: required string id

    /*
     * The path of the network front, e.g. 'au'
     */
    2: required string path

    /*
     * The edition code of the network front, e.g. 'AU'
     */
    3: required string edition

    /*
     * Short description of the edition
     */
    4: required string webTitle

    /*
     * Edition URL for the main Guardian website
     */
    5: required string webUrl

    /*
     * Path from which the edition is available in the Content API
     */
    6: required string apiUrl
}

struct PackageArticle {

    /*
     * The content of the article.
     */
    2: required Content content

}

struct Package {

    /* The package ID */
    1: required string packageId

    /* The articles in the package */
    2: required list<PackageArticle> articles

    /* The package name */
    3: required string packageName

    4: required CapiDateTime lastModified
}

struct MostViewedVideo {

    /* The video ID */
    1: required string id

    /* The view count */
    2: required i32 count
}

struct Pillar {
    1: required string id

    2: required string name

    3: required list<string> sectionIds
}

struct RemovedContent {
    1: required string id

    2: required CapiDateTime lastModified
}

/* These are Responses structures shared with the Content API */

struct SearchResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages

    8: required string orderBy

    9: required list<Content> results
}

struct ItemResponse {

    1: required string status

    2: required string userTier

    3: optional i32 total

    4: optional i32 startIndex

    5: optional i32 pageSize

    6: optional i32 currentPage

    7: optional i32 pages

    8: optional string orderBy

    9: optional Content content

    10: optional Tag tag

    11: optional Edition edition

    12: optional Section section

    13: optional list<Content> results

    15: optional list<Content> relatedContent

    /* Old story packages */
    16: optional list<Content> storyPackage

    17: optional list<Content> editorsPicks

    18: optional list<Content> mostViewed

    19: optional list<Content> leadContent

    /* New story packages */
    20: optional list<Package> packages
}

struct TagsResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages

    8: required list<Tag> results
}

struct SectionsResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required list<Section> results
}

struct EditionsResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required list<NetworkFront> results
}

struct AtomsResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages
}

struct PackagesResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages

    8: required string orderBy

    9: required list<Package> results
}

struct RemovedContentResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages

    8: required string orderBy

    9: required list<string> results

    10: optional list<RemovedContent> resultsWithLastModified
}

struct ErrorResponse {

    1: required string status

    2: required string message
}

struct VideoStatsResponse {

    1: required string status

    2: required list<MostViewedVideo> mostViewedVideos
}

struct AtomUsageResponse {

    1: required string status

    2: required string userTier

    3: required i32 total

    4: required i32 startIndex

    5: required i32 pageSize

    6: required i32 currentPage

    7: required i32 pages

    8: required list<string> results

}

struct EntitiesResponse {

    1: required string status

    2: required i32 total
}

struct PillarsResponse {
    1: required string status

    2: required i32 total

    3: required list<Pillar> results
}
