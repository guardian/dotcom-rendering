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

struct RenderingRequest {
    1: required v1.Content content
    2: optional i32 commentCount 
    3: optional bool specialReport
    4: optional map<string,string> targetingParams
    5: optional Branding branding
}
