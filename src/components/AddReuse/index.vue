<template>
  <el-drawer
    v-model="drawerVisible"
    :title="drawerTitle"
    :size="size"
    :direction="direction"
    :before-close="handleCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      :validate-on-rule-change="false"
      label-width="100px"
      size="default"
    >
      <!-- 动态渲染表单控件 -->
      <div
        v-for="config in formConfig"
        :key="config.prop"
        class="form-item-wrapper"
        v-show="isFieldVisible(config)"
      >
        <!-- 插槽类型 -->
        <slot
          v-if="config.slot"
          :name="config.prop"
          :form-data="formData"
          :mode="mode"
          :config="config"
        >
          <el-form-item :label="config.label || config.prop">
            <div class="slot-placeholder">插槽: {{ config.prop }}</div>
          </el-form-item>
        </slot>

        <!-- 全行插槽类型 -->
        <slot
          v-else-if="config.entire"
          :name="config.prop"
          :form-data="formData"
          :mode="mode"
          :config="config"
        >
          <div class="full-row-slot">
            <div class="slot-placeholder">全行插槽: {{ config.prop }}</div>
          </div>
        </slot>

        <!-- 普通表单控件 -->
        <el-form-item
          v-else
          :label="config.label"
          :prop="config.prop"
          :required="config.required"
        >
          <!-- input - 单行文本输入 -->
          <el-input
            v-if="config.type === 'input'"
            v-model="formData[config.prop]"
            v-bind="getCommonProps(config)"
            :maxlength="config.maxlength"
            :show-word-limit="config.showWordLimit"
          />

          <!-- textarea - 多行文本输入 -->
          <el-input
            v-else-if="config.type === 'textarea'"
            v-model="formData[config.prop]"
            type="textarea"
            :rows="config.rows || 4"
            v-bind="getCommonProps(config)"
            :maxlength="config.maxlength"
            :show-word-limit="config.showWordLimit"
          />

          <!-- input-number - 数字输入 -->
          <el-input-number
            v-else-if="config.type === 'input-number'"
            v-model="formData[config.prop]"
            :min="config.min"
            :max="config.max"
            :controls="false"
            v-bind="getCommonProps(config)"
            style="width: 100%"
          />

          <!-- select - 下拉单选 -->
          <el-select
            v-else-if="config.type === 'select'"
            v-model="formData[config.prop]"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :multiple="false"
            :filterable="config.filterable"
            :remote="config.remote"
            :remote-method="config.remoteMethod"
            :loading="config.loading"
            v-bind="getCommonProps(config)"
          >
            <el-option
              v-for="option in config.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </el-select>

          <!-- select-multiple - 下拉多选 -->
          <el-select
            v-else-if="config.type === 'select-multiple'"
            v-model="formData[config.prop]"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            multiple
            :filterable="config.filterable"
            :remote="config.remote"
            :remote-method="config.remoteMethod"
            :loading="config.loading"
            :collapse-tags="config.collapseTags"
            :collapse-tags-tooltip="config.collapseTagsTooltip"
            v-bind="getCommonProps(config)"
          >
            <el-option
              v-for="option in config.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </el-select>

          <!-- radio - 单选框组 -->
          <el-radio-group
            v-else-if="config.type === 'radio'"
            v-model="formData[config.prop]"
            :disabled="config.disabled"
          >
            <el-radio
              v-for="option in config.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-radio>
          </el-radio-group>

          <!-- checkbox - 多选框组 -->
          <el-checkbox-group
            v-else-if="config.type === 'checkbox'"
            v-model="formData[config.prop]"
            :disabled="config.disabled"
          >
            <el-checkbox
              v-for="option in config.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>

          <!-- date-picker - 日期选择 -->
          <el-date-picker
            v-else-if="config.type === 'date-picker'"
            v-model="formData[config.prop]"
            :type="config.dateType || 'date'"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :format="config.format || 'YYYY-MM-DD'"
            :value-format="config.valueFormat || 'YYYY-MM-DD'"
            :picker-options="config.pickerOptions"
            :range-separator="config.rangeSeparator"
            :start-placeholder="config.startPlaceholder"
            :end-placeholder="config.endPlaceholder"
            v-bind="getCommonProps(config)"
          />

          <!-- time-picker - 时间选择 -->
          <el-time-picker
            v-else-if="config.type === 'time-picker'"
            v-model="formData[config.prop]"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :format="config.format || 'HH:mm:ss'"
            :value-format="config.valueFormat || 'HH:mm:ss'"
            :picker-options="config.pickerOptions"
            :is-range="config.isRange"
            :range-separator="config.rangeSeparator"
            :start-placeholder="config.startPlaceholder"
            :end-placeholder="config.endPlaceholder"
            v-bind="getCommonProps(config)"
          />

          <!-- datetime-picker - 日期时间选择 -->
          <el-date-picker
            v-else-if="config.type === 'datetime-picker'"
            v-model="formData[config.prop]"
            type="datetime"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :format="config.format || 'YYYY-MM-DD HH:mm:ss'"
            :value-format="config.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
            :picker-options="config.pickerOptions"
            v-bind="getCommonProps(config)"
          />

          <!-- cascader - 级联选择 -->
          <el-cascader
            v-else-if="config.type === 'cascader'"
            v-model="formData[config.prop]"
            :options="config.options"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :props="config.cascaderProps"
            :filterable="config.filterable"
            :clearable="config.clearable !== false"
            :show-all-levels="config.showAllLevels"
            :collapse-tags="config.collapseTags"
            :collapse-tags-tooltip="config.collapseTagsTooltip"
            v-bind="getCommonProps(config)"
            @change="handleCascaderChange"
          />

          <!-- tree-select - 树形选择 -->
          <el-tree-select
            v-else-if="config.type === 'tree-select'"
            v-model="formData[config.prop]"
            :data="config.treeData"
            :placeholder="config.placeholder || `请选择${config.label}`"
            :disabled="config.disabled"
            :multiple="config.multiple"
            :filterable="config.filterable"
            :check-strictly="config.checkStrictly"
            :render-after-expand="config.renderAfterExpand"
            :clearable="config.clearable !== false"
            :collapse-tags="config.collapseTags"
            :collapse-tags-tooltip="config.collapseTagsTooltip"
            :props="config.treeProps"
            v-bind="getCommonProps(config)"
          />

          <!-- transfer - 穿梭框 -->
          <el-transfer
            v-else-if="config.type === 'transfer'"
            v-model="formData[config.prop]"
            :data="config.transferData"
            :titles="config.titles || ['可选', '已选']"
            :button-texts="config.buttonTexts || ['', '']"
            filter-placeholder="请输入搜索"
            :filterable="config.filterable"
            :filter-method="config.filterMethod"
            :target-order="config.targetOrder"
            :props="config.transferProps"
          >
            <template #left-empty>
              <el-empty
                :image-size="60"
                description="空"
              />
            </template>
            <template #right-empty>
              <el-empty
                :image-size="60"
                description="空"
              />
            </template>
          </el-transfer>

          <!-- upload - 文件上传 -->
          <el-upload
            v-else-if="config.type === 'upload'"
            v-model:file-list="formData[config.prop]"
            :action="config.uploadProps?.action || ''"
            :headers="config.uploadProps?.headers"
            :multiple="config.uploadProps?.multiple"
            :limit="config.uploadProps?.limit"
            :accept="config.uploadProps?.accept"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-remove="handleUploadRemove"
            :before-upload="config.uploadProps?.beforeUpload"
            :disabled="config.disabled"
            :drag="config.uploadProps?.drag"
            :list-type="config.uploadProps?.listType || 'text'"
            :show-file-list="config.uploadProps?.showFileList !== false"
          >
            <template v-if="config.uploadProps?.drag">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将文件拖到此处，或 <em>点击上传</em>
              </div>
            </template>
            <template v-else>
              <el-button
                type="primary"
                :loading="config.uploadProps?.uploading"
              >
                {{ config.uploadProps?.buttonText || '选择文件' }}
              </el-button>
            </template>
          </el-upload>

          <!-- switch - 开关控件 -->
          <el-switch
            v-else-if="config.type === 'switch'"
            v-model="formData[config.prop]"
            :disabled="config.disabled"
            :active-text="config.activeText"
            :inactive-text="config.inactiveText"
            :active-value="config.activeValue !== undefined ? config.activeValue : true"
            :inactive-value="config.inactiveValue !== undefined ? config.inactiveValue : false"
          />

          <!-- composite-input - 复合输入框 -->
          <el-input
            v-else-if="config.type === 'composite-input'"
            v-model="formData[config.prop]"
            v-bind="getCommonProps(config)"
            :maxlength="config.maxlength"
            :show-word-limit="config.showWordLimit"
          >
            <template
              v-if="config.appendText"
              #append
            >
              <span class="append-text">{{ config.appendText }}</span>
            </template>
            <template
              v-if="config.prependText"
              #prepend
            >
              <span class="prepend-text">{{ config.prependText }}</span>
            </template>
          </el-input>

          <!-- 添加tooltip提示 -->
          <template
            v-if="config.tooltip"
            #label
          >
            <span>
              {{ config.label }}
              <el-tooltip
                :content="config.tooltip"
                placement="top"
              >
                <el-icon class="tooltip-icon">
                  <InfoFilled />
                </el-icon>
              </el-tooltip>
            </span>
          </template>
        </el-form-item>
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
        <el-button
          type="primary"
          :loading="submitting"
          @click="handleConfirm"
        >
          {{ confirmButtonText }}
        </el-button>
      </span>
    </template>
  </el-drawer>
