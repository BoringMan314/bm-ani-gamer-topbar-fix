# [B.M] 動畫瘋 劇院模式頂部列修正

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

適用 **Google Chrome**（Manifest V3）的擴充功能，修正 [巴哈姆特動畫瘋](https://ani.gamer.com.tw/) 在 **劇院模式** 下，網站頂部導覽列於 **暫停、停止或播畢後無法再次顯示** 的問題。播放進行中仍維持與官方相同的隱藏行為，不會因滑鼠掠過而強制拉出頂欄。

同系列風格可參考：[bm.ani.gamer.3x](https://github.com/BoringMan314/bm.ani.gamer.3x)（倍速選單）。

---

## English

Chrome extension (MV3) for **Bahamut Anime Crazy** (`ani.gamer.com.tw`). In **theater mode**, it fixes the **top bar not coming back** after **pause, stop, or end of playback**. While the video is playing, hiding behavior stays aligned with the official site.

---

## 使用方式

1. **從 Chrome 線上應用程式商店安裝**（若已上架）：於商店搜尋擴充名稱或從維護者提供的連結安裝。  
2. **從原始碼載入（開發／自行編譯）**：見下方〈安裝（開發模式）〉。

安裝後無需設定；開啟動畫瘋影片頁並切換 **劇院模式（T）** 即可。若頂欄異常，請先確認是否為劇院模式與官方播放器版本。

## 行為說明

| 情境 | 頂部列（網站 `.top_sky`） |
|------|---------------------------|
| 劇院模式且正在播放 | 隱藏（與站方一致） |
| 暫停、`emptied`（停止載入）、`ended`（播畢） | 恢復顯示 |

另會處理播放器內 **`.vjs-title-bar`** 在暫停／結束時可能卡在透明狀態的情況。

## 安裝（開發模式）

```bash
git clone https://github.com/BoringMan314/bm.ani.gamer.topbar.fix.git
cd bm.ani.gamer.topbar.fix   # 若下載 ZIP，請改為進入解壓後含 manifest.json 的資料夾
```

1. 開啟 Chrome，前往 `chrome://extensions/`  
2. 開啟右上角 **開發人員模式**  
3. 點 **載入未封裝項目**，選取本專案根目錄（內含 `manifest.json`）

**需求：** 桌面版 Google Chrome 或相容的 Chromium 系（支援 Manifest V3）。

## 隱私與權限

- **不蒐集、不上傳**個人資料；無分析、無遠端程式碼。  
- 僅在 `https://ani.gamer.com.tw/*` 注入 **content script** 與 **CSS**；未宣告額外 `host_permissions`。  
- 完整說明請見：[privacy-policy.html](privacy-policy.html)（可於 Chrome Web Store 填寫為隱私權政策網址，建議使用可公開存取之 Raw 或 Pages 連結）。

## 多語系介面

商店與瀏覽器顯示名稱／說明依系統語系載入 `_locales`：**zh_TW**（預設）、**en**、**zh_CN**、**ja**。

## 技術摘要

| 項目 | 說明 |
|------|------|
| 版本 | 見 `manifest.json` 的 `version`（目前 **0.1.0**） |
| 核心檔案 | `content.js`、`content.css` |
| 圖示 | `icons/icon16.png`、`icon48.png`、`icon128.png` |

## 專案結構（精簡）

```
manifest.json
content.js / content.css
_locales/          # 介面字串
icons/
privacy-policy.html
LICENSE
README.md
```

## 問題與貢獻

若動畫瘋改版導致失效，歡迎開 [Issue](https://github.com/BoringMan314/bm.ani.gamer.topbar.fix/issues) 描述重現步驟（含瀏覽器版本、是否劇院模式）。Pull Request 亦歡迎，請維持變更範圍精簡、與現有程式風格一致。

## 免責聲明

本專案為第三方非官方擴充，與巴哈姆特／動畫瘋無關。頁面結構或 class 若變更，可能需更新程式。

## 授權

本專案以 [MIT License](LICENSE) 授權。
