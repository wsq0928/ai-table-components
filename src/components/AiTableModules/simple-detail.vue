<template>
  <el-drawer
    v-model="visible"
    :title="title"
    class="detail-drawer"
    :append-to-body="true"
  >
    <el-descriptions :column="1">
      <template
        v-for="item in options"
        :key="item.prop"
      >
        <slot
          :name="item.prop + 'DescItem'"
          :row="data[item.prop]"
          :data="data"
        >
          <el-descriptions-item
            style="font-weight: 600;"
            :label="item.label"
          >
            <slot
              :name="item.prop"
              :row="data[item.prop]"
              :data="data"
            >
              <!-- 如果有 multiTooltips 配置，使用 MultiTooltips 组件 -->
              <MultiTooltips
                v-if="item.multiTooltips"
                :data="Array.isArray(data[item.prop]) ? data[item.prop] : []"
              />
              <!-- 如果有 dict 配置，使用 el-tag 展示 -->
              <el-tag
                v-else-if="item.dict && item.dict.length > 0"
                :type="getDictType(data[item.prop], item.dict)"
              >
                {{ getDictLabel(data[item.prop], item.dict) }}
              </el-tag>
              <!-- 否则直接展示值 -->
              <template v-else>
                {{ data[item.prop] }}
              </template>
            </slot>
          </el-descriptions-item>
        </slot>
      </template>
    </el-descriptions>
    <div v-if="$slots.footer">
      <slot
        name="footer"
        :data="data"
      />
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { ElDescriptions, ElDescriptionsItem, ElMessage, ElTag } from "element-plus";
import MultiTooltips from "./multi-tooltips.vue";

const props = defineProps({
  title: String,
  options: Array,
});
const { title, options } = props;

const visible = ref(false);
const data = ref({});

function show (val) {
  if (val) {
    data.value = val;
    visible.value = true;
  } else {
    ElMessage({
      type: "warning",
      message: "数据为空",
    });
  }
}

// 关闭
function close () {
  visible.value = false;
}

// 根据 value 从 dict 中获取 label
function getDictLabel (value, dict) {
  if (!dict || dict.length === 0) return value;
  const item = dict.find(d => d.value === value);
  return item ? item.label : value;
}

// 根据 value 从 dict 中获取 type
function getDictType (value, dict) {
  if (!dict || dict.length === 0) return undefined;
  const item = dict.find(d => d.value === value);
  return item && item.type ? item.type : undefined;
}

defineExpose({
  show,
  close,
});
</script>

<style lang="scss">
.detail-drawer .el-drawer__body {
  overflow-x: hidden;
}

.detail-drawer .el-descriptions {
  overflow: hidden;
}

.detail-drawer .el-descriptions__table {
  table-layout: fixed;
  width: 100%;
}

.detail-drawer .el-descriptions__table tbody tr {
  &:nth-child(odd) {
    background-color: rgba(236, 245, 255, 0.8);
  }

  .el-descriptions__cell {
    padding-bottom: 6px !important;
    padding-top: 7px !important;
    display: flex;

    .el-descriptions__label {
      width: 120px;
      text-align: left !important;
      display: flex;
      align-items: center;
    }

    .el-descriptions__content {
      flex: 1;
      width: 0;
      word-wrap: break-word;
    }
  }
}
</style>
