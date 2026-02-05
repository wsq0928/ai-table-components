# API 文档

## AiTableModules 组件

主表格组件，提供完整的列表管理功能。

### 属性（Props）

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| data | 表格数据 | Array | [] | 是 |
| headers | 表头配置 | Array | [] | 是 |
| total | 数据总条数 | Number | 0 | 否 |
| loading | 加载状态 | Boolean | false | 否 |
| height | 表格高度 | String/Number | 'auto' | 否 |
| maxHeight | 表格最大高度 | String/Number | - | 否 |
| stripe | 是否为斑马纹表格 | Boolean | true | 否 |
| border | 是否带有纵向边框 | Boolean | false | 否 |
| size | 表格尺寸 | String | 'default' | 否 |
| showSelection | 是否显示多选列 | Boolean | true | 否 |
| showIndex | 是否显示序号列 | Boolean | true | 否 |
| indexLabel | 序号列的标题 | String | '序号' | 否 |
| showOperation | 是否显示操作列 | Boolean | true | 否 |
| operationLabel | 操作列标题 | String | '操作' | 否 |
| operationWidth | 操作列宽度 | Number | 150 | 否 |
| operationButtons | 操作列按钮配置 | Array | [] | 否 |
| searchable | 是否显示搜索表单 | Boolean | true | 否 |
| searchConfig | 搜索表单配置 | Array | [] | 否 |
| pagination | 是否显示分页 | Boolean | true | 否 |
| pageSize | 每页显示条数 | Number | 10 | 否 |
| pageSizes | 每页显示个数选择器的选项设置 | Array | [10, 20, 50, 100] | 否 |
| currentPage | 当前页码 | Number | 1 | 否 |
| paginationLayout | 分页组件布局 | String | 'total, sizes, prev, pager, next, jumper' | 否 |

#### Headers 配置说明

Headers 数组中每个对象的配置项：

```javascript
{
  prop: 'name',           // 字段名（必填）
  label: '姓名',          // 列标题（必填）
  width: 120,             // 列宽度（可选）
  minWidth: 100,          // 最小列宽（可选）
  fixed: 'left',          // 固定列：left/right（可选）
  sortable: true,         // 是否可排序（可选）
  align: 'center',        // 对齐方式：left/center/right（可选）
  showOverflowTooltip: true, // 内容过长是否显示 tooltip（可选）
  formatter: (row, column, cellValue, index) => { // 格式化函数（可选）
    return cellValue
  },
  render: (h, { row, column, $index }) => { // 自定义渲染（可选）
    return h('span', row[column.property])
  },
  type: 'tag',            // 特殊类型：tag/image/link/date（可选）
  filters: [],            // 筛选配置（可选）
  filterMethod: Function, // 筛选方法（可选）
  headerSlot: 'header-slot-name', // 表头插槽名（可选）
  defaultSlot: 'default-slot-name', // 内容插槽名（可选）
  hide: false,            // 是否隐藏（可选）
  resizable: true         // 是否可调整列宽（可选）
}
```

#### SearchConfig 配置说明

SearchConfig 数组中每个对象的配置项：

```javascript
{
  prop: 'name',           // 字段名（必填）
  label: '姓名',          // 标签（必填）
  type: 'input',          // 控件类型（必填）
  placeholder: '请输入',  // 占位文本（可选）
  defaultValue: '',       // 默认值（可选）
  clearable: true,        // 是否可清空（可选）
  options: [],            // 选项数据（select/checkbox/radio 需要）
  dateType: 'daterange',  // 日期类型（type 为 date 时）
  format: 'YYYY-MM-DD',   // 日期格式（type 为 date 时）
  multiple: false,        // 是否多选（select 时）
  props: {                // 级联选择器配置（type 为 cascader 时）
    value: 'value',
    label: 'label',
    children: 'children'
  }
}
```

