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
