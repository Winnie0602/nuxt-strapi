export const speak = (word: string, onEnd?: () => void) => {
  const utterThis = new SpeechSynthesisUtterance(word)

  utterThis.onend = () => {
    if (onEnd) onEnd() // 播放結束時執行回調函數
  }

  utterThis.lang = 'ja-JP'
  utterThis.rate = 0.5

  window.speechSynthesis.speak(utterThis)
}
