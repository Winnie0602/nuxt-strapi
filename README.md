# 多語學習平台 | Multilingual Learning Platform (Nuxt 3 + Strapi)

本專案是一個結合日語單字學習、多國語言即時聊天室與互動測驗功能的語言學習平台。前端使用 Nuxt 3 + TypeScript 開發，後端以 Strapi CMS 提供 API，並使用 PostgreSQL 作為資料庫。

This project is a multilingual learning platform combining Japanese vocabulary study, real-time multilingual chat, and interactive quizzes. It is built with Nuxt 3 (frontend), Strapi CMS (backend), and PostgreSQL (database).

---

## 語音朗讀（Text-to-Speech）功能注意事項

## Note on Text-to-Speech (TTS) Feature

### 建議使用 Google Chrome 瀏覽器

### Recommended: Use Google Chrome for Best Experience

本網站的「朗讀單字」與「朗讀訊息」功能是透過瀏覽器內建的 Web Speech API 實作，語音品質會根據不同瀏覽器而有所不同：  
The "read aloud" features on this site (e.g., vocabulary and chat messages) are powered by the browser's built-in Web Speech API. Voice quality may vary depending on the browser:

- Google Chrome：支援 Google 高品質語音（如自然的日文女聲），朗讀效果最佳。  
  Google Chrome: Uses high-quality voices provided by Google, especially natural-sounding Japanese voices.
- 其他瀏覽器（Safari / Firefox / Edge）：多數僅支援系統預設語音，可能出現機械聲或發音不清。  
  Other browsers (Safari / Firefox / Edge): Often rely on system voices, which may sound robotic or unclear.

---

## Render.com 免費方案的啟動延遲

## Render.com Free Plan Wake-Up Delay

本專案的前端與後端皆部署於 Render.com 的免費方案上。若長時間未使用，Render 會自動關閉服務，重新啟動約需 50 秒。首次開啟網站或發送 API 請求時，請耐心等待。  
Both the frontend and backend of this project are hosted on Render.com's free plan. If unused for a period of time, the services may automatically shut down and take approximately 50 seconds to restart. Please be patient when first accessing the site or sending API requests.

若前端無法連接 API，請確認後端是否已被自動喚醒，稍候片刻即可。前後端皆需處於啟用狀態，API 才能正常運作。  
If the frontend cannot connect to the API, please ensure the backend has been automatically resumed. Waiting briefly usually resolves the issue. Both the frontend and backend must be awake for the API to function properly.

---

## 線上體驗 | Live Demo

[前端網址 Frontend URL](https://learning-app-frontend-wsdp.onrender.com)  
[後端網址 Backend URL](https://nuxt-strapi-7ztr.onrender.com)

---

## 功能介紹 | Features

### 學習頁面 | Learning Pages

- 單字表格 Vocabulary Table (No Login Required)

  - 顯示/隱藏中文解釋、平假名、漢語  
    Toggle: Chinese meaning / Hiragana / Kanji
  - 收藏單字（需登入） Save Words (Login Required)
  - 單字朗讀 Text-to-Speech (TTS)

- 日文日期發音 Japanese Date Reading (No Login Required)

  - 日期月曆與輸入框雙向綁定  
    Bidirectional calendar & input binding
  - 年月日朗讀功能 TTS for year/month/day

- 多國聊天室 Multilingual Chatroom (No Login Required)
  - 創建/加入聊天室 Create / Join Room
  - 即時訊息收發 Real-time Messaging
  - 即時翻譯 Translation Support
  - 即時朗讀語音 TTS Support
  - 自選翻譯語言 Language Selector  
    -> 適合不同國家使用者跨語溝通  
    -> Ideal for cross-language communication

### 個人頁面 | Personal Page

- 收藏單字 Saved Words (Login Required)
  - 檢視、新增與刪除收藏單字  
    View / Add / Remove Saved Words
  - 表格與學習頁面共用元件 Shared with Vocabulary Table

### 測驗頁面 | Quiz Pages

- 單字拼字 Spelling Quiz (No Login Required)

  - 五題隨機出題（平假名拼字）  
    5 random questions; type hiragana spelling
  - 錯誤會在結果中標記 Highlight mistakes in result

- 單字配對 Matching Quiz (No Login Required)
  - 配對中日單字 Pair JP & CN Words
  - 可設定測驗秒數 Set Countdown Time
  - 三次錯誤即遊戲結束 3 Mistakes = Game Over

---

## 技術架構 | Tech Stack

- **Frontend**

  - Nuxt 3 + TypeScript
  - Tailwind CSS + Nuxt UI / UI Thing
  - vee-validate (form validation)
  - socket.io (real-time chat)
  - sidebase/nuxt-auth (authentication)
  - embla-carousel (quiz carousel)

- **Backend**
  - Strapi CMS
  - PostgreSQL

---

## 本機開發與執行方式 | Local Setup

### 前端（Nuxt 3）

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```