支持的搜索控件类型：
- `input` - 文本输入框
- `number` - 数字输入框
- `select` - 下拉选择
- `date` - 日期选择
- `daterange` - 日期范围
- `time` - 时间选择
- `timerange` - 时间范围
- `cascader` - 级联选择器
- `radio` - 单选框
- `checkbox` - 复选框

#### OperationButtons 配置说明

OperationButtons 数组中每个对象的配置项：

```javascript
{
  label: '编辑',          // 按钮文字（必填）
  type: 'primary',        // 按钮类型（可选）
  icon: 'Edit',           // 图标（可选）
  show: (row) => true,    // 是否显示函数（可选）
  disabled: (row) => false, // 是否禁用函数（可选）
  handler: (row, index) => {} // 点击处理函数（必填）
}
```

### 事件（Events）

| 事件名 | 说明 | 参数 |
|--------|------|------|
| search | 搜索事件 | (searchParams) - 搜索参数对象 |
| reset | 重置搜索事件 | - |
| page-change | 分页页码变化 | (page) - 当前页码 |
| size-change | 分页大小变化 | (size) - 每页条数 |
| selection-change | 多选变化 | (selection) - 选中的行数据数组 |
| row-click | 行点击事件 | (row, column, event) |
| row-dblclick | 行双击事件 | (row, column, event) |
| cell-click | 单元格点击 | (row, column, cell, event) |
| sort-change | 排序变化 | ({ column, prop, order }) |
| filter-change | 筛选变化 | (filters) |
| add | 点击新增按钮 | - |
| edit | 点击编辑按钮 | (row) |
| delete | 点击删除按钮 | (row) |
| export | 点击导出按钮 | - |
| import | 点击导入按钮 | - |
| refresh | 点击刷新按钮 | - |

### 方法（Methods）

通过 `ref` 调用组件实例方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getTableData | 获取表格数据 | - |
| getSelection | 获取多选的行 | - |
| clearSelection | 清空多选 | - |
| toggleRowSelection | 切换某一行的选中状态 | (row, selected) |
| toggleAllSelection | 切换所有行的选中状态 | - |
| setCurrentRow | 设置当前行 | (row) |
| clearSort | 清空排序状态 | - |
| clearFilter | 清空筛选条件 | (columnKey) |
| doLayout | 重新布局表格 | - |
| sort | 手动排序 | (prop, order) |
| search | 触发搜索 | (params) |
| reset | 重置搜索 | - |
| refresh | 刷新表格 | - |

### 插槽（Slots）

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| toolbar | 工具栏插槽（表格上方） | - |
| search | 搜索区域插槽 | - |
| header-{prop} | 表头插槽 | { column, $index } |
| default-{prop} | 单元格插槽 | { row, column, $index } |
| operation | 操作列插槽 | { row, $index } |
| append | 表格底部内容 | - |
| empty | 空数据时的内容 | - |

### 使用示例

```vue
<template>
  <AiTableModules
    ref="tableRef"
    :data="tableData"
    :headers="tableHeaders"
    :total="total"
    :loading="loading"
    :search-config="searchConfig"
    :operation-buttons="operationButtons"
    @search="handleSearch"
    @page-change="handlePageChange"
    @selection-change="handleSelectionChange"
  >
    <!-- 工具栏插槽 -->
    <template #toolbar>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="handleExport">导出</el-button>
    </template>
    
    <!-- 自定义列插槽 -->
    <template #default-status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </AiTableModules>
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'

const tableRef = ref(null)

// 使用组件方法
const getSelectedRows = () => {
  const selection = tableRef.value.getSelection()
  console.log('选中的行:', selection)
}

const refreshTable = () => {
  tableRef.value.refresh()
}
</script>
```

---

## AddReuse 组件

抽屉式表单组件，支持新增和编辑功能。

