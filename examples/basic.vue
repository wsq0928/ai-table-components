<template>
  <div class="example-container">
    <h2>基础示例 - AI Table Components</h2>
    
    <!-- 示例 1: 简单表格 -->
    <div class="example-section">
      <h3>1. 简单表格</h3>
      <AiTableModules 
        :data="simpleTableData" 
        :headers="simpleHeaders"
        :pagination="false"
        :searchable="false"
      />
    </div>

    <!-- 示例 2: 带搜索和分页的表格 -->
    <div class="example-section">
      <h3>2. 带搜索和分页的表格</h3>
      <AiTableModules 
        :data="tableData" 
        :headers="tableHeaders"
        :search-config="searchConfig"
        :total="total"
        :loading="loading"
        @search="handleSearch"
        @page-change="handlePageChange"
      />
    </div>

    <!-- 示例 3: 表单组件 -->
    <div class="example-section">
      <h3>3. 表单组件</h3>
      <el-button type="primary" @click="showForm">打开表单</el-button>
      
      <AddReuse
        v-model:visible="dialogVisible"
        title="用户信息"
        :form-data="formData"
        :form-config="formConfig"
        :rules="formRules"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AiTableModules, AddReuse, validators } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

// ========== 示例 1: 简单表格 ==========
const simpleTableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
])

const simpleHeaders = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'email', label: '邮箱' }
])

// ========== 示例 2: 带搜索和分页的表格 ==========
const tableData = ref([
  { id: 1, name: '张三', age: 25, status: 1, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, status: 0, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, status: 1, email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 35, status: 1, email: 'zhaoliu@example.com' },
  { id: 5, name: '孙七', age: 26, status: 0, email: 'sunqi@example.com' }
])

const tableHeaders = ref([
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'email', label: '邮箱', minWidth: 200 }
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
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
])

const total = ref(50)
const loading = ref(false)

const handleSearch = (params) => {
  console.log('搜索参数:', params)
  loading.value = true
  setTimeout(() => {
    // 模拟接口请求
    loading.value = false
  }, 500)
}

const handlePageChange = (page) => {
  console.log('页码变化:', page)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// ========== 示例 3: 表单组件 ==========
const dialogVisible = ref(false)

const formData = reactive({
  name: '',
  age: null,
  email: '',
  phone: '',
  status: 1
})

const formConfig = ref([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    required: true,
    placeholder: '请输入姓名',
    clearable: true
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
    prop: 'phone',
    label: '手机号',
    type: 'input',
    required: true,
    placeholder: '请输入手机号'
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
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validators.email, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validators.phone, trigger: 'blur' }
  ]
}

const showForm = () => {
  dialogVisible.value = true
}

const handleSubmit = (data) => {
  console.log('提交数据:', data)
  ElMessage.success('提交成功！')
  dialogVisible.value = false
}
</script>

<style scoped>
.example-container {
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #303133;
}
</style>
