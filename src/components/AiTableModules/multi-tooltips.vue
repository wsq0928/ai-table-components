<template>
  <template v-if="data.length <= 2">
    <el-tag
      v-for="(item, index) in data"
      :key="index"
      type="primary"
      style="margin-right: 8px; margin-bottom: 4px"
    >
      {{ item }}
    </el-tag>
  </template>
  <template v-else>
    <el-tag type="primary" style="margin-right: 8px; margin-bottom: 4px">
      {{ data[0] }}
    </el-tag>
    <el-tooltip placement="top" effect="light" popper-class="custom-tooltip">
      <template #content>
        <div class="tooltip-content">
          <el-tag
            v-for="(item, index) in data.slice(1)"
            :key="index"
            type="primary"
            style="margin-right: 8px; margin-bottom: 4px"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
      <el-tag
        type="primary"
        style="margin-right: 8px; margin-bottom: 4px; cursor: pointer"
      >
        + {{ data.length - 1 }}
      </el-tag>
    </el-tooltip>
  </template>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
:deep(.custom-tooltip) {
  background-color: #fff !important;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.custom-tooltip .el-tooltip__arrow::before) {
  background-color: #fff !important;
  border: 1px solid #e4e7ed;
}

.tooltip-content {
  padding: 4px 0;
}
</style>
