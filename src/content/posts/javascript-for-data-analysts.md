---
title: "データ分析者のためのJavaScript基礎"
description: "PythonユーザーがJavaScriptを学ぶためのガイド。文法の違い、データ処理の方法、モダンな配列操作を解説します。"
pubDate: 2026-01-25
category: "Python/JavaScript比較"
tags: ["JavaScript", "Python", "データ処理", "比較"]
---

## はじめに

Pythonでデータ分析をしている方にとって、JavaScriptは「ブラウザで動く言語」というイメージが強いかもしれません。しかし、Node.jsの登場以降、JavaScriptはサーバーサイドやデータ処理でも活用されています。

この記事では、Pythonの知識を活かしながらJavaScriptの基本を学びます。

## PythonとJavaScriptの比較

### 変数宣言

```python
# Python: 型注釈はオプション
x = 42
name = "Alice"
is_valid = True
```

```javascript
// JavaScript: const/let/varで宣言
const x = 42;          // 再代入不可（定数）
let name = "Alice";    // 再代入可能
let isValid = true;
```

**ポイント**: JavaScriptでは`const`を基本とし、再代入が必要な場合のみ`let`を使います。`var`は古い書き方なので避けましょう。

### データ型

| Python | JavaScript | 備考 |
|--------|------------|------|
| `int`, `float` | `number` | JavaScriptは整数・小数を区別しない |
| `str` | `string` | 文字列 |
| `bool` | `boolean` | `True`/`False` vs `true`/`false` |
| `list` | `Array` | 配列 |
| `dict` | `Object` | 辞書・オブジェクト |
| `None` | `null`, `undefined` | JavaScriptは2種類の「無」がある |

### 配列（リスト）の操作

```python
# Python
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]  # リスト内包表記
evens = [x for x in numbers if x % 2 == 0]
total = sum(numbers)
```

```javascript
// JavaScript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);  // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0);  // [2, 4]
const total = numbers.reduce((acc, x) => acc + x, 0);  // 15
```

JavaScriptの`.map()`、`.filter()`、`.reduce()`は、Pythonのリスト内包表記や`map()`、`filter()`に相当します。

## 関数の定義

### 通常の関数

```python
# Python
def add(a, b):
    return a + b

result = add(1, 2)
```

```javascript
// JavaScript
function add(a, b) {
  return a + b;
}

const result = add(1, 2);
```

### アロー関数（ラムダ式）

```python
# Python: lambda式
square = lambda x: x * x
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
```

```javascript
// JavaScript: アロー関数
const square = x => x * x;
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(square);

// 直接書くことも多い
const squared = numbers.map(x => x * x);
```

アロー関数はPythonのlambda式より柔軟で、複数行も書けます。

```javascript
const processData = (data) => {
  const filtered = data.filter(x => x > 0);
  const doubled = filtered.map(x => x * 2);
  return doubled;
};
```

## オブジェクト（辞書）の操作

### 基本的な使い方

```python
# Python
person = {
    "name": "Alice",
    "age": 30,
    "city": "Tokyo"
}

print(person["name"])  # Alice
print(person.get("email", "N/A"))  # N/A
```

```javascript
// JavaScript
const person = {
  name: "Alice",
  age: 30,
  city: "Tokyo"
};

console.log(person.name);  // Alice（ドット記法）
console.log(person["name"]);  // Alice（ブラケット記法）
console.log(person.email || "N/A");  // N/A
```

JavaScriptでは、キーに引用符が不要（識別子として有効な場合）で、ドット記法でアクセスできます。

### 分割代入（Destructuring）

JavaScriptには、オブジェクトや配列から値を取り出す便利な構文があります。

```javascript
// オブジェクトの分割代入
const person = { name: "Alice", age: 30, city: "Tokyo" };
const { name, age } = person;
console.log(name);  // Alice
console.log(age);   // 30

// 配列の分割代入
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]
```

Pythonのアンパック代入に似ていますが、より柔軟です。

### スプレッド構文

```python
# Python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = [*list1, *list2]  # [1, 2, 3, 4, 5, 6]

dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
```

