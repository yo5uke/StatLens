---
title: "TypeScriptとは？Rユーザーのための入門"
description: "統計分析に慣れたRユーザーがTypeScriptを学ぶための入門ガイド。型システムの比較から基本文法まで解説します。"
pubDate: 2026-01-15
category: "TypeScript"
tags: ["TypeScript", "R", "型システム", "入門"]
---

## はじめに

統計分析やデータサイエンスでRを使っている方にとって、TypeScriptは一見遠い世界の言語に思えるかもしれません。しかし、TypeScriptの**型システム**という概念は、実はRユーザーにとっても馴染みやすいものです。

この記事では、Rの経験を活かしながらTypeScriptの基本を学んでいきます。

## TypeScriptとは？

TypeScriptは、JavaScriptに**静的型付け**を追加した言語です。Microsoftによって開発され、大規模なWebアプリケーション開発で広く使われています。

### なぜTypeScriptが必要なのか？

JavaScriptは動的型付け言語で、変数の型を実行時まで確認しません。これは柔軟性がある一方、バグの原因にもなります。

```javascript
// JavaScript: エラーが実行時まで分からない
function add(a, b) {
  return a + b;
}

add(1, 2);        // 3
add("1", "2");    // "12" (意図しない文字列結合)
add(1, "2");      // "12" (型が混在)
```

TypeScriptでは、型を明示することでこのような問題を事前に防げます。

```typescript
// TypeScript: 型を指定してエラーを防ぐ
function add(a: number, b: number): number {
  return a + b;
}

add(1, 2);        // 3
add("1", "2");    // エラー: string型は許可されていない
add(1, "2");      // エラー: 型が一致しない
```

## RとTypeScriptの型システム比較

RとTypeScriptは、どちらも**型**という概念を持っています。比較してみましょう。

### 基本的なデータ型

| R | TypeScript | 説明 |
|---|------------|------|
| `numeric` | `number` | 数値 |
| `character` | `string` | 文字列 |
| `logical` | `boolean` | 真偽値 |
| `list` | `Array<T>` | 配列・リスト |
| `NULL` | `null` / `undefined` | 欠損値 |

### R vs TypeScript: 変数宣言

```r
# R: 型は自動推論される
x <- 42
name <- "Alice"
is_valid <- TRUE
numbers <- c(1, 2, 3, 4, 5)
```

```typescript
// TypeScript: 型注釈を付けられる（推論も可能）
let x: number = 42;
let name: string = "Alice";
let isValid: boolean = true;
let numbers: number[] = [1, 2, 3, 4, 5];

// 型推論を活用（型注釈を省略可）
let y = 42;  // number型と推論される
```

## TypeScriptの基本文法

### 関数の定義

Rの関数定義と比較してみましょう。

```r
# R
calculate_mean <- function(x) {
  sum(x) / length(x)
}

result <- calculate_mean(c(1, 2, 3, 4, 5))
```

```typescript
// TypeScript
function calculateMean(x: number[]): number {
  const sum = x.reduce((acc, val) => acc + val, 0);
  return sum / x.length;
}

const result = calculateMean([1, 2, 3, 4, 5]);
```

TypeScriptでは、引数の型（`x: number[]`）と返り値の型（`: number`）を明示します。

### アロー関数

JavaScriptとTypeScriptでは、**アロー関数**という簡潔な関数記法があります。

```typescript
// 通常の関数
function square(x: number): number {
  return x * x;
}

// アロー関数（Rの無名関数に似ている）
const square = (x: number): number => {
  return x * x;
};

// さらに簡潔に（1行の場合）
const square = (x: number): number => x * x;

// 配列操作で活躍
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x * x);  // [1, 4, 9, 16, 25]
```

Rの`function(x) x * x`や`\(x) x * x`に相当します。

### インターフェース（構造体の型定義）

TypeScriptでは、オブジェクトの構造を**インターフェース**で定義できます。

```typescript
interface Person {
  name: string;
  age: number;
  email?: string;  // ?は省略可能を意味する
}

const alice: Person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

const bob: Person = {
  name: "Bob",
  age: 25
  // emailは省略可能なので無くてもOK
};
```

これはRのS3クラスやtibbleの列定義に似ています。

## データ処理の比較

### 配列の操作

```r
# R: tidyverseスタイル
library(dplyr)

data <- tibble(
  id = 1:5,
  value = c(10, 20, 30, 40, 50)
)

result <- data |>
  filter(value > 20) |>
  mutate(doubled = value * 2)
```

```typescript
// TypeScript: 配列メソッド
interface Data {
  id: number;
  value: number;
}

const data: Data[] = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 40 },
  { id: 5, value: 50 }
];

const result = data
  .filter(row => row.value > 20)
  .map(row => ({ ...row, doubled: row.value * 2 }));
```

TypeScriptの`.filter()`や`.map()`は、Rの`filter()`や`mutate()`に相当します。

## まとめ

TypeScriptは、Rユーザーにとっても学びやすい言語です。

- **型システム**はRと共通する概念
- **関数型プログラミング**のスタイルも活用できる
- **配列操作**はtidyverseと似た感覚で書ける

Web開発や可視化ツールの作成に興味があるなら、TypeScriptは強力な選択肢になります。次回は、Astroフレームワークを使った静的サイト構築について解説します。
