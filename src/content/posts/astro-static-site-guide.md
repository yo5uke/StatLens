---
title: "AstroでStaticサイトを作る"
description: "モダンな静的サイトジェネレーターAstroの特徴とプロジェクト構造を解説。TypeScriptとの相性も抜群です。"
pubDate: 2026-01-20
category: "Web開発"
tags: ["Astro", "TypeScript", "Static Site", "Web開発"]
---

## Astroとは？

**Astro**は、モダンな静的サイトジェネレーター（SSG）です。2021年に登場し、高速なWebサイト構築のために設計されています。

### Astroの特徴

1. **ゼロJavaScript by default**: デフォルトではクライアント側のJavaScriptを送信しない
2. **マルチフレームワーク対応**: React、Vue、Svelteなどを同時に使える
3. **優れた開発体験**: TypeScript、Markdownネイティブサポート
4. **高速なビルド**: Viteベースで爆速ビルド

研究者やデータサイエンティストが技術ブログやポートフォリオサイトを作るのに最適です。

## なぜAstroを選ぶのか？

### 従来のフレームワークとの違い

| フレームワーク | JavaScript配信 | ビルド速度 | 学習コスト |
|----------------|----------------|------------|------------|
| Next.js | 多い | 普通 | 高い |
| Gatsby | 多い | 遅い | 高い |
| Hugo | なし | 速い | 低い（Go Template） |
| **Astro** | **最小限** | **速い** | **低い** |

Astroは、Hugoの速さとNext.jsの柔軟性を兼ね備えています。

## プロジェクト構造

Astroプロジェクトの典型的な構造を見てみましょう。

```
my-astro-site/
├── src/
│   ├── components/     # 再利用可能なコンポーネント
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/        # ページレイアウト
│   │   └── BaseLayout.astro
│   ├── pages/          # ページ（ルーティング）
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── posts/
│   │       └── [slug].astro
│   ├── content/        # Markdownコンテンツ
│   │   └── posts/
│   │       ├── post-1.md
│   │       └── post-2.md
│   └── styles/         # CSSファイル
│       └── global.css
├── public/             # 静的ファイル（画像など）
├── astro.config.mjs    # Astro設定ファイル
└── package.json
```

### pagesディレクトリとルーティング

Astroは**ファイルベースルーティング**を採用しています。

```
src/pages/index.astro       → /
src/pages/about.astro       → /about
src/pages/posts/index.astro → /posts
src/pages/posts/[slug].astro → /posts/any-slug
```

Next.jsやSvelteKitと同じパターンです。

## Astroコンポーネントの基本

Astroコンポーネント（`.astro`ファイル）は、3つのセクションで構成されます。

```astro
---
// 1. フロントマター（TypeScript/JavaScript）
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "My Page";
const items = ["Item 1", "Item 2", "Item 3"];
---

<!-- 2. テンプレート（HTML） -->
<BaseLayout title={title}>
  <h1>{title}</h1>
  <ul>
    {items.map(item => (
      <li>{item}</li>
    ))}
  </ul>
</BaseLayout>

<!-- 3. スタイル（オプション） -->
<style>
  h1 {
    color: #98D8C8;
  }
</style>
```

### フロントマター

`---`で囲まれた部分は、サーバー側で実行されるTypeScript/JavaScriptです。

```typescript
---
import { getCollection } from 'astro:content';

// データ取得（ビルド時に実行）
const posts = await getCollection('posts');
const latestPosts = posts
  .sort((a, b) => b.data.pubDate - a.data.pubDate)
  .slice(0, 5);
---

<ul>
  {latestPosts.map(post => (
    <li>
      <a href={`/posts/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

この部分は**ビルド時のみ**実行され、ブラウザには送信されません。

## Content Collections

Astroの**Content Collections**は、Markdownコンテンツを型安全に管理する機能です。

### 設定ファイル

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts };
```

Zodスキーマで型を定義することで、TypeScriptの型チェックが効きます。

### コンテンツの取得

```typescript
---
import { getCollection } from 'astro:content';

// 全記事を取得
const allPosts = await getCollection('posts');

// フィルタリング
const publishedPosts = await getCollection('posts', ({ data }) => {
  return data.draft !== true;
});
---
```

これはRでいうと、`read_csv()`でデータを読み込み、`filter()`で条件抽出する感覚に似ています。

## 動的ルーティング

動的ルーティングで、Markdownから自動的にページを生成できます。

```typescript
---
// src/pages/posts/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

`getStaticPaths()`は、ビルド時に全ページのパスを生成します。

## GitHub Pagesへのデプロイ

Astroサイトは、GitHub Pagesに簡単にデプロイできます。

### astro.config.mjsの設定

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repository-name',
});
```

### GitHub Actionsワークフロー

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

mainブランチにpushすると自動デプロイされます。

## まとめ

Astroは、技術ブログや研究ポートフォリオに最適な静的サイトジェネレーターです。

- **TypeScript完全サポート**で型安全
- **Content Collections**でMarkdownを構造化管理
- **ゼロJavaScript**で高速なサイト
- **GitHub Pages**に簡単デプロイ

次回は、データ分析者のためのJavaScript基礎を解説します。
