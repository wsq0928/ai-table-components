# AI Table Components

> 完整的 Vue3 + Element Plus 列表管理组件库

一套功能强大、易于使用的表格和表单组件系统，专为 Vue3 和 Element Plus 设计，提供开箱即用的列表管理、搜索、分页、导入、表单等完整功能。

**📚 [快速开始](./QUICK_START.md)** | **📖 [完整文档](./docs/)** | **❓ [常见问题](./FAQ.md)**

## ✨ 特性

- 🚀 **开箱即用** - 完整的列表管理解决方案
- 📦 **组件丰富** - 表格、搜索、分页、导入、表单等全套组件
- 🎨 **样式优雅** - 基于 Element Plus，界面美观现代
- 🔧 **高度可配置** - 灵活的配置选项，满足各种业务需求
- 📱 **响应式设计** - 自适应各种屏幕尺寸
- 🎯 **TypeScript 支持** - 提供类型定义（计划中）
- 🌍 **按需导入** - 支持 tree-shaking，减小打包体积

## 📦 安装

```bash
npm install ai-table-components
# 或
yarn add ai-table-components
# 或
pnpm add ai-table-components
```

### 前置依赖

本组件库依赖以下包，请确保您的项目中已安装：

```bash
npm install vue@^3.3.0 element-plus@^2.0.0
```

## 🔨 使用

### 完整引入

```javascript
// main.js
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

### 按需引入（推荐）

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="headers"
    :total="total"
    @search="handleSearch"
    @page-change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
])

const headers = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'email', label: '邮箱' }
])

const total = ref(100)

const handleSearch = (params) => {
  console.log('搜索参数:', params)
  // 处理搜索逻辑
}

const handlePageChange = (page) => {
  console.log('页码变化:', page)
  // 处理分页逻辑
}
</script>
```

## 📖 组件说明

### AiTableModules（主表格组件）

功能完整的表格组件，包含搜索、分页、排序、导出等功能。

**主要属性：**

| 属性 | 说明 | 类型 | 默认值 |
|-----|-----|------|-------|
| data | 表格数据 | Array | [] |
| headers | 表头配置 | Array | [] |
| total | 数据总数 | Number | 0 |
| loading | 加载状态 | Boolean | false |
| searchable | 是否显示搜索 | Boolean | true |
| pagination | 是否显示分页 | Boolean | true |

**主要事件：**

| 事件名 | 说明 | 参数 |
|-------|-----|------|
| search | 搜索事件 | (params) |
| page-change | 分页变化 | (page) |
| selection-change | 选择变化 | (selection) |
| row-click | 行点击 | (row) |

### AddReuse（表单组件）

抽屉式表单组件，支持新增和编辑功能。

**主要属性：**

| 属性 | 说明 | 类型 | 默认值 |
|-----|-----|------|-------|
| visible | 是否显示 | Boolean | false |
| title | 标题 | String | '' |
| formData | 表单数据 | Object | {} |
| formConfig | 表单配置 | Array | [] |
| rules | 验证规则 | Object | {} |

**主要事件：**

| 事件名 | 说明 | 参数 |
|-------|-----|------|
| submit | 提交事件 | (formData) |
| cancel | 取消事件 | - |
| close | 关闭事件 | - |

### SearchForm（搜索表单）

独立的搜索表单组件。

### ImportComponent（导入组件）

Excel 导入组件。

### TagInput（标签输入）

标签输入组件。

## 💡 示例

### 完整示例

```vue
<template>
  <div class="page-container">
    <AiTableModules
      ref="tableRef"
      :data="tableData"
      :headers="tableHeaders"
      :total="total"
      :loading="loading"
      :search-config="searchConfig"
      @search="handleSearch"
      @page-change="handlePageChange"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    
    <AddReuse
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      :form-config="formConfig"
      :rules="formRules"
      @submit="handleSubmit"
      @cancel="dialogVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AiTableModules, AddReuse, validators } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 表头配置
const tableHeaders = ref([
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100, 
    formatter: (row) => row.status === 1 ? '启用' : '禁用' 
  }
])

// 搜索配置
const searchConfig = ref([
  { prop: 'name', label: '姓名', type: 'input' },
  { prop: 'age', label: '年龄', type: 'number' },
  { prop: 'status', label: '状态', type: 'select', 
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
])

// 表单配置
const dialogVisible = ref(false)
const dialogTitle = ref('新增')
const formData = reactive({})

const formConfig = ref([
  { prop: 'name', label: '姓名', type: 'input', required: true },
  { prop: 'age', label: '年龄', type: 'number', required: true },
  { prop: 'email', label: '邮箱', type: 'input', required: true },
  { prop: 'status', label: '状态', type: 'select', 
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
])

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

// 事件处理
const handleSearch = (params) => {
  console.log('搜索参数:', params)
  // 调用接口获取数据
  fetchData(params)
}

const handlePageChange = (page) => {
  console.log('页码变化:', page)
  // 调用接口获取数据
  fetchData({ ...searchParams, page })
}

const handleAdd = () => {
  dialogTitle.value = '新增'
  Object.assign(formData, {})
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  // 处理删除逻辑
}

const handleSubmit = (data) => {
  console.log('提交数据:', data)
  // 调用接口保存数据
  dialogVisible.value = false
}

const fetchData = async (params) => {
  loading.value = true
  try {
    // 调用接口获取数据
    // const res = await api.getList(params)
    // tableData.value = res.data
    // total.value = res.total
  } finally {
    loading.value = false
  }
}

// 初始化加载数据
fetchData({})
</script>
```

## 🔧 开发

```bash
# 安装依赖
npm install

# 构建
npm run build
```

## 📝 更新日志

### v1.0.0 (2026-02-04)

- 🎉 初始版本发布
- ✨ 完整的表格管理组件
- ✨ 抽屉表单组件
- ✨ 搜索、分页、导入等功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Vue 3](https://v3.vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Vite](https://vitejs.dev/)

## ❓ 常见问题

### 1. 如何自定义表格样式？

您可以通过覆盖组件的 CSS 类来自定义样式，或使用 Element Plus 的主题定制功能。

### 2. 是否支持 TypeScript？

目前正在开发 TypeScript 类型定义，即将在后续版本中提供。

### 3. 如何升级组件？

```bash
npm update ai-table-components
```

查看 [CHANGELOG](CHANGELOG.md) 了解各版本的更新内容。

### 4. 组件依赖的版本要求是什么？

- Vue: ^3.3.0+
- Element Plus: ^2.0.0+

宿主项目可以使用更高版本的 Vue 和 Element Plus。

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](issues)
- 发送邮件到：664477700@qq.com

---

Made with ❤️ by [王胜强]
