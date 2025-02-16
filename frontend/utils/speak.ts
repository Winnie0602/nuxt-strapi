export const speak = (
  word: string,
  onEnd?: () => void,
  lang: string = 'ja-JP',
) => {
  const utterThis = new SpeechSynthesisUtterance(word)

  utterThis.lang = lang
  utterThis.rate = 0.8

  window.speechSynthesis.speak(utterThis)

  utterThis.onend = () => {
    if (onEnd) onEnd() // 播放結束時執行回調函數
  }
}
