# 常见问题 (FAQ)

## 📦 安装相关

### Q1: 安装后提示找不到模块？

**A:** 确保您已经安装了所有必需的依赖：

```bash
npm install vue@^3.3.0 element-plus@^2.0.0 ai-table-components
```

### Q2: 提示 peer dependencies 警告？

**A:** 这是正常的提示，表示您需要安装 Vue 和 Element Plus。按照提示安装即可：

```bash
npm install vue element-plus
```

### Q3: 使用 pnpm 安装有问题？

**A:** pnpm 对 peer dependencies 的处理更严格，建议先安装依赖：

```bash
pnpm add vue@^3.3.0 element-plus@^2.0.0
pnpm add ai-table-components
```

## 🎨 样式相关

### Q4: 样式不显示或样式错乱？

**A:** 确保正确引入了样式文件：

```javascript
// 方式 1: 在 main.js 中全局引入
import 'element-plus/dist/index.css'
import 'ai-table-components/dist/style.css'

// 方式 2: 在组件中引入
import 'ai-table-components/dist/style.css'
```

### Q5: 样式与项目中的 Element Plus 冲突？

**A:** 组件库的样式是基于 Element Plus 的，确保：

1. Element Plus 版本在 2.0.0 以上
2. 样式引入顺序：先 Element Plus，后 ai-table-components
3. 如有冲突，可以通过 CSS 优先级覆盖

### Q6: 如何自定义组件样式？

**A:** 有几种方式：

```vue
<!-- 方式 1: 使用 deep 选择器 -->
<style scoped>
:deep(.ai-table-modules) {
  /* 自定义样式 */
}
</style>

<!-- 方式 2: 使用全局样式 -->
<style>
.ai-table-modules {
  /* 自定义样式 */
}
</style>

<!-- 方式 3: 通过 Element Plus 主题定制 -->
```

## 📊 表格组件

### Q7: 表格数据不更新？

**A:** 确保使用响应式数据：

```javascript
// ✅ 正确
const tableData = ref([])

// ❌ 错误
const tableData = []
```

### Q8: 如何自定义列内容？

**A:** 使用插槽：

```vue
<AiTableModules :data="data" :headers="headers">
  <template #default-status="{ row }">
    <el-tag>{{ row.status }}</el-tag>
  </template>
</AiTableModules>
```

### Q9: 表格高度如何设置？

**A:** 通过 `height` 或 `max-height` 属性：

```vue
<AiTableModules 
  :data="data" 
  :headers="headers"
  height="500"
  <!-- 或 -->
  max-height="600"
/>
```

### Q10: 如何禁用分页？

**A:** 设置 `pagination` 为 `false`：

```vue
<AiTableModules 
  :data="data" 
  :headers="headers"
  :pagination="false"
/>
```

### Q11: 表格列如何排序？

**A:** 在 headers 配置中添加 `sortable`：

```javascript
const headers = [
  { prop: 'age', label: '年龄', sortable: true }
]
```

### Q12: 如何实现表格数据导出？

**A:** 通过 ref 获取表格数据：

```javascript
const tableRef = ref(null)

const handleExport = () => {
  const data = tableRef.value.getTableData()
  // 处理导出逻辑
}
```

## 🔍 搜索功能

### Q13: 搜索不生效？

**A:** 检查以下几点：

1. 确保传入了 `search-config`
2. 监听了 `@search` 事件
3. 在事件处理函数中更新表格数据

```vue
<AiTableModules 
  :search-config="searchConfig"
  @search="handleSearch"
/>

<script setup>
const handleSearch = (params) => {
  // 使用 params 获取数据
}
</script>
```

### Q14: 如何设置搜索默认值？

**A:** 在 searchConfig 中设置 `defaultValue`：

```javascript
const searchConfig = [
  { 
    prop: 'status', 
    label: '状态', 
    type: 'select',
    defaultValue: 1 
  }
]
```

### Q15: 支持哪些搜索控件类型？

**A:** 支持以下类型：

- `input` - 文本输入
- `number` - 数字输入
- `select` - 下拉选择
- `date` - 日期选择
- `daterange` - 日期范围
- `cascader` - 级联选择
- 更多...

## 📝 表单组件

### Q16: 表单验证不触发？

**A:** 确保：

1. 配置了 `rules`
2. form-config 中的 `prop` 与 formData 中的字段对应
3. 使用了 `required: true` 或自定义验证规则