</template>


<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
  ElMessage,
  ElLoading
} from 'element-plus'
import {
  UploadFilled,
  InfoFilled
} from '@element-plus/icons-vue'
import { builtInRules, getBuiltInRule } from './rulers.js'

// Props定义
const props = defineProps({
  // 表单配置数组
  formConfig: {
    type: Array,
    default: () => []
  },
  // 表单数据对象
  formData: {
    type: Object,
    default: () => ({})
  },
  // 抽屉显示状态
  visible: {
    type: Boolean,
    default: false
  },
  // 模式：add-新增，edit-编辑
  mode: {
    type: String,
    default: 'add',
    validator: (value) => ['add', 'edit'].includes(value)
  },
  // 抽屉标题（可选，不传则根据mode自动生成）
  title: {
    type: String,
    default: ''
  },
  // 确认按钮文字
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  // 取消按钮文字
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 抽屉宽度
  size: {
    type: [String, Number],
    default: '600px'
  },
  // 抽屉方向
  direction: {
    type: String,
    default: 'rtl',
    validator: (value) => ['ltr', 'rtl', 'ttb', 'btt'].includes(value)
  },
  // 确认按钮回调函数
  onConfirm: {
    type: Function,
    default: () => Promise.resolve()
  },
  // 取消按钮回调函数
  onCancel: {
    type: Function,
    default: () => { }
  },
  // 是否在提交时显示全局加载状态
  showLoadingOnSubmit: {
    type: Boolean,
    default: false
  }
})

