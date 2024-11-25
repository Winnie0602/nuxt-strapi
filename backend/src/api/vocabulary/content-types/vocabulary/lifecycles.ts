const { default: Kuroshiro } = require('kuroshiro') // 修正導入方式
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')

// 創建 Kuroshiro 實例
const kuroshiro = new Kuroshiro()

// 初始化 Kuroshiro 並設置分析器
;(async () => {
  await kuroshiro.init(new KuromojiAnalyzer()) // 初始化
})()

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params
    if (data.full_word_jp) {
      // 使用 kuroshiro 將漢字轉換為平假名
      const htmlHiragana = await kuroshiro.convert(data.full_word_jp, { mode: 'furigana', to: 'hiragana' })

      const fullReading = await kuroshiro.convert(data.full_word_jp, { mode: 'normal', to: 'hiragana' })

      // 存入 hiragana 欄位
      data.html_hiragana = htmlHiragana
      data.full_reading = fullReading
    }
  },
}
