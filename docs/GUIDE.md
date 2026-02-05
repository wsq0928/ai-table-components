# 使用指南

本指南将帮助您快速上手 AI Table Components 组件库。

## 📦 安装

### 1. 安装组件库

```bash
npm install ai-table-components
```

### 2. 安装依赖

确保您的项目中已安装必需的依赖：

```bash
npm install vue@^3.3.0 element-plus@^2.0.0
```

### 3. 安装 Element Plus 样式

```bash
# Element Plus 样式会自动随包安装
```

## 🚀 快速开始

### 方式一：完整引入（适合小型项目）

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import AiTableComponents from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(AiTableComponents)
app.mount('#app')
```

### 方式二：按需引入（推荐）

```vue
<template>
  <AiTableModules :data="data" :headers="headers" />
</template>

<script setup>
import { AiTableModules } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const data = [/* ... */]
const headers = [/* ... */]
</script>
```

## 📋 基础示例

### 1. 简单表格

最基础的表格用法，只需要传入数据和表头配置。

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="tableHeaders"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
])

const tableHeaders = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'email', label: '邮箱' }
])
</script>
```

### 2. 带搜索的表格

添加搜索功能，支持多种搜索类型。

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="tableHeaders"
    :search-config="searchConfig"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'

const tableData = ref([])

const tableHeaders = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'status', label: '状态' }
])

