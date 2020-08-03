include "content/v1.thrift"

namespace scala com.gu.mobile.ar.models
namespace typescript _at_guardian.apps_rendering_api_models

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

struct RenderingRequest {
    1: required v1.Content content
    2: optional i32 commentCount 
    3: optional bool specialReport
    4: optional map<string,string> targetingParams
    5: optional Branding branding
    6: optional list<Campaign> campaigns
}
