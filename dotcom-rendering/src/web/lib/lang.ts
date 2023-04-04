// CAPI only supports certain languages. If CAPI doesn't recognise the language,
// it defaults to `en`. We should filter out `en` so we don't set an incorrect value.
// See https://github.com/guardian/content-api/blob/main/porter/src/main/scala/com.gu.contentapi.porter/integration/LanguageDetector.scala#L17
export const decideLanguage = (language = ''): string | undefined =>
	language != 'en' ? language : undefined;

export const decideLanguageDirection = (
	isRightToLeftLang = false,
): 'rtl' | undefined => (isRightToLeftLang ? 'rtl' : undefined);