```javascript
// JavaScript
const list1 = [1, 2, 3];
const list2 = [4, 5, 6];
const combined = [...list1, ...list2];  // [1, 2, 3, 4, 5, 6]

const dict1 = { a: 1, b: 2 };
const dict2 = { c: 3, d: 4 };
const merged = { ...dict1, ...dict2 };
```

`...`（スプレッド演算子）は、Pythonの`*`や`**`に相当します。

## データ処理の実例

### pandas風のデータ処理

```python
# Python + pandas
import pandas as pd

data = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "salary": [50000, 60000, 70000]
})

result = data[data["age"] > 25][["name", "salary"]]
```

```javascript
// JavaScript
const data = [
  { name: "Alice", age: 25, salary: 50000 },
  { name: "Bob", age: 30, salary: 60000 },
  { name: "Charlie", age: 35, salary: 70000 }
];

const result = data
  .filter(row => row.age > 25)
  .map(row => ({ name: row.name, salary: row.salary }));

console.log(result);
// [
//   { name: "Bob", salary: 60000 },
//   { name: "Charlie", salary: 70000 }
// ]
```

### グループ化と集計

```python
# Python + pandas
grouped = data.groupby("department")["salary"].mean()
```

```javascript
// JavaScript: reduce()でグループ化
const data = [
  { name: "Alice", department: "Engineering", salary: 50000 },
  { name: "Bob", department: "Engineering", salary: 60000 },
  { name: "Charlie", department: "Sales", salary: 55000 }
];

const grouped = data.reduce((acc, row) => {
  const dept = row.department;
  if (!acc[dept]) {
    acc[dept] = { sum: 0, count: 0 };
  }
  acc[dept].sum += row.salary;
  acc[dept].count += 1;
  return acc;
}, {});

const averages = Object.entries(grouped).map(([dept, stats]) => ({
  department: dept,
  avgSalary: stats.sum / stats.count
}));

console.log(averages);
// [
//   { department: "Engineering", avgSalary: 55000 },
//   { department: "Sales", avgSalary: 55000 }
// ]
```

JavaScriptではpandasのような便利なライブラリが標準ではありませんが、`reduce()`を使えば同様の処理が可能です。

## 非同期処理（async/await）

JavaScriptの最大の特徴の1つが**非同期処理**です。

### Pythonとの比較

```python
# Python
import requests

response = requests.get("https://api.example.com/data")
data = response.json()
print(data)
```

```javascript
// JavaScript (async/await)
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}

fetchData();
```

`async`/`await`は、Pythonの同名機能とほぼ同じ使い方です。

## モダンなJavaScript（ES6+）の機能

### テンプレートリテラル

```python
# Python: f-string
name = "Alice"
age = 30
message = f"My name is {name} and I am {age} years old."
```

```javascript
// JavaScript: テンプレートリテラル
const name = "Alice";
const age = 30;
const message = `My name is ${name} and I am ${age} years old.`;
```

バッククォート（`` ` ``）を使うことで、Pythonのf-stringと同様の文字列補完ができます。

### オプショナルチェイニング

```javascript
const user = {
  name: "Alice",
  address: {
    city: "Tokyo"
  }
};

// 従来: ネストが深いとエラーリスクがある
const city = user && user.address && user.address.city;

// オプショナルチェイニング: 簡潔で安全
const city = user?.address?.city;  // "Tokyo"
const zip = user?.address?.zip;    // undefined（エラーにならない）
```

これはPythonにはない便利な機能です。

## まとめ

JavaScriptは、Pythonユーザーにとっても学びやすい言語です。

- **配列操作**は`map()`, `filter()`, `reduce()`でリスト内包表記と同等の処理が可能
- **オブジェクト操作**は辞書と似ているが、より柔軟
- **アロー関数**はlambda式より強力
- **async/await**で非同期処理も直感的に書ける

データ可視化やWebアプリ開発に興味があるなら、JavaScriptは必須のスキルです。次回は、JavaScriptでのデータ可視化ライブラリ（D3.js、Plotly）について解説します。