// Emits定义
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

// 响应式数据
const drawerVisible = ref(false)
const submitting = ref(false)
const formRef = ref(null)

// 计算属性
const drawerTitle = computed(() => props.title || (props.mode === 'add' ? '新增' : '编辑'))

// 判断字段是否可见
const isFieldVisible = (config) => {
  // 如果没有配置 show 属性，默认显示
  if (config.show === undefined) {
    return true
  }
  // 如果 show 是函数，调用函数并传入 formData
  if (typeof config.show === 'function') {
    return config.show(props.formData)
  }
  // 如果 show 是布尔值，直接返回
  return !!config.show
}

// 生成表单验证规则（只为可见字段生成规则）
const generateFormRules = (formConfig) => {
  const rules = {}

  formConfig.forEach(config => {
    // 跳过不可见字段的校验规则
    if (!isFieldVisible(config)) {
      return
    }

    const fieldRules = []

    // 必填校验
    if (config.required) {
      const selectTypes = ['select', 'select-multiple', 'radio', 'checkbox', 'date-picker', 'datetime-picker']
      const message = selectTypes.includes(config.type) ? `请选择${config.label}` : `请输入${config.label}`
      const trigger = ['checkbox', 'select-multiple'].includes(config.type) ? 'change' : 'blur'

      fieldRules.push({ required: true, message, trigger })
    }

    // 处理规则
    if (config.rules) {
      if (typeof config.rules === 'string') {
        const builtInRule = getBuiltInRule(config.rules)
        if (builtInRule) {
          fieldRules.push(...builtInRule)
        }
      } else if (Array.isArray(config.rules)) {
        fieldRules.push(...config.rules)
      } else if (typeof config.rules === 'object') {
        fieldRules.push(config.rules)
      }
    }

    // 向后兼容的校验器
    const legacyValidators = {
      email: { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
      phone: { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    }

    if (config.type === 'input' && legacyValidators[config.validator]) {
      fieldRules.push(legacyValidators[config.validator])
    }

    if (config.type === 'input-number') {
      if (config.min !== undefined) fieldRules.push({ type: 'number', min: config.min, message: `不能小于${config.min}`, trigger: 'blur' })
      if (config.max !== undefined) fieldRules.push({ type: 'number', max: config.max, message: `不能大于${config.max}`, trigger: 'blur' })
    }

    if (config.type === 'input' && config.pattern) {
      fieldRules.push({ pattern: config.pattern, message: config.patternMessage || '格式不正确', trigger: 'blur' })
    }

    if (fieldRules.length > 0) rules[config.prop] = fieldRules
  })

  return rules
}

// formRules 需要响应 formConfig 和 formData 的变化（因为 isFieldVisible 依赖 formData）
const formRules = computed(() => {
  // 触发对 formData 的依赖追踪，确保 formData 变化时重新计算规则
  const _ = JSON.stringify(props.formData)
  return generateFormRules(props.formConfig)
})

// 生成控件通用属性
const getCommonProps = (config) => ({
  placeholder: config.placeholder || `请输入${config.label}`,
  disabled: config.disabled,
  clearable: config.clearable !== false
})

// 监听visible变化，控制抽屉显示和自动重置
watch(() => props.visible, (newVal) => {
  drawerVisible.value = newVal
  if (newVal) {
    nextTick(() => {
      // 新增模式时自动清空表单
      if (props.mode === 'add') {
        resetFormData()
      }
      // 在数据重置后清除验证状态（需要再次 nextTick 确保 rules 更新完成）
      nextTick(() => {
        formRef.value?.clearValidate()
      })
    })
  }
}, { immediate: true })

watch(drawerVisible, (newVal) => emit('update:visible', newVal))

// 表单数据监听（深拷贝原始数据用于重置）
const originalFormData = ref({})

// 自动重置表单数据（新增时清空）
const resetFormData = () => {
  Object.keys(props.formData).forEach(key => {
    const value = props.formData[key]
    if (typeof value === "string") {
      props.formData[key] = ""
    } else if (Array.isArray(value)) {
      props.formData[key] = []
    } else if (typeof value === "number") {
      props.formData[key] = 0
    } else if (typeof value === "boolean") {
      props.formData[key] = false
    } else {
      props.formData[key] = null
    }
  })
}

watch(() => props.formData, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    originalFormData.value = JSON.parse(JSON.stringify(newVal))
  }
}, { immediate: true, deep: true })

