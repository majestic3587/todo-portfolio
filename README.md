This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 【Todoアプリ】要件定義書

# プロダクト名：Simple Todo

# 1.プロジェクト概要・目的

## 1.1 背景

日常業務や個人タスク管理において、以下の問題が存在する

- タスクが整理されず抜け漏れが発生する
- 完了状況が把握しづらい
- 複数デバイス間で管理できない

既存サービスは高機能であり、個人用途では過剰な場合が多い

## 1.2 解決する課題

SimpleTodoは以下を解決する

- 個人タスクをシンプルに管理できる
- ログインユーザーごとに安全にデータを分離する
- Webブラウザからいつでもアクセス可能にする

## 1.3 対象ユーザー

- 個人開発者
- 学生
- シンプルなTodo管理を求めるユーザー

# 2. システム概要

## 2.1 システム構成

- フロントエンド：Next.js (App Router)、TypeScript
- バックエンド：Next.js Server Actions
- DB：Supabase(PostgreSQL)
- 認証：Supabase Auth
- デプロイ： Vercel

# 3. 機能要件

## 3.1 認証機能

### ユーザー登録

- メールアドレス、パスワード
- Google認証

### ログイン

- 認証済みユーザーのみTodo操作可能

### ログアウト

- セッション破棄

## 3.2 Todo管理機能

### Todo作成

- タイトル入力必須
- 作成日時を自動保存

### Todo一覧表示

- 自分のTodoのみ表示
- 作成日時降順

### Todo更新

- 完了/未完了の切り替え可能
- タイトル編集可能

### Todo削除

- 任意Todo削除可能

### 3.3 フィルタ機能

- 全件表示
- 未完了のみ
- 完了のみ

# 4. 業務ルール

- Todoは必ず1ユーザーに属する
- 他ユーザーのTodoは閲覧不可
- 未ログイン状態では操作不可
- Todoタイトルは空文字不可

# 5.非機能要件

## セキュリティ

- Supabase RLSによるアクセス制御
- user_id一致時のみ操作可能

## 可用性

- Vercel上で常時アクセス可能

## パフォーマンス

- Todo一覧取得1秒以内

# 6. データベース設計

## 6.1 テーブル設計

### todos

| **カラム** | **型** | **説明** |
| --- | --- | --- |
| id | uuid | PK |
| user_id | uuid | ユーザーID |
| title | text | タスク名 |
| is_done | boolean | 完了状態 |
| created_at | timestamp | 作成日時 |

## 6.2 RLSポリシー(設計意図)

- 認証ユーザーのみアクセス可能
- auth.uid() = user_id の場合のみCRUD許可

マルチテナント設計の基本を実装

# 7.API設計

## エラーコード

- 401 UNAUTHORIZED：未ログイン
- 400 VALIDATION_ERROR：入力不正
- 404 NOT_FOUND：対象なし(他人のTodo含む)
- 500 INTERNAL_ERROR

## ディレクトリ構成

app/

api/

/me/route.ts

/todos/route.ts

/todos/[id]/route.ts

lib/

supabase/

server.ts

validation/

todo.ts

# 7. 画面一覧

- ログイン画面
- Todo一覧画面
- Todo作成フォーム

# 8. 制約事項

- 個人利用を前提とする
- チーム共有機能はMVP対象外

# 9. 将来的拡張性

- 期限設定
- 優先度
- チーム共有
- 通知機能
- SaaS化(Stripe課金)
