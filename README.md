# Saki — 思索と言葉のためのノート

哲学・文学・語学・社会学を横断する、Saki のための読書ノートサイトです。
**サーバー代ゼロ**（GitHub Pages で無料公開）で、恋人（非エンジニア）が
ブラウザの管理画面から記事や写真を更新できます。

- 公開URL（予定）: **https://saki-0306.github.io/saki-homepages/**
- 管理画面（編集室）: **https://saki-0306.github.io/saki-homepages/admin/**

更新の流れは次のとおりです。

```
管理画面(/admin/)で保存
      ↓
GitHub に自動で commit（保存）
      ↓
GitHub Actions が自動でビルド
      ↓
GitHub Pages に公開（数分で反映）
```

---

## 技術構成

| 役割 | 使うもの |
| --- | --- |
| フロント | Vite + React + TypeScript（静的サイトとしてビルド） |
| コンテンツ | リポジトリ内の Markdown（`content/`）。ビルド時に `import.meta.glob` で読み込み |
| 管理画面 | [Sveltia CMS](https://github.com/sveltia/sveltia-cms)（`public/admin/`、GitHub バックエンド） |
| ログイン認証 | Personal Access Token（PAT）方式。Cloudflare Worker も OAuth も不要 |
| デプロイ | GitHub Actions（`main` への push で自動ビルド＆Pages公開） |

> 🔒 有料サービス・外部DBは使いません。トークン等の秘密情報はフロントに一切埋め込みません
> （認証は Cloudflare Worker 側だけが秘密を持ちます）。

---

## ディレクトリ構成

```
saki-homepages/
├─ src/                      … React アプリ本体
│  ├─ pages/                 … トップ / ジャンル / 記事 / 近況 / 写真 / プロフィール
│  ├─ components/            … ナビ・フッター・Markdown 描画
│  ├─ hooks/                 … 視差(パララックス)効果
│  └─ lib/content.ts         … content/ の Markdown を読み込む処理
├─ content/                  … ★ここが「中身」。管理画面はこのフォルダを書き換える
│  ├─ blog/                  … ブログ記事(.md)
│  ├─ genres/                … ジャンル(哲学・文学・語学・社会学…)
│  ├─ news/                  … お知らせ・近況(.md)
│  ├─ gallery/               … 写真(.md)
│  └─ profile.md             … プロフィール(1ページ)
├─ public/
│  ├─ admin/
│  │  ├─ index.html          … Sveltia CMS 読み込み
│  │  └─ config.yml          … 管理画面の設定（★最初に少し書き換えます）
│  └─ images/uploads/        … アップロードした画像の保存先
├─ .github/workflows/deploy.yml … ビルド&Pages公開
├─ vite.config.ts            … base をリポジトリ名に合わせてある
└─ README.md                 … このファイル
```

---

# セットアップ手順（GitHub 初心者向け・順番どおりに）

> 👤 **この初期設定は、技術がわかる人（あなた）が一度だけ行います。**
> 設定が終われば、恋人は「/admin/ でログイン → 書く → 保存」だけで更新できます。

以下では例として **ユーザー名 `saki-0306` / リポジトリ名 `saki-homepages`** を使います。
別の名前にする場合は読み替えてください（その場合は後述の「名前を変えるとき」も参照）。

---

## STEP 1. GitHub にリポジトリを作る

1. https://github.com/ にログイン（恋人＝`saki-0306` のアカウント）。
2. 右上の「＋」→ **New repository**。
3. 次のように入力：
   - **Repository name**: `saki-homepages`
   - 公開設定: **Public**（GitHub Pages 無料枠を使うため）
   - 「Add a README」などのチェックは**すべて外す**（空のまま作る）
4. **Create repository** を押す。

---

## STEP 2. このコードを GitHub にアップロードする

### 方法A：GitHub Desktop（GUI・おすすめ）

1. [GitHub Desktop](https://desktop.github.com/) をインストールしてログイン。
2. メニュー **File → Add Local Repository** で、この `saki-homepages` フォルダを選ぶ。
3. 「これは Git リポジトリではない」と出たら **create a repository** を選んで作成。
4. 左下でコミットメッセージ（例: `first commit`）を入れて **Commit to main**。
5. 右上 **Publish repository** →
   - Owner: `saki-0306`
   - Name: `saki-homepages`
   - **Keep this code private のチェックは外す**（Public にする）
   - **Publish**。

### 方法B：コマンドライン（Git が使える人向け）

このフォルダで、以下を実行します（`saki-0306` は実際のユーザー名に）。

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/saki-0306/saki-homepages.git
git push -u origin main
```

---

## STEP 3. GitHub Pages を有効化する

1. GitHub でリポジトリを開き、上部 **Settings** → 左メニュー **Pages**。
2. **Build and deployment** の **Source** を **GitHub Actions** にする。
   （「Deploy from a branch」ではなく **GitHub Actions** を選ぶのがポイント）
3. これで STEP 2 の push をきっかけに、`.github/workflows/deploy.yml` が自動で走ります。
   **Actions** タブでビルドの進行が見られます（緑のチェックが付けば成功）。
4. 数分後、**https://saki-0306.github.io/saki-homepages/** で表示されれば公開成功です。

> ⏳ 初回はビルドに 1〜3 分ほどかかります。表示されない場合は Actions タブでエラーが無いか確認してください。

---

## STEP 4. ログイン方式（トークン／PAT）について

この管理画面は **Personal Access Token（PAT）方式** でログインします。
GitHub は「パスワードでのログイン」を廃止しているため、代わりに
**トークン（合鍵のような文字列）** を1回貼ってログインします。

- **Cloudflare Worker も OAuth アプリも不要**（サーバー代ゼロのまま）
- `config.yml` は `repo` が正しければOK（`base_url` は書きません）＝設定作業ほぼゼロ
- トークンはブラウザ内にのみ保存され、サイトには一切埋め込まれません

トークンの発行は STEP 6 の中で恋人自身が行えます（CMSがリンクを用意してくれます）。

---

## STEP 5. config.yml の確認（基本そのままでOK）

`public/admin/config.yml` の先頭が、実際のリポジトリになっていればOKです。

```yaml
backend:
  name: github
  repo: saki-0306/saki-homepages   # ← あなたの「ユーザー名/リポジトリ名」
  branch: main
```

リポジトリ名を変えた場合だけ `repo` を直して push してください。
（`base_url` は PAT 方式では不要なので書きません）

---

## STEP 6. 恋人の使い方（ログイン＝トークンを1回貼るだけ）

### 6-1. 初回ログイン（トークンの発行と入力）

1. **https://saki-0306.github.io/saki-homepages/admin/** を開く
   （公開サイト右上の「編集」ボタンからも行けます）。
2. ログイン画面で **「Sign In with Token」**（トークンでサインイン）を押す。
3. 表示されるダイアログ内の **リンク**をクリックすると、GitHub のトークン発行画面が
   **必要な権限がセットされた状態**で開きます。
   - トークン種別は **Fine-grained token** を推奨
   - **Repository access**: `Only select repositories` →「`saki-homepages`」を選択
   - **Permissions → Repository permissions → Contents** を **Read and write** に
   - **Expiration（有効期限）** は好みで（長めにすると貼り直しの頻度が減ります）
4. **Generate token** を押し、表示された**トークン文字列をコピー**。
5. CMS のダイアログに**貼り付けて確定**。これでログイン完了です
   （トークンはブラウザに保存され、次回からは自動で入れます）。

> 💡 2回目以降は、同じブラウザなら基本ログインしたままです。
> 別の端末・別ブラウザで使うときや、有効期限が切れたときだけ、また貼り直します。

### 6-2. 編集のしかた

左のメニューから種類を選んで編集します。

- **ブログ・日記** … 「新規」→ タイトル・日付・ジャンルを選び、本文を書いて **保存**
- **ジャンル** … 「窓」の追加・削除（英字IDは半角英字で。記事との紐付けに使います）
- **お知らせ・近況** … 日時と短いメッセージ
- **写真ギャラリー** … 写真をアップロード（キャプション・撮影日は任意）
- **プロフィール** … 名前・ひとこと・自己紹介・好きなもの・リンク

**保存（Publish）** すると、自動で公開されます（反映まで 1〜3 分）。

> 画像はドラッグ＆ドロップでアップロードでき、`public/images/uploads/` に保存されます。
> 画像を設定しなくても、記事は仮の枠（image slot）が表示され、レイアウトは崩れません。

---

## ローカルで動かす（任意・開発者向け）

```bash
npm install      # 初回だけ
npm run dev      # 開発サーバ（表示された http://localhost:xxxx/saki-homepages/ を開く）
npm run build    # 本番ビルド（dist/ が出力される）
npm run preview  # ビルド結果をローカル確認
```

---

## 名前（リポジトリ名）を変えるとき

`saki-homepages` 以外の名前にする場合、次の3か所を合わせて変更します。

1. `vite.config.ts` の `base`（例: `/新しい名前/`。ユーザーサイト `saki-0306.github.io` の場合は `/`）
2. `public/admin/config.yml` の `repo`

---

## トラブルシューティング

- **サイトが真っ白 / 404**: STEP 3 の Source が **GitHub Actions** になっているか、
  `vite.config.ts` の `base` がリポジトリ名と一致しているか確認。
- **管理画面でログインできない**: 「Sign In with Token」でトークンを貼れているか、
  トークンの権限が **Contents = Read and write** かつ対象リポジトリが `saki-homepages` か、
  有効期限が切れていないかを確認（切れていたら新しいトークンを発行して貼り直し）。
- **保存したのに反映されない**: **Actions** タブでビルドが成功しているか確認（数分かかります）。
- **管理画面が英語で表示される**: 表示言語はブラウザの言語設定に追従します。ブラウザを日本語にすると日本語になります。
