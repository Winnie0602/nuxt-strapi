export type Vocabulary = {
  id: number
  documentId: string
  full_word_jp: string
  translate_ch: string
  full_reading: string
  masu_form: string
  html_hiragana: string
  type: string
  publishedAt: string
  example_1: string | null
  example_2: string | null
}

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type RoomInfo = {
  roomId: string
  roomName: string
  roomDescription: string
  userCount: number
}

export type Message = {
  socketId: string
  sender: string
  message: string
  translatedMessage: string
  targetLang: VoiceLanguage
}

export enum GoogleLanguage {
  English = 'en-US',
  TraditionalChinese = 'zh-TW',
  SimplifiedChinese = 'zh-CN',
  Cantonese = 'zh-HK',
  Japanese = 'ja-JP',
  Korean = 'ko-KR',
  Thai = 'th-TH',
  French = 'fr-FR',
}

export enum VoiceLanguage {
  English = 'en',
  TraditionalChinese = 'zh-TW',
  SimplifiedChinese = 'zh-CN',
  Cantonese = 'zh-HK',
  Japanese = 'ja',
  Korean = 'ko',
  Thai = 'th',
  French = 'fr',
}

export enum HumanReadLanguage {
  English = 'English',
  TraditionalChinese = '繁體中文',
  SimplifiedChinese = '简体中文',
  Cantonese = '粤语',
  Japanese = '日本語',
  Korean = '한국어',
  Thai = 'ไทย',
  French = 'Français',
}

export type Language = {
  googleSourceLanguage: GoogleLanguage
  googleTargetLanguage: GoogleLanguage
  voiceLanguage: VoiceLanguage
}
