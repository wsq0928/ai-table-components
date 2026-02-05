<template>
  <!-- 模板开始 -->
  <div class="tag-input" @click="focusInput">
    <!-- 包裹组件，点击聚焦输入框 -->
    <div class="tag-input__wrapper">
      <!-- 输入与标签的容器，模拟 el-input 外观 -->
      <el-tag v-for="(t, i) in tags" :key="t + '-' + i" size="small" closable @close="removeAt(i)">
        <!-- 已添加的每个标签，可关闭 -->
        {{ t }}
        <!-- 标签文本 -->
      </el-tag>
      <!-- 标签结束 -->

      <!-- 输入框：草稿输入，处理分隔符/回车/失焦/粘贴 -->
      <el-input
        ref="inputRef"
        v-model="draft"
        :disabled="disabled"
        :placeholder="placeholder"
        aria-label="Please click the Enter key after input"
        class="tag-input__inner"
        clearable
        @keydown.enter.stop.prevent="commit"
        @keydown="onKeydown"
        @keydown.backspace="onBackspace"
        @blur="commit"
        @paste="onPaste"
      >
        <!-- 输入框开始 -->
        <template #suffix v-if="maxNum !== null">
          <!-- 末尾计数器插槽（有限 max 时显示） -->
          <span class="tag-input__counter">{{ tags.length }}/{{ maxNum }}</span>
          <!-- 当前数量/最大数量 -->
        </template>
        <!-- 插槽结束 -->
      </el-input>
      <!-- 输入框结束 -->
    </div>
    <!-- 容器结束 -->
  </div>
  <!-- 包裹结束 -->
</template>
<!-- 模板结束 -->

<script setup>
// 逻辑脚本（组合式，使用 <script setup> 简化书写）
import { ref, nextTick, watch, computed } from 'vue' // 引入响应式与工具函数

defineOptions({ name: 'TagInput' }) // 组件名定义

const props = defineProps({
  // 接收的属性定义
  modelValue: { type: Array, default: () => [] }, // v-model 绑定的标签数组
  placeholder: { type: String, default: 'Please input' }, // 占位符
  deduplicate: { type: Boolean, default: true }, // 是否去重
  max: { type: Number, default: Infinity }, // 最大标签数（Infinity 表示不限制）
  disabled: { type: Boolean, default: false }, // 是否禁用
})

const emit = defineEmits(['update:modelValue', 'change']) // 事件：更新与变更

const tags = ref([...props.modelValue]) // 内部维护的标签数组副本
watch(
  () => props.modelValue,
  (v) => (tags.value = [...v]),
)

const draft = ref('') // 输入草稿字符串
const inputRef = ref(null) // 输入实例引用

const separatorRE = /[\s,，；;]+/g // 分隔符：空白、英文/中文逗号分号

const maxNum = computed(() => (Number.isFinite(props.max) ? props.max : null)) // 规范化最大数量（非有限则隐藏计数器）

function focusInput() {
  // 容器点击时聚焦输入
  nextTick(() => inputRef.value?.focus()) // 下一帧确保聚焦
}

function canAdd(value) {
  const v = String(value || '').trim()
  return (
    v &&
    tags.value.length < (props.max ?? Infinity) &&
    !((props.deduplicate ?? true) && tags.value.includes(v))
  )
}

function emitUpdate() {
  // 同步外部 v-model 与触发 change
  emit('update:modelValue', [...tags.value]) // 更新 v-model
  emit('change', [...tags.value]) // 通知变更
}

function addOne(value) {
  // 添加单个标签
  const v = String(value || '').trim() // 规范化
  if (!canAdd(v)) return // 不可添加则跳过
  tags.value.push(v) // 追加
  emitUpdate() // 同步外部
}

function splitAndAdd(text) {
  String(text || '')
    .split(separatorRE)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach(addOne)
}

function commit() {
  // 提交草稿为标签
  if (!draft.value) return // 空草稿不处理
  splitAndAdd(draft.value) // 拆分添加
  draft.value = '' // 清空草稿
}

function onKeydown(e) {
  // 处理分隔符键
  if (e.key === ',' || e.key === ';' || e.key === '，' || e.key === '；') {
    // 命中分隔符
    e.preventDefault() // 阻止默认输入逗号
    commit() // 转为标签
  }
}

function onBackspace(e) {
  // 空草稿时退格删除最后一项
  if (draft.value === '' && tags.value.length) {
    // 有标签且草稿为空
    e.preventDefault() // 阻止浏览器默认退格
    tags.value.pop() // 移除最后一个
    emitUpdate() // 同步外部
  }
}

function onPaste(e) {
  const text = e.clipboardData?.getData('text') || ''
  if (!text) return
  e.preventDefault()
  splitAndAdd(text)
}

function removeAt(i) {
  // 关闭标签时移除
  tags.value.splice(i, 1) // 移除指定索引
  emitUpdate() // 同步外部
}
</script>

<style scoped>
/* 作用域样式开始 */
.tag-input {
  /* 组件最外层容器 */
  width: 100%; /* 占满可用宽度 */
}

.tag-input__wrapper {
  /* 模拟 el-input 的外观容器 */
  display: flex; /* 横向排列标签与输入 */
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap; /* 自动换行 */
  gap: 4px; /* 标签/输入间距 */
  min-height: 32px; /* 最小高度 */
  padding: 2px 8px; /* 内边距 */
  border: 1px solid var(--el-border-color); /* 边框色 */
  border-radius: var(--el-border-radius-base); /* 圆角 */
  background-color: var(--el-fill-color-blank); /* 背景 */
  transition: var(--el-transition-box-shadow); /* 聚焦过渡阴影 */
}

.tag-input__wrapper:focus-within {
  /* 输入聚焦态样式 */
  box-shadow: var(--el-box-shadow-focus); /* 阴影高亮 */
  border-color: var(--el-color-primary); /* 边框高亮 */
}

.tag-input__inner {
  /* 内部 el-input 的自适应宽度 */
  flex: 1 0 120px; /* 可伸缩，最小 120px */
  min-width: 120px; /* 避免过窄 */
}

.tag-input__inner :deep(.el-input__wrapper) {
  /* 去掉 el-input 自带阴影与边框 */
  box-shadow: none !important; /* 移除阴影 */
  border: 0; /* 去边框 */
  padding-left: 0; /* 左内边距归零 */
  padding-right: 0; /* 右内边距归零 */
}

.tag-input__counter {
  /* 右侧计数器样式 */
  color: var(--el-text-color-placeholder); /* 次要文字色 */
  font-size: 12px; /* 小号文字 */
}
</style>
/* 作用域样式结束 */