### 属性（Props）

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| visible / v-model | 是否显示抽屉 | Boolean | false | 是 |
| title | 抽屉标题 | String | '' | 否 |
| formData | 表单数据对象 | Object | {} | 是 |
| formConfig | 表单配置数组 | Array | [] | 是 |
| rules | 表单验证规则 | Object | {} | 否 |
| labelWidth | 标签宽度 | String | '100px' | 否 |
| labelPosition | 标签位置 | String | 'right' | 否 |
| size | 表单尺寸 | String | 'default' | 否 |
| disabled | 是否禁用 | Boolean | false | 否 |
| loading | 提交加载状态 | Boolean | false | 否 |
| width | 抽屉宽度 | String/Number | '50%' | 否 |
| direction | 抽屉方向 | String | 'rtl' | 否 |
| appendToBody | 是否插入至 body | Boolean | true | 否 |
| closeOnClickModal | 点击遮罩是否关闭 | Boolean | false | 否 |
| showClose | 是否显示关闭按钮 | Boolean | true | 否 |

### FormConfig 配置说明

FormConfig 数组中每个对象的配置项：

```javascript
{
  prop: 'name',           // 字段名（必填）
  label: '姓名',          // 标签（必填）
  type: 'input',          // 控件类型（必填）
  placeholder: '请输入',  // 占位文本（可选）
  defaultValue: '',       // 默认值（可选）
  required: false,        // 是否必填（可选）
  disabled: false,        // 是否禁用（可选）
  readonly: false,        // 是否只读（可选）
  clearable: true,        // 是否可清空（可选）
  show: true,             // 是否显示（可选）
  span: 24,               // 栅格占据列数（可选）
  offset: 0,              // 栅格左侧间隔（可选）
  
  // 不同类型特有的属性
  maxlength: 100,         // input 最大长度
  minlength: 0,           // input 最小长度
  showWordLimit: false,   // input 是否显示字数统计
  rows: 3,                // textarea 行数
  min: 0,                 // number 最小值
  max: 100,               // number 最大值
  precision: 2,           // number 精度
  step: 1,                // number 步长
  options: [],            // select/radio/checkbox 选项
  multiple: false,        // select 是否多选
  filterable: false,      // select 是否可搜索
  remote: false,          // select 是否远程搜索
  remoteMethod: Function, // select 远程搜索方法
  format: 'YYYY-MM-DD',   // date 显示格式
  valueFormat: 'YYYY-MM-DD', // date 值格式
  dateType: 'date',       // date 类型
  accept: '',             // upload 接受的文件类型
  action: '',             // upload 上传地址
  limit: 1,               // upload 最大上传数量
  fileList: [],           // upload 文件列表
  
  // 高级配置
  rules: [],              // 单独的验证规则
  labelWidth: '100px',    // 标签宽度
  tip: '',                // 提示文字
  change: Function,       // 值变化回调
  blur: Function,         // 失焦回调
  focus: Function,        // 聚焦回调
  render: Function,       // 自定义渲染函数
  slotName: '',           // 自定义插槽名
}
```

支持的表单控件类型：
- `input` - 文本输入框
- `textarea` - 多行文本
- `number` - 数字输入框
- `password` - 密码输入框
- `select` - 下拉选择
- `date` - 日期选择
- `time` - 时间选择
- `datetime` - 日期时间选择
- `daterange` - 日期范围
- `radio` - 单选框
- `checkbox` - 复选框
- `switch` - 开关
- `slider` - 滑块
- `rate` - 评分
- `color` - 颜色选择
- `cascader` - 级联选择器
- `upload` - 文件上传
- `editor` - 富文本编辑器
- `custom` - 自定义（使用 slot）

### 事件（Events）

| 事件名 | 说明 | 参数 |
|--------|------|------|
| submit | 提交表单（验证通过） | (formData) - 表单数据对象 |
| cancel | 取消/关闭 | - |
| close | 抽屉关闭后回调 | - |
| open | 抽屉打开后回调 | - |
| validate | 表单验证回调 | (valid, invalidFields) |

### 方法（Methods）

| 方法名 | 说明 | 参数 |
|--------|------|------|
| validate | 验证整个表单 | (callback) |
| validateField | 验证指定字段 | (props, callback) |
| resetFields | 重置表单 | - |
| clearValidate | 清除验证 | (props) |
| submit | 提交表单 | - |
| cancel | 取消/关闭 | - |

