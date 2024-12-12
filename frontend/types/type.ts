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
}


export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
