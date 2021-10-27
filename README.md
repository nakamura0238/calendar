# NEXT.js + TypeScript カレンダー
NEXT.js + TypeScript を使用したカレンダーアプリ
## 導入パッケージ
- emotion/react
- emotion/babel-plugin
- axios
## その他ファイル
`tsconfig.json`へ 以下を追加
```
"compilerOptions": {
  ...
  "jsxImportSource": "@emotion/react",
  "types": ["@emotion/react/types/css-prop"]
}
```

以下を記載した`.babelrc`をプロジェクトルートへ追加

```
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```