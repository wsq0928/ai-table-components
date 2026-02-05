<template>
  <el-tooltip content="配置表头" placement="top">
    <el-dropdown :hide-on-click="false" trigger="click">
      <el-button class="config-table" :icon="Setting" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.stop>
            <el-checkbox
              v-model="selectAll"
              @change="handleSelectAll"
              label="全选/取消全选"
            />
          </el-dropdown-item>
          <el-dropdown-item
            v-for="(header, index) in headers"
            :key="index"
            @click.stop
          >
            <el-checkbox
              v-model="checkedHeaders[index]"
              @change="handleCheckboxChange"
              :label="header.label"
            />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { Setting } from "@element-plus/icons-vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  visibleHeaders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:headers"]);

// 根据可见的 headers 初始化选中状态
const initCheckedHeaders = () => {
  if (props.visibleHeaders && props.visibleHeaders.length > 0) {
    // 根据 visibleHeaders 来设置选中状态
    return props.headers.map((header) => {
      return props.visibleHeaders.some(
        (visibleHeader) => visibleHeader.prop === header.prop
      );
    });
  }
  // 如果没有 visibleHeaders，默认全部选中
  return props.headers.map(() => true);
};

// 初始化选中状态
const checkedHeaders = ref(initCheckedHeaders());

// 全选状态
const selectAll = computed({
  get: () => {
    if (checkedHeaders.value.length === 0) return false;
    return checkedHeaders.value.every((checked) => checked);
  },
  set: (val) => {
    checkedHeaders.value = props.headers.map(() => val);
    updateHeaders();
  },
});

// 初始化时发送一次更新
onMounted(() => {
  // 确保选中状态已正确初始化
  if (props.visibleHeaders && props.visibleHeaders.length > 0) {
    // 如果 visibleHeaders 有值，根据它来初始化
    checkedHeaders.value = initCheckedHeaders();
  } else {
    // 如果没有 visibleHeaders，默认全部选中
    checkedHeaders.value = props.headers.map(() => true);
  }
  updateHeaders();
});

// 监听 headers 变化，更新选中状态
watch(
  () => props.headers,
  (newHeaders) => {
    // 如果 headers 长度变化，重新初始化选中状态
    if (newHeaders.length !== checkedHeaders.value.length) {
      checkedHeaders.value = initCheckedHeaders();
      updateHeaders();
    }
  },
  { deep: true }
);

// 注意：不监听 visibleHeaders 的变化，避免用户选择被重置
// checkedHeaders 只由用户的交互来控制

// 处理单个复选框变化
const handleCheckboxChange = () => {
  updateHeaders();
};

// 处理全选/取消全选
const handleSelectAll = (val) => {
  checkedHeaders.value = props.headers.map(() => val);
  updateHeaders();
};

// 更新 headers，只返回选中的项
const updateHeaders = () => {
  const filteredHeaders = props.headers.filter(
    (_, index) => checkedHeaders.value[index]
  );
  emit("update:headers", filteredHeaders);
};
</script>

<style lang="scss" scoped>
.config-table {
  border: unset !important;
  background-color: transparent !important;

  :deep(.el-button) {
    border: unset !important;
    background-color: transparent !important;
  }
}

:deep(.el-dropdown-menu__item) {
  padding: 8px 20px;

  .el-checkbox {
    width: 100%;
    margin-right: 0;

    .el-checkbox__label {
      padding-left: 8px;
    }
  }
}
</style>
