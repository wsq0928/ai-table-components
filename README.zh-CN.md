# AI Table Components

[English](./README.md) | 简体中文

> 完整的 Vue3 + Element Plus 列表管理组件库

一套功能强大、易于使用的表格和表单组件系统，专为 Vue3 和 Element Plus 设计，提供开箱即用的列表管理、搜索、分页、导入、表单等完整功能。

**📚 [快速开始](./QUICK_START.md)** | **📖 [完整文档](./docs/)** | **❓ [常见问题](./FAQ.md)**

---

## 🚀 5 分钟快速开始

```bash
# 1. 安装
npm install ai-table-components

# 2. 使用
import { AiTableModules } from 'ai-table-components'
import 'ai-table-components/dist/style.css'
```

详细步骤请查看 [快速开始指南](./QUICK_START.md)

---

## 📖 文档导航

### 核心文档
- 📚 [快速开始](./QUICK_START.md) - 5 分钟快速上手
- 📖 [使用指南](./docs/GUIDE.md) - 详细的使用教程
- 📋 [API 文档](./docs/API.md) - 完整的 API 参考
- ❓ [常见问题](./FAQ.md) - FAQ 解答

### 开发文档  
- 🔨 [构建指南](./BUILD_CHECKLIST.md) - 构建检查清单
- 📦 [发布指南](./PUBLISH.md) - NPM 发布步骤
- 🤝 [贡献指南](./CONTRIBUTING.md) - 如何贡献代码
- 📝 [更新日志](./CHANGELOG.md) - 版本历史

### 项目信息
- 📊 [项目总结](./PROJECT_SUMMARY.md) - 完整的项目概览
- 📄 [许可证](./LICENSE) - MIT License

---

## ✨ 特性

- 🚀 **开箱即用** - 完整的列表管理解决方案
- 📦 **组件丰富** - 表格、搜索、分页、导入、表单等全套组件
- 🎨 **样式优雅** - 基于 Element Plus，界面美观现代
- 🔧 **高度可配置** - 灵活的配置选项，满足各种业务需求
- 📱 **响应式设计** - 自适应各种屏幕尺寸
- 🎯 **TypeScript 支持** - 提供类型定义（计划中）
- 🌍 **按需导入** - 支持 tree-shaking，减小打包体积

---

## 📦 安装

```bash
npm install ai-table-components
# 或
yarn add ai-table-components
# 或
pnpm add ai-table-components
```

### 前置依赖

```bash
npm install vue@^3.3.0 element-plus@^2.0.0
```

---

## 🔨 基本使用

### 完整引入

```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import AiTableComponents from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(AiTableComponents)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="headers"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const tableData = ref([
  { id: 1, name: '张三', age: 25 }
])

const headers = ref([
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
])
</script>
```

---

## 📋 主要组件

### AiTableModules - 主表格组件
功能完整的表格组件，包含搜索、分页、排序、导出等功能。

### AddReuse - 表单组件
抽屉式表单组件，支持新增和编辑功能。

### 更多组件
- SearchForm - 搜索表单
- ImportComponent - 数据导入
- TagInput - 标签输入
- SettingsHeaders - 表头设置
- ... 更多

详见 [API 文档](./docs/API.md)

---

## 🛠️ 开发指南

### 克隆项目

```bash
git clone https://github.com/yourusername/ai-table-components.git
cd ai-table-components
```

### 安装依赖

```bash
npm install
```

### 构建

```bash
npm run build
```

### 检查构建

```bash
npm run check-build
```

### 准备发布

```bash
npm run prepare-publish
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

---

## 📄 许可证

[MIT License](./LICENSE)

---

## 🔗 相关链接

- [Vue 3](https://v3.vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Vite](https://vitejs.dev/)

---

## 💬 支持

如有问题或建议：
1. 查看 [常见问题](./FAQ.md)
2. 提交 [Issue](../../issues)
3. 参与 [讨论](../../discussions)

---

Made with ❤️
