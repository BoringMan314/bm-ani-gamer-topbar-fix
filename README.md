# [B.M] 動畫瘋 劇院模式頂部列修正

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![Site](https://img.shields.io/badge/site-ani.gamer.com.tw-5865F2)](https://ani.gamer.com.tw)
[![GitHub](https://img.shields.io/badge/GitHub-bm--ani--gamer--topbar--fix-181717?logo=github)](https://github.com/BoringMan314/bm-ani-gamer-topbar-fix)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

適用於 [巴哈姆特動畫瘋](https://ani.gamer.com.tw)（`ani.gamer.com.tw`）的瀏覽器擴充功能：在 **劇院（全螢幕）模式** 下，修正網站 **頂部導覽列** 在 **暫停、停止載入（emptied）或播畢（ended）後無法再次顯示** 的問題。

*在巴哈姆特动画疯（`ani.gamer.com.tw`）劇院模式下，修正暂停、停止载入或播放结束后顶部列无法再次显示的问题。*<br>
*Bahamut Anime Crazy（`ani.gamer.com.tw`）のシアターモードで、一時停止・読み込み停止・再生終了後にトップバーが再表示されない問題を修正します。*<br>
*Fixes the top bar not reappearing in theater mode on Bahamut Anime Crazy (`ani.gamer.com.tw`) after pause, emptied, or ended playback.*

> **聲明**：本專案為第三方輔助工具，與動畫瘋／巴哈姆特官方無關。使用請遵守該站服務條款與著作權規範。

---

![劇院模式下頂部列顯示修正示意](screenshot/screenshot_1280x800.png)

---

## 目錄

- [功能](#功能)
- [系統需求](#系統需求)
- [安裝方式](#安裝方式)
- [本機開發與測試](#本機開發與測試)
- [技術概要](#技術概要)
- [專案結構](#專案結構)
- [版本與多語系](#版本與多語系)
- [隱私說明](#隱私說明)
- [維護者：更新 GitHub 與 Chrome 線上應用程式商店](#維護者更新-github-與-chrome-線上應用程式商店)
- [授權](#授權)
- [問題與建議](#問題與建議)

---

## 功能

- 在劇院模式且影片 **pause / ended / emptied** 狀態時，讓網站 **`.top_sky`** 頂部區塊恢復可見（透過 [`content.css`](content.css) 覆寫 `fullwindow` 位移）。
- 修正播放器 **`.vjs-title-bar`** 在暫停或播放結束後可能維持透明、造成資訊不可讀的狀況（同見 [`content.css`](content.css)）。
- 僅在 **`https://ani.gamer.com.tw/*`** 載入；[`manifest.json`](manifest.json) 未宣告 `host_permissions`，不額外請求其他網域。
- 若動畫瘋改版 DOM 或 class 命名，可能需調整 [`content.js`](content.js) 中的選取與同步邏輯。

---

## 系統需求

- **Chrome** 或 **Microsoft Edge**（Chromium）等支援 **Manifest V3** 的瀏覽器。

---

## 安裝方式

### 從 Chrome 線上應用程式商店（建議）

請在 [Chrome Web Store](https://chromewebstore.google.com/) 搜尋 **「[[B.M] 動畫瘋 劇院模式頂部列修正](https://chromewebstore.google.com/detail/bm-%E5%8B%95%E7%95%AB%E7%98%8B-%E5%8A%87%E9%99%A2%E6%A8%A1%E5%BC%8F%E9%A0%82%E9%83%A8%E5%88%97%E4%BF%AE%E6%AD%A3/kbgjeaipcplcanggjbndfadjfchkigap?hl=zh-TW)」**，或直接點選連結前往商店頁面安裝。

### 從原始碼載入（開發人員模式）

1. 點選本頁綠色 **Code** → **Download ZIP** 解壓，或使用 Git 複製：`git clone https://github.com/BoringMan314/bm-ani-gamer-topbar-fix.git`。
2. 開啟 Chrome 或 Edge，前往 `chrome://extensions`（Edge：`edge://extensions`）。
3. 開啟「開發人員模式」→「載入未封裝項目」→ 選取含 [`manifest.json`](manifest.json) 的**專案根目錄**。
4. 開啟動畫瘋任一有影片的頁面，切換劇院模式（`T`），暫停或播畢後確認頂部列可再次顯示。

---

## 本機開發與測試

修改 [`content.js`](content.js) 或 [`content.css`](content.css) 後，請在 `chrome://extensions` 針對本擴充點擊 **重新載入**，再重新整理動畫瘋分頁即可驗證變更。

---

## 技術概要

- **內容腳本** [`content.js`](content.js)：在符合網址的頁面監聽影片 `play` / `pause` / `ended` / `emptied` 事件，並以 `MutationObserver` 因應播放器節點重建。
- **樣式覆寫** [`content.css`](content.css)：在非播放狀態覆寫劇院模式對頂欄的位移與透明度，使頂部導覽列與標題列可正確顯示。

---

## 專案結構

| 路徑 | 說明 |
|------|------|
| [`manifest.json`](manifest.json) | Manifest V3 設定、內容腳本比對網址 |
| [`content.js`](content.js) | 劇院模式偵測、影片事件與 DOM 同步 |
| [`content.css`](content.css) | 頂欄顯示與 title bar 相關樣式覆寫 |
| [`_locales/`](_locales/) | 多語系支援（包含 `zh_TW`、`zh_CN`、`en`、`ja`） |
| [`privacy-policy.html`](privacy-policy.html) | 隱私權政策（上架商店所需之公開網頁） |
| [`icons/`](icons/) | 擴充功能圖示（16/48/128 px） |
| [`screenshot/`](screenshot/) | 商店與說明用截圖 |

**Chrome Web Store 常用截圖尺寸參考**：

| 檔案 | 用途 |
|------|------|
| `screenshot_440x280.png` | 小型宣傳圖 |
| `screenshot_1280x800.png` | 寬螢幕截圖 |
| `screenshot_1280x800.psd` | 寬螢幕截圖原始檔 (Photoshop) |
| `screenshot_1400x560.png` | 大型宣傳圖 |

---

## 版本與多語系

- **版本號**：定義於 [`manifest.json`](manifest.json) 的 `version`。
- **預設語系**：繁體中文 (`zh_TW`)。

---

## 隱私說明

本擴充功能**不蒐集、不上傳**任何個人資料或瀏覽記錄；未使用任何分析工具或遠端程式碼。詳細內容請參閱 [`privacy-policy.html`](privacy-policy.html)。

**上架提醒**：提交至 Chrome Web Store 時，須於後台填寫隱私實踐聲明，並提供該政策頁面的**公開 HTTPS 網址**（建議透過 [GitHub Pages](https://pages.github.com/) 託管）。

---

## 維護者：更新 GitHub 與 Chrome 線上應用程式商店

### 更新至 GitHub

**Bash / Git Bash / PowerShell：**

```powershell
git add .
git commit -m "docs: 更新內容說明與商店連結"
git push origin main
```

### 更新至 Chrome 線上應用程式商店

請透過 [Chrome Web Store 開發人員控制台](https://chrome.google.com/webstore/devconsole) 手動上傳更新：

1. **遞增版本**：修改 `manifest.json` 中的 `version`（例如 `0.1.0` 提升至 `0.1.1`）。
2. **封裝套件**：將專案內容壓縮為 ZIP 檔。  
   - **必要檔案**：`manifest.json`, `content.js`, `content.css`, `privacy-policy.html`, `icons/`, `_locales/`。  
   - **排除檔案**：`.git/`, `.gitignore`, `screenshot/`, `README.md`, `*.psd`, `*.zip`, `*.url`。
3. **上傳審核**：在控制台選擇項目 →「套件」→「上傳新套件」。
4. **提交送審**：確認文案、截圖與隱私資訊正確後，點擊「提交送審」。

---

## 授權

本專案以 [MIT License](LICENSE) 授權。

---

## 問題與建議

歡迎透過 [GitHub Issues](https://github.com/BoringMan314/bm-ani-gamer-topbar-fix/issues) 回報錯誤或提出改善建議（回報時請提供瀏覽器版本、是否劇院模式與重現步驟）。