```javascript
const formConfig = [
  { prop: 'name', label: '姓名', type: 'input', required: true }
]

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
}
```

### Q17: 如何自定义表单项？

**A:** 使用插槽：

```vue
<AddReuse
  v-model:visible="visible"
  :form-data="formData"
  :form-config="formConfig"
>
  <template #customField="{ formData }">
    <el-form-item label="自定义">
      <div>{{ formData.customField }}</div>
    </el-form-item>
  </template>
</AddReuse>
```

### Q18: 表单字段如何实现联动？

**A:** 在 formConfig 中使用 `change` 回调：

```javascript
{
  prop: 'province',
  label: '省份',
  type: 'select',
  options: provinces,
  change: (value) => {
    // 根据省份加载城市
    loadCities(value)
  }
}
```

### Q19: 表单如何设置只读模式？

**A:** 设置 `disabled` 属性：

```vue
<AddReuse
  :form-data="formData"
  :form-config="formConfig"
  disabled
/>
```

## 🔧 验证器

### Q20: 如何使用内置验证器？

**A:** 从组件库导入：

```javascript
import { validators } from 'ai-table-components'

const formRules = {
  email: [{ validator: validators.email, trigger: 'blur' }],
  phone: [{ validator: validators.phone, trigger: 'blur' }]
}
```

### Q21: 有哪些内置验证器？

**A:** 包括：

- `email` - 邮箱
- `phone` - 手机号
- `idCard` - 身份证
- `bankCard` - 银行卡
- `singleIP` - IP 地址
- `singlePort` - 端口号
- 更多请查看 API 文档

### Q22: 如何自定义验证器？

**A:** 参考 Element Plus 的验证器格式：

```javascript
const customValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入内容'))
  } else if (value.length < 5) {
    callback(new Error('至少5个字符'))
  } else {
    callback()
  }
}

const formRules = {
  field: [{ validator: customValidator, trigger: 'blur' }]
}
```

## 🌐 兼容性

### Q23: 支持哪些浏览器？

**A:** 支持所有现代浏览器：

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

不支持 IE 浏览器。

### Q24: Vue 版本要求？

**A:** 需要 Vue 3.3.0 或更高版本。

### Q25: Element Plus 版本要求？

**A:** 需要 Element Plus 2.0.0 或更高版本。

## 🚀 性能优化

### Q26: 大数据量表格如何优化？

**A:** 建议：

1. 使用服务端分页，每次只加载当前页数据
2. 避免在表格中渲染过于复杂的内容
3. 使用虚拟滚动（未来版本支持）

### Q27: 表单字段很多时如何优化？

**A:** 建议：

1. 使用分步表单或标签页
2. 按需显示字段
3. 使用字段的 `show` 属性控制显示

## 🔨 开发相关

### Q28: 如何在本地开发中使用？

**A:** 可以使用 `npm link`：

```bash
# 在组件库目录
npm link

# 在项目目录
npm link ai-table-components
```

### Q29: TypeScript 支持？

**A:** 目前还没有 TypeScript 类型定义，计划在后续版本中添加。

### Q30: 如何贡献代码？

**A:** 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

## 📱 其他问题

### Q31: 移动端适配如何？

**A:** 组件主要针对 PC 端设计，移动端支持有限。建议：

1. 使用响应式布局
2. 隐藏部分列
3. 调整表格尺寸

### Q32: 如何获得帮助？

**A:** 多种方式：

1. 查看文档: [GUIDE.md](./docs/GUIDE.md)
2. 查看 API: [API.md](./docs/API.md)
3. 提交 Issue
4. 加入社区讨论

### Q33: 发现 Bug 如何报告？

**A:** 在 GitHub 上提交 Issue，包含：

1. 问题描述
2. 复现步骤
3. 期望结果
4. 实际结果
5. 环境信息

### Q34: 可以商用吗？

**A:** 可以！本项目采用 MIT 许可证，可以免费商用。

### Q35: 未来有哪些计划？

**A:** 查看 [CHANGELOG.md](./CHANGELOG.md) 中的"未来规划"部分。

---

## 💡 没有找到答案？

如果以上没有解决您的问题：

1. 查看 [完整文档](./docs/)
2. 搜索 [已有 Issues](../../issues)
3. 创建 [新 Issue](../../issues/new)

我们会尽快回复！