const searchConfig = ref([
  { 
    prop: 'name', 
    label: '姓名', 
    type: 'input',
    placeholder: '请输入姓名'
  },
  { 
    prop: 'age', 
    label: '年龄', 
    type: 'number' 
  },
  { 
    prop: 'status', 
    label: '状态', 
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
])

const handleSearch = (params) => {
  console.log('搜索参数:', params)
  // 调用接口获取数据
}
</script>
```

### 3. 带分页的表格

添加分页功能。

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="tableHeaders"
    :total="total"
    :current-page="currentPage"
    :page-size="pageSize"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'

const tableData = ref([])
const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(10)

const handlePageChange = (page) => {
  currentPage.value = page
  fetchData()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  fetchData()
}

const fetchData = async () => {
  // 调用接口获取数据
}
</script>
```

### 4. 自定义列内容

使用插槽自定义列的显示内容。

```vue
<template>
  <AiTableModules 
    :data="tableData" 
    :headers="tableHeaders"
  >
    <!-- 自定义状态列 -->
    <template #default-status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
    
    <!-- 自定义操作列 -->
    <template #operation="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)">
        编辑
      </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)">
        删除
      </el-button>
    </template>
  </AiTableModules>
</template>
```

### 5. 表单组件使用

使用 AddReuse 组件创建新增/编辑表单。

```vue
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    
    <AddReuse
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      :form-config="formConfig"
      :rules="formRules"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AddReuse, validators } from 'ai-table-components'

const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')

const formData = reactive({
  name: '',
  age: null,
  email: ''
})

const formConfig = ref([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    required: true,
    placeholder: '请输入姓名'
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'number',
    required: true,
    min: 0,
    max: 150
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    required: true
  }
])

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validators.email, trigger: 'blur' }
  ]
}

const handleAdd = () => {
  dialogVisible.value = true
}

const handleSubmit = async (data) => {
  console.log('提交数据:', data)
  // 调用接口保存
  dialogVisible.value = false
}
</script>
```

## 🎯 进阶用法

### 1. 使用验证器

组件库提供了丰富的验证器。

```javascript
import { validators } from 'ai-table-components'

const formRules = {
  phone: [{ validator: validators.phone, trigger: 'blur' }],
  email: [{ validator: validators.email, trigger: 'blur' }],
  idCard: [{ validator: validators.idCard, trigger: 'blur' }],
  ipList: [{ validator: validators.ipList, trigger: 'blur' }],
  portList: [{ validator: validators.portList, trigger: 'blur' }]
}
```

### 2. 表格数据导出

```vue
<template>
  <AiTableModules 
    ref="tableRef"
    :data="tableData" 
    :headers="tableHeaders"
  >
    <template #toolbar>
      <el-button @click="handleExport">导出</el-button>
    </template>
  </AiTableModules>
</template>

<script setup>
const handleExport = () => {
  // 导出逻辑
  const data = tableRef.value.getTableData()
  // 处理导出
}
</script>
```

### 3. 表格数据导入

```vue
<template>
  <div>
    <ImportComponent @import="handleImport" />
  </div>
</template>

<script setup>
import { ImportComponent } from 'ai-table-components'

const handleImport = (data) => {
  console.log('导入的数据:', data)
  // 处理导入的数据
}
</script>
```

### 4. 动态表单配置

根据条件动态调整表单配置。

```javascript
const formConfig = computed(() => {
  const config = [
    { prop: 'name', label: '姓名', type: 'input', required: true },
    { prop: 'type', label: '类型', type: 'select', required: true, options: typeOptions.value }
  ]
  
  // 根据类型动态添加字段
  if (formData.type === 1) {
    config.push({
      prop: 'extra',
      label: '额外信息',
      type: 'textarea',
      required: true
    })
  }
  
  return config
})
```

### 5. 表单联动

实现字段之间的联动效果。

```javascript
const formConfig = ref([
  {
    prop: 'province',
    label: '省份',
    type: 'select',
    options: provinces,
    change: async (value) => {
      // 加载城市数据
      const cities = await loadCities(value)
      // 更新城市选项
      const cityConfig = formConfig.value.find(item => item.prop === 'city')
      if (cityConfig) {
        cityConfig.options = cities
      }
      // 清空城市选择
      formData.city = ''
    }
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    options: []
  }
])
```

## 🔧 配置说明

### 表头配置（Headers）

```javascript
{
  prop: 'name',              // 字段名（必填）
  label: '姓名',             // 列标题（必填）
  width: 120,                // 列宽度
  minWidth: 100,             // 最小列宽
  fixed: 'left',             // 固定列：left/right
  sortable: true,            // 是否可排序
  align: 'center',           // 对齐方式
  showOverflowTooltip: true, // 内容过长显示 tooltip
  formatter: (row) => {},    // 格式化函数
  hide: false                // 是否隐藏
}
```

### 搜索配置（SearchConfig）

```javascript
{
  prop: 'name',              // 字段名（必填）
  label: '姓名',             // 标签（必填）
  type: 'input',             // 控件类型（必填）
  placeholder: '请输入',     // 占位文本
  clearable: true,           // 是否可清空
  options: [],               // 选项数据（select/radio/checkbox）
  multiple: false            // 是否多选（select）
}
```

### 表单配置（FormConfig）

```javascript
{
  prop: 'name',              // 字段名（必填）
  label: '姓名',             // 标签（必填）
  type: 'input',             // 控件类型（必填）
  required: false,           // 是否必填
  placeholder: '请输入',     // 占位文本
  disabled: false,           // 是否禁用
  clearable: true,           // 是否可清空
  maxlength: 100,            // 最大长度（input）
  rows: 3,                   // 行数（textarea）
  min: 0,                    // 最小值（number）
  max: 100,                  // 最大值（number）
  options: [],               // 选项（select/radio/checkbox）
  span: 24                   // 栅格占据列数
}
```

## 💡 最佳实践

### 1. 接口集成

```javascript
// api.js
import request from '@/utils/request'

export const getUserList = (params) => {
  return request({
    url: '/api/users',
    method: 'get',
    params
  })
}

// 在组件中使用
const handleSearch = async (params) => {
  loading.value = true
  try {
    const { data, total: totalCount } = await getUserList({
      ...params,
      page: currentPage.value,
      size: pageSize.value
    })
    tableData.value = data
    total.value = totalCount
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}
```

### 2. 错误处理

```javascript
const handleSubmit = async (data) => {
  try {
    await api.save(data)
    ElMessage.success('保存成功')
    dialogVisible.value = false
    refresh()
  } catch (error) {
    ElMessage.error(error.message || '保存失败')
  }
}
```

### 3. 权限控制

```javascript
const operationButtons = computed(() => {
  const buttons = []
  
  if (hasPermission('edit')) {
    buttons.push({
      label: '编辑',
      type: 'primary',
      handler: handleEdit
    })
  }
  
  if (hasPermission('delete')) {
    buttons.push({
      label: '删除',
      type: 'danger',
      handler: handleDelete
    })
  }
  
  return buttons
})
```

## ❓ 常见问题

### 1. 样式不生效？

确保引入了样式文件：

```javascript
import 'ai-table-components/dist/style.css'
```

### 2. Element Plus 组件不显示？

确保安装并引入了 Element Plus：

```javascript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```

### 3. 表格数据不刷新？

确保使用 `ref` 或 `reactive` 包装数据：

```javascript
const tableData = ref([])  // ✅ 正确
// const tableData = []     // ❌ 错误
```

### 4. 表单验证不触发？

确保表单项配置了 `prop` 和对应的验证规则：

```javascript
const formConfig = [
  { prop: 'name', label: '姓名', type: 'input', required: true }
]

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
}
```

## 📚 更多资源

- [API 文档](./API.md)
- [GitHub 仓库](#)
- [在线演示](#)
- [问题反馈](#)
