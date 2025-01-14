---
title: React
tags:
  - React
  - 环境
  - 依赖
---

## 1. 运行环境

```json
"node": "16.14.2",
"npm": "9.5.1",
"yarn": "1.22.19",
"create-react-app": "5.0.1",
```

## 2. 依赖文件

package.json ：

```json
{
  "name": "demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "antd": "4.24.12",
    "axios": "0.21.0",
    "craco-less": "^3.0.1",
    "less": "3.13.0",
    "less-loader": "7.1.0",
    "nanoid": "3.1.18",
    "prop-types": "^15.8.1",
    "pubsub-js": "^1.9.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "5",
    "react-redux": "7.2.2",
    "react-scripts": "5.0.1",
    "redux": "4.0.5",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "2.3.0",
    "serve": "^14.2.4",
    "web-vitals": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

::: tip 备注：

1. `react` ：

   1-6 章：

   ```json
   "react": "^18.3.1",
   "react-dom": "^18.3.1",
   ```

   7-9 章：

   ```json
     "react": "^19.0.0",
     "react-dom": "^19.0.0",
   ```

1. `react-router-dom` ：

   第 9 章：

   ```json
     "react-router-dom": "6",
   ```

:::
