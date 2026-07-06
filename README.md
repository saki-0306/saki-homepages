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
| ログイン認証 | [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)（Cloudflare Workers 上の OAuth） |
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

## STEP 4. ログイン認証（Cloudflare Worker）を用意する

管理画面の「GitHubでログイン」を動かすために、OAuth を仲介する小さな
Cloudflare Worker（`sveltia-cms-auth`）を無料で立てます。

### 4-1. GitHub OAuth App を作る

1. GitHub の **Settings → Developer settings → OAuth Apps → New OAuth App**。
   （リポジトリの Settings ではなく、アカウントの Settings です）
2. 次のように入力：
   - **Application name**: 例 `Saki CMS`
   - **Homepage URL**: `https://saki-0306.github.io/saki-homepages/`
   - **Authorization callback URL**: `https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev/callback`
     （↑ Worker の URL は次の 4-2 で決まります。いったん仮で入れて、後で正しい値に直してOK）
3. **Register application** を押す。
4. **Client ID** が表示されます。**Generate a new client secret** を押して
   **Client Secret** も発行し、両方メモしておきます（Secret は一度しか表示されません）。

### 4-2. Cloudflare Worker をデプロイする

1. [Cloudflare](https://dash.cloudflare.com/) に無料アカウントでログイン。
2. sveltia-cms-auth のリポジトリを開く：https://github.com/sveltia/sveltia-cms-auth
   README の **「Deploy to Cloudflare Workers」** ボタン、または以下の手動デプロイを行います。
   - 手動の場合: このリポジトリを自分のアカウントに **Fork** →
     Cloudflare ダッシュボードの **Workers & Pages → Create → Import a repository** から
     Fork したリポジトリを選んでデプロイ。
3. デプロイが終わると Worker の URL が決まります。例：
   `https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev`
4. Worker の **Settings → Variables and Secrets** に、以下を **Secret（暗号化）** で追加：
   - `GITHUB_CLIENT_ID` … 4-1 の Client ID
   - `GITHUB_CLIENT_SECRET` … 4-1 の Client Secret
   - `ALLOWED_DOMAINS` … `saki-0306.github.io`（このサイトからのみ認証を許可する安全設定）
5. 保存して Worker を再デプロイ（Deploy）。

### 4-3. コールバックURLを確定させる

4-1 の OAuth App に戻り、**Authorization callback URL** を
`https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev/callback`
（= 実際の Worker URL ＋ `/callback`）に修正して **Update application**。

---

## STEP 5. config.yml を正しい値に書き換える

`public/admin/config.yml` の先頭を、実際の値に直します。

```yaml
backend:
  name: github
  repo: saki-0306/saki-homepages          # ← あなたの「ユーザー名/リポジトリ名」
  branch: main
  base_url: https://sveltia-cms-auth.<あなたのサブドメイン>.workers.dev  # ← STEP 4 の Worker URL（末尾スラッシュ無し）
```

- `repo` … 実際の `ユーザー名/リポジトリ名`
- `base_url` … STEP 4-2 で決まった Worker の URL（`/callback` は付けない）

直したら保存し、変更を GitHub に push（GitHub Desktop なら Commit → Push）します。
自動ビルドが走り、数分で反映されます。

---

## STEP 6. 恋人の使い方（これだけ覚えればOK）

1. **https://saki-0306.github.io/saki-homepages/admin/** を開く
   （サイト右上の「編集」ボタンからも行けます）。
2. **「GitHubでログイン」** を押して、GitHub アカウントで許可する（初回だけ）。
3. 左のメニューから種類を選んで編集：
   - **ブログ・日記** … 「New 記事」→ タイトル・日付・ジャンルを選び、本文を書いて **保存**
   - **ジャンル** … 「窓」の追加・削除（英字IDは半角英字で。記事との紐付けに使います）
   - **お知らせ・近況** … 日時と短いメッセージ
   - **写真ギャラリー** … 写真をアップロード（キャプション・撮影日は任意）
   - **書籍・本のまとめ** … 本ごとにフォルダを作り、章ごとにファイルを分けてまとめを書く
   - **プロフィール** … 名前・ひとこと・自己紹介・好きなもの・リンク
4. **保存（Publish）** すると、自動で公開されます（反映まで 1〜3 分）。

> 画像はドラッグ＆ドロップでアップロードでき、`public/images/uploads/` に保存されます。
> 画像を設定しなくても、記事は仮の枠（image slot）が表示され、レイアウトは崩れません。

---

## 公開・非公開／パスワード保護について

ブログ・お知らせ・写真・書籍のそれぞれに、次の2つの項目があります。

- **公開する**（チェックを外すと非公開＝下書き。サイトから完全に見えなくなります）
- **閲覧パスワード（任意）**（入力すると、そのパスワードを知っている人だけが閲覧できます。
  空欄なら誰でも閲覧できます）

パスワードを設定した項目は、一覧に 🔒 マークだけ表示され、開くにはパスワード入力が必要になります。
一度正しく入力すると、同じブラウザ・同じタブでは再入力を求められません（タブを閉じるとリセット）。

> ⚠️ **重要な注意**：このリポジトリは GitHub 上で **Public（公開）** に設定されています。
> パスワード保護は「サイトの一般来訪者への目隠し」であり、GitHub のリポジトリを直接開いて
> `content/` 内の Markdown ファイルを見れば、パスワードも本文もそのまま読めてしまいます。
> つまり **本当に他人に知られたくない内容の保護にはなりません**。
> 家族や友人には見せたくないが、技術的な詮索者からの完全な秘匿までは必要ない、という
> 「ゆるいプライバシー」用途向けの機能です。
>
> 本当に秘匿性が必要な内容がある場合は、リポジトリを **Private** に変更することを検討してください
> （GitHub Pages はプランによって Private リポジトリからの公開にも対応しています。
> Settings → Danger Zone → Change repository visibility から変更できます）。

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
3. GitHub OAuth App / Worker の各 URL（Homepage・callback・base_url）

---

## トラブルシューティング

- **サイトが真っ白 / 404**: STEP 3 の Source が **GitHub Actions** になっているか、
  `vite.config.ts` の `base` がリポジトリ名と一致しているか確認。
- **管理画面でログインできない**: `config.yml` の `base_url` と、OAuth App の callback URL
  （`.../callback`）、Worker の Secret（Client ID / Secret）を再確認。
- **保存したのに反映されない**: **Actions** タブでビルドが成功しているか確認（数分かかります）。
- **管理画面が英語で表示される**: 表示言語はブラウザの言語設定に追従します。ブラウザを日本語にすると日本語になります。