// 方法定义
const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    // 表单验证
    const valid = await formRef.value.validate()
    if (!valid) {
      ElMessage.warning('请检查表单填写是否正确')
      return
    }

    submitting.value = true

    // 显示加载提示（可选）
    const loading = props.showLoadingOnSubmit ? ElLoading.service({
      lock: true,
      text: '正在提交中...',
      background: 'rgba(0, 0, 0, 0.7)'
    }) : null

    try {
      // 调用确认回调
      await props.onConfirm(props.formData)

      // 关闭抽屉
      drawerVisible.value = false

      ElMessage.success(`${drawerTitle.value}成功`)
    } finally {
      // 关闭加载提示
      if (loading) {
        loading.close()
      }
    }

  } catch (error) {
    console.error('表单提交失败:', error)

    // 根据错误类型显示不同消息
    let errorMessage = `${drawerTitle.value}失败`
    if (error.message) {
      errorMessage = error.message
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message
    }

    ElMessage.error(errorMessage)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  // 重置表单数据到原始状态
  if (props.mode === 'edit' && originalFormData.value) {
    Object.keys(props.formData).forEach(key => {
      props.formData[key] = originalFormData.value[key]
    })
  }

  // 清空表单验证状态
  formRef.value?.clearValidate()

  // 调用取消回调
  props.onCancel()

  // 关闭抽屉
  drawerVisible.value = false

  emit('cancel')
}

// 级联选择器变化处理
const handleCascaderChange = (value) => {
  // 级联选择器变化处理
}

// 文件上传相关方法
const handleUploadSuccess = (response, file, fileList) => {
  ElMessage.success('文件上传成功')
}

const handleUploadError = (err, file, fileList) => {
  console.error('文件上传失败:', err, file, fileList)
  ElMessage.error('文件上传失败')
}

const handleUploadRemove = (file, fileList) => {
  // 文件移除处理
}

// 重置表单方法（暴露给父组件使用）
const resetForm = () => {
  formRef.value?.resetFields()
}

// 暴露方法给父组件
defineExpose({
  resetForm,
  validate: () => formRef.value?.validate(),
  clearValidate: () => formRef.value?.clearValidate()
})
</script>

<style scoped>
.form-item-wrapper {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.tooltip-icon {
  margin-left: 5px;
  color: #909399;
  font-size: 14px;
  cursor: help;
}

.tooltip-icon:hover {
  color: #409eff;
}

/* 自定义上传样式 */
:deep(.el-upload-dragger) {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  width: 360px;
}

:deep(.el-upload-dragger:hover) {
  border-color: #409eff;
}

/* 穿梭框样式调整 */
:deep(.el-transfer) {
  display: block;
}

/* 表单控件宽度调整 */
:deep(.el-tree-select),
:deep(.el-cascader),
:deep(.el-date-editor--datetime),
:deep(.el-date-editor--time),
:deep(.el-date-editor--date) {
  width: 100%;
}

/* 复合输入框样式 */
:deep(.append-text),
:deep(.prepend-text) {
  color: #909399;
  font-size: 14px;
}

/* 表单项间距优化 */
.form-item-wrapper:last-child {
  margin-bottom: 0;
}

/* 全行插槽样式 */
.full-row-slot {
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
  margin-top: 10px;
}

/* 插槽占位符样式 */
.slot-placeholder {
  padding: 8px 12px;
  background-color: #f5f7fa;
  border: 1px dashed #c0c4cc;
  border-radius: 4px;
  color: #909399;
  font-size: 14px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .dialog-footer {
    flex-direction: column;
  }

  .dialog-footer .el-button {
    width: 100%;
  }
}
</style>