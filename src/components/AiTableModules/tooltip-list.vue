<template>
  <el-tooltip popper-class="custom-tooltip" placement="top" :content="value">
    <span
      :style="{
        width: width + 'px',
        display: 'block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }"
      >{{ value }}</span
    >
  </el-tooltip>
</template>

<script setup>
defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
  width: {
    type: Number,
    default: 190,
  },
});
</script>

<style scoped>
:deep(.custom-tooltip) {
  max-width: 650px !important;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
</style>