### 插槽（Slots）

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| header | 自定义头部 | - |
| footer | 自定义底部 | - |
| {prop} | 自定义表单项（prop 为字段名） | { formData, config } |

### 使用示例

```vue
<template>
  <AddReuse
    v-model:visible="dialogVisible"
    :title="dialogTitle"
    :form-data="formData"
    :form-config="formConfig"
    :rules="formRules"
    :loading="submitLoading"
    @submit="handleSubmit"
    @cancel="handleCancel"
  >
    <!-- 自定义表单项插槽 -->
    <template #customField="{ formData, config }">
      <div>自定义内容：{{ formData.customField }}</div>
    </template>
  </AddReuse>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AddReuse } from 'ai-table-components'

const dialogVisible = ref(false)
const dialogTitle = ref('新增')
const submitLoading = ref(false)

const formData = reactive({
  name: '',
  age: null,
  email: '',
  status: 1
})

const formConfig = ref([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    required: true,
    placeholder: '请输入姓名',
    clearable: true,
    maxlength: 50,
    showWordLimit: true
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'number',
    required: true,
    min: 0,
    max: 150,
    placeholder: '请输入年龄'
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    required: true,
    placeholder: '请输入邮箱'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'radio',
    required: true,
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
])

const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const handleSubmit = async (data) => {
  submitLoading.value = true
  try {
    // 调用接口保存数据
    await api.save(data)
    ElMessage.success('保存成功')
    dialogVisible.value = false
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    submitLoading.value = false
  }
}

const handleCancel = () => {
  dialogVisible.value = false
}
</script>
```

---

## 其他组件

### SearchForm - 搜索表单组件

独立的搜索表单组件，可单独使用。

### ImportComponent - 导入组件

Excel 数据导入组件，支持文件上传和数据解析。

### TagInput - 标签输入组件

支持输入和管理多个标签。

### SettingsHeaders - 表头设置组件

用于配置表格列的显示/隐藏、排序等。

### ActionButtons - 操作按钮组件

批量操作按钮组件。

### MultiTooltips - 多工具提示组件

多标签工具提示展示组件。

### SimpleDetail - 简单详情组件

简单的详情信息展示组件。

---

## 工具函数

### validators

提供常用的表单验证器。

```javascript
import { validators } from 'ai-table-components'

// 使用示例
const formRules = {
  phone: [{ validator: validators.phone, trigger: 'blur' }],
  idCard: [{ validator: validators.idCard, trigger: 'blur' }],
  url: [{ validator: validators.url, trigger: 'blur' }]
}
```

可用的验证器：
- `validators.phone` - 手机号验证
- `validators.email` - 邮箱验证
- `validators.idCard` - 身份证验证
- `validators.url` - URL 验证
- `validators.number` - 数字验证
- `validators.integer` - 整数验证
- `validators.positiveNumber` - 正数验证
- `validators.chinese` - 中文验证

---

## 类型定义（TypeScript）

> 注：TypeScript 类型定义正在开发中，将在后续版本提供。

---

## 常见问题

### 如何自定义列内容？

使用插槽：

```vue
<AiTableModules :data="data" :headers="headers">
  <template #default-status="{ row }">
    <el-tag>{{ row.status }}</el-tag>
  </template>
</AiTableModules>
```

### 如何自定义操作按钮？

使用 `operation-buttons` 属性或操作列插槽。

### 表单如何实现联动？

在 `formConfig` 中使用 `change` 回调：

```javascript
{
  prop: 'province',
  label: '省份',
  type: 'select',
  options: provinces,
  change: (value) => {
    // 根据省份加载城市数据
    loadCities(value)
  }
}
```

### 如何实现远程搜索？

```javascript
{
  prop: 'user',
  label: '用户',
  type: 'select',
  remote: true,
  filterable: true,
  remoteMethod: async (query) => {
    const users = await api.searchUsers(query)
    return users
  }
}
```
