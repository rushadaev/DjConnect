export type LocaleMessagesObject = Record<string, string>

export type LocaleMessagesConfig = Record<string, string | LocaleMessagesObject>

export type Locales = 'ru' | 'en'

export type LocaleMessages = Record<Locales, LocaleMessagesConfig>
