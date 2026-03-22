# [B.M] 動畫瘋 劇院模式頂部列修正

修正在 [巴哈姆特動畫瘋](https://ani.gamer.com.tw/)（ani.gamer.com.tw）**劇院模式**下，頂部列在暫停、停止或播畢後無法再次顯示的問題。實作上播放中仍維持與官方相同的隱藏節奏（不因滑鼠移過而強制顯示）。

維護者與系列擴充之命名風格對齊 [bm.ani.gamer.3x](https://github.com/BoringMan314/bm.ani.gamer.3x)（`[B.M]`、`default_locale`、`_locales`、隱私權 HTML 等）。

## 功能摘要

| 狀態 | 頂部列（`.top_sky`） |
|------|----------------------|
| 劇院模式 + 播放中 | 隱藏（與站方一致） |
| 暫停、停止（`emptied`）、播完（`ended`） | 顯示 |

另附播放器內 `.vjs-title-bar` 在暫停／結束時的顯示補強。

## 多語系

商店與瀏覽器會依語系顯示 `_locales` 內名稱與說明：**zh_TW**（預設）、en、zh_CN、ja。

## 從原始碼安裝

1. `git clone` 本儲存庫（或下載 ZIP）。
2. Chrome 開啟 `chrome://extensions/` → 開啟「開發人員模式」。
3. 「載入未封裝項目」→ 選取專案根目錄（內含 `manifest.json`）。

## 版本

目前 **`manifest.json`** 版本號：**0.1.0**（首次上架建議用 0.1.0；之後依語意化版本遞增）。

## 發布前檢查（程式與內容）

1. **`manifest.json`**：`version`、`homepage_url`（GitHub 專案已建立且網址正確）。
2. **`_locales/zh_TW/messages.json`**：商店顯示名稱與簡介為最終文案；其餘語系已對齊。
3. **`icons/`**：`icon16.png`、`icon48.png`、`icon128.png` 皆存在且清晰。
4. **`privacy-policy.html`**：內文與擴充名稱一致；**發布當日**更新頁尾「最後更新日期」。
5. **本機測試**：`chrome://extensions/` 載入未封裝 → 動畫瘋播放頁 → 劇院模式 → 暫停／播畢頂部列是否正常。

## GitHub 發布步驟

1. 初始化或確認遠端：`git remote` 指向你的 repo（與 `homepage_url` 一致）。
2. 提交並推送：`main`（或你慣用分支）。
3. （選用）建立 **GitHub Release**，Tag 例如 `v0.1.0`，標題／說明可複製 `messages` 簡介。

## Chrome 線上應用程式商店上架步驟

1. **開發人員帳戶**：若尚未開通，需至 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) 註冊並完成一次性註冊費（政策以 Google 當時說明為準）。
2. **新增項目**：上傳 **ZIP**（見下方打包說明）。
3. **商店列表**：填寫說明（可沿用各語系 `extDescription` 並加使用方式）、類別、**螢幕截圖**（至少 1 張，建議 1280×800 或官方建議尺寸）、**隱私權政策**欄位填 **公開可連線的 URL**（例如：`https://github.com/BoringMan314/ani.gamer.thumbnail/blob/main/privacy-policy.html` 的連結；審核要能直接開啟 HTML，**Raw** 或 **GitHub Pages** 較保險）。
4. **權限與資料**：本擴充僅 `content_scripts` 匹配 `ani.gamer.com.tw`，無額外 `host_permissions`；表單中勾選「不蒐集使用者資料」等選項時與 `privacy-policy.html` 一致即可。
5. **送審**：提交後等待審核；通過後記下商店網址，可回填到 GitHub README。

### ZIP 打包內容（勿多勿少）

**應包含：** `manifest.json`、`content.js`、`content.css`、`_locales/`（整個資料夾）、`icons/icon16.png`、`icon48.png`、`icon128.png`、`LICENSE`（建議一併附上）。

**勿包含：** `.git/`、`*.psd`、開發用備份、本機路徑說明檔。Windows 可將上述檔案選取後「壓縮成 ZIP」，或只壓縮專案內必要檔案（不要多包一層空資料夾，或依商店說明為準）。

### 快捷連結

- **隱私權政策網址**：GitHub 上公開的 `privacy-policy.html`（建議 Raw 或 Pages，確保無需登入即可瀏覽）。
- **開發人員控制台**：專案內 `開發人員資訊主頁.url`（若帳戶不同請自行改內容）。

## 專案結構

```
├── manifest.json
├── content.js
├── content.css
├── _locales/          # zh_TW, en, zh_CN, ja
├── icons/             # icon16.png, icon48.png, icon128.png
├── privacy-policy.html
├── PRIVACY.md
├── 開發人員資訊主頁.url
├── LICENSE
└── README.md
```

## 免責聲明

本專案為第三方非官方擴充，與巴哈姆特／動畫瘋無關。頁面結構若變更，可能需更新選擇器。

## 授權

[MIT](LICENSE)
