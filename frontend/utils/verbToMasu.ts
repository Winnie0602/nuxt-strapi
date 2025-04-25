import type { Vocabulary } from '~/types/type'

export default function verbToMasu(vocabulary: Vocabulary) {
  // 先區分第幾類動詞
  // let verbType: '1' | '2' | '3' = '1'

  // 3 Group Verb
  if (vocabulary.full_word_jp.includes('する'))
    return vocabulary.full_word_jp.replace('する', 'します')

  if (vocabulary.full_word_jp.includes('来る'))
    return vocabulary.full_word_jp.replace('来る', 'きます')

  if (vocabulary.full_reading.includes('る')) {
    const wordbeforeru = vocabulary.full_reading.at(
      vocabulary.full_reading.indexOf('る') - 1,
    )

    if (
      wordbeforeru &&
      ['べ', 'え', 'け', 'げ', 'め', 'ね'].includes(wordbeforeru)
    ) {
      return 'type2'
    }
  }

  return vocabulary.full_word_jp + '123'
}
