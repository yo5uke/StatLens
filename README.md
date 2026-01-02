# yo5uke-lab

データサイエンス・統計分析の技術ブログサイト。R、Python、TypeScript、統計手法などの技術Tipsやチュートリアルを発信しています。

## プロジェクト概要

このサイトは、統計分析やデータサイエンスに関する技術的な知見を整理・共有するために構築されました。モダンなWebテクノロジー（Astro、TypeScript、Tailwind CSS）を活用した静的サイトジェネレーターで、GitHub Pagesにホスティングされています。

## 技術スタック

- **フレームワーク**: [Astro](https://astro.build) v5
- **言語**: TypeScript (strictest mode)
- **スタイリング**: Tailwind CSS v4
- **マークダウン**: Astroのコンテンツコレクション機能
- **パッケージマネージャー**: npm
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions

## 機能

- 📝 Markdownで記事を管理（シンタックスハイライト対応）
- 🏷️ カテゴリフィルタリング機能
- 🌙 ダークモード対応
- 📱 レスポンシブデザイン
- ⚡ 高速な静的サイト生成
- 🔍 型安全なコンテンツ管理（TypeScript + Zod）

## セットアップ手順

### 前提条件

- Node.js 18以上
- npm

### インストール

リポジトリをクローンして、依存関係をインストールします。

```bash
git clone https://github.com/yo5uke/yo5uke-lab.git
cd yo5uke-lab
npm install
```

## 開発方法

### ローカル開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動し、[http://localhost:4321](http://localhost:4321) でサイトにアクセスできます。ファイルを編集すると自動でリロードされます。

### 本番ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成されます。

### プレビュー

ビルドした本番サイトをローカルで確認できます。

```bash
npm run preview
```

### リント・フォーマット

コードスタイルをチェック・修正します。

```bash
npm run lint     # ESLintでコードチェック
npm run format   # Prettierでコード整形
```

## プロジェクト構造

```
yo5uke-lab/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actionsデプロイ設定
├── src/
│   ├── components/             # 再利用可能なコンポーネント
│   │   ├── Navigation.astro    # ヘッダーナビゲーション
│   │   ├── Footer.astro        # フッター
│   │   └── PostCard.astro      # 記事カード
│   ├── content/
│   │   ├── config.ts           # コンテンツコレクション設定
│   │   └── posts/              # ブログ記事（Markdown）
│   │       ├── post-1.md
│   │       └── post-2.md
│   ├── layouts/
│   │   └── BaseLayout.astro    # ベースレイアウト
│   ├── pages/
│   │   ├── index.astro         # トップページ
│   │   ├── about.astro         # Aboutページ
│   │   └── posts/
│   │       ├── index.astro     # 記事一覧ページ
│   │       └── [...slug].astro # 記事詳細ページ（動的ルーティング）
│   ├── styles/
│   │   └── global.css          # グローバルスタイル
│   └── types.ts                # TypeScript型定義
├── public/                     # 静的ファイル（画像など）
├── astro.config.mjs            # Astro設定ファイル
├── tsconfig.json               # TypeScript設定
├── .eslintrc.cjs               # ESLint設定
├── .prettierrc.json            # Prettier設定
└── package.json
```

## 新規記事の追加方法

### 1. Markdownファイルを作成

`src/content/posts/` ディレクトリに新しい `.md` ファイルを作成します。

```bash
src/content/posts/my-new-post.md
```

### 2. フロントマターを記述

記事の先頭にYAML形式のメタデータを追加します。

```yaml
---
title: "記事のタイトル"
description: "記事の説明文"
pubDate: 2026-01-30
category: "TypeScript"
tags: ["TypeScript", "Web開発"]
draft: false  # 公開する場合はfalse（省略可）
---

## 見出し1

記事の本文をMarkdownで書きます。

\`\`\`typescript
// コードサンプル
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
```

### 3. 記事の確認

開発サーバーを起動して、記事が正しく表示されるか確認します。

```bash
npm run dev
```

### 4. 利用可能なフィールド

| フィールド | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `title` | `string` | ✅ | 記事タイトル |
| `description` | `string` | ✅ | 記事の説明文 |
| `pubDate` | `Date` | ✅ | 公開日（YYYY-MM-DD形式） |
| `category` | `string` | ✅ | カテゴリ（例: TypeScript、R、Python） |
| `tags` | `string[]` | ✅ | タグ配列 |
| `draft` | `boolean` | ❌ | 下書きフラグ（trueの場合は非公開） |

## デプロイ方法

### GitHub Pagesへの自動デプロイ

このプロジェクトは、GitHub Actionsを使用して自動的にデプロイされます。

1. **リポジトリ設定**

   GitHubリポジトリの Settings > Pages で、以下を設定します。
   - Source: GitHub Actions

2. **プッシュでデプロイ**

   `main` ブランチにプッシュすると、自動的にビルド・デプロイされます。

   ```bash
   git add .
   git commit -m "Add new post"
   git push origin main
   ```

3. **デプロイ状況の確認**

   リポジトリの Actions タブでデプロイの進行状況を確認できます。

### 手動デプロイ

手動でデプロイする場合は、以下のコマンドを実行します。

```bash
npm run build
# dist/ ディレクトリの内容をサーバーにアップロード
```

## カスタマイズ

### サイト情報の変更

[astro.config.mjs](astro.config.mjs) でサイトのURLやベースパスを変更できます。

```javascript
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',
  // ...
});
```

### カラーテーマの変更

プライマリカラー（ミントグリーン）とアクセントカラー（コーラルピンク）は、以下のファイルで定義されています。

- [src/components/Navigation.astro](src/components/Navigation.astro)
- [src/components/PostCard.astro](src/components/PostCard.astro)
- [src/pages/index.astro](src/pages/index.astro)

Tailwind CSSのカスタムカラー `text-[#98D8C8]` や `text-[#FF6F61]` を変更することで、テーマカラーをカスタマイズできます。

## トラブルシューティング

### ビルドエラー

```bash
npm run build
```

で型エラーやビルドエラーが発生する場合は、以下を確認してください。

- 記事のフロントマターが正しく記述されているか
- `pubDate` が日付形式（YYYY-MM-DD）になっているか
- TypeScriptの型エラーがないか

### GitHub Pagesで404エラー

- [astro.config.mjs](astro.config.mjs) の `base` 設定がリポジトリ名と一致しているか確認
- GitHub Pagesの設定で Source が "GitHub Actions" になっているか確認

## ライセンス

MIT License

## 作成者

yo5uke - データサイエンス・統計分析の技術ブログ

- GitHub: [@yo5uke](https://github.com/yo5uke)
