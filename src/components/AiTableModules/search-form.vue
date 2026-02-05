<template>
  <div class="search-form-wrapper">
    <el-form
      :model="searchForm"
      :inline="true"
      class="search-form"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
      >
        <component
          :is="getComponent(field)"
          v-model="searchForm[field.prop]"
          v-bind="getComponentProps(field)"
        >
          <!-- select 选项 -->
          <template
            v-if="field.type === 'select' || field.type === 'select-multiple'"
            #default
          >
            <el-option
              v-for="option in getOptions(field)"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
        </component>
      </el-form-item>

      <!-- 额外内容（按钮左侧） -->
      <slot name="search-extra" />
      <!-- 折叠项 -->
      <el-form-item v-if="collapsedFields.length > 0">
        <el-popover
          ref="popoverRef"
          :visible="popoverVisible"
          placement="bottom-start"
          trigger="manual"
          width="360"
          :hide-after="0"
          :show-after="0"
          :teleported="false"
        >
          <template #reference>
            <el-icon
              style="cursor: pointer; color: #909399"
              @click="handleTogglePopover"
              title="更多筛选"
            >
              <Expand />
            </el-icon>
          </template>
          <div class="popover-filter">
            <div class="popover-filter__title">更多筛选</div>
            <el-form
              :model="searchForm"
              label-width="84px"
              class="popover-form"
            >
              <el-form-item
                v-for="field in collapsedFields"
                :key="field.prop"
                :label="field.label"
              >
                <component
                  :is="getComponent(field)"
                  v-model="searchForm[field.prop]"
                  v-bind="getCollapsedProps(field)"
                >
                  <template
                    v-if="field.type === 'select' || field.type === 'select-multiple'"
                    #default
                  >
                    <el-option
                      v-for="option in getOptions(field)"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </template>
                </component>
              </el-form-item>
            </el-form>
            <!-- 底部按钮区域 -->
            <div class="popover-filter__footer">
              <el-button
                size="small"
                @click="handleClosePopover"
              >
                取消
              </el-button>
            </div>
          </div>
        </el-popover>
      </el-form-item>

      <!-- 搜索 / 重置 -->
      <el-form-item>
        <el-button
          type="primary"
          :icon="Search"
          @click="onSearch"
        >搜索</el-button>
        <el-button
          :icon="Refresh"
          @click="onReset"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Expand, Refresh, Search } from "@element-plus/icons-vue";
import TagInput from "./tag-input.vue";

const popoverRef = ref(null);
const popoverVisible = ref(false);

const handleTogglePopover = () => {
  popoverVisible.value = !popoverVisible.value;
};

const handleClosePopover = () => {
  popoverVisible.value = false;
};

const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  collapsedFields: {
    type: Array,
    default: () => [],
  },
  searchForm: {
    type: Object,
    required: true,
  },
  getOptions: {
    type: Function,
    required: true,
  },
  onSearch: {
    type: Function,
    required: true,
  },
  onReset: {
    type: Function,
    required: true,
  },
});

const componentMap = {
  input: "el-input",
  number: "el-input-number",
  select: "el-select",
  "select-multiple": "el-select",
  date: "el-date-picker",
  "date-range": "el-date-picker",
  "tag-input": TagInput,
};

const getComponent = (field) => {
  return componentMap[field.type] || "el-input";
};

const getComponentProps = (field) => {
  switch (field.type) {
    case "number":
      return {
        style: { width: "200px" },
        min: field.min,
        max: field.max,
        "controls-position": field.controlsPosition || "right",
      };
    case "select":
      return {
        style: { width: "200px" },
        placeholder: field.placeholder || `请选择${field.label}`,
        multiple: field.multiple,
        clearable: true,
      };
    case "select-multiple":
      return {
        style: { width: "200px" },
        placeholder: field.placeholder || `请选择${field.label}`,
        multiple: true,
        clearable: true,
        "collapse-tags": true,
        "collapse-tags-tooltip": true,
      };
    case "date":
      return {
        style: { width: "200px" },
        type: "date",
        placeholder: field.placeholder || `请选择${field.label}`,
        clearable: true,
        format: field.format || "YYYY-MM-DD",
        "value-format": field.valueFormat || "YYYY-MM-DD",
        teleported: false,
      };
    case "date-range":
      return {
        style: { width: "240px" },
        type: "daterange",
        "range-separator": field.rangeSeparator || "至",
        "start-placeholder": field.placeholder?.[0] || "开始日期",
        "end-placeholder": field.placeholder?.[1] || "结束日期",
        format: field.format || "YYYY-MM-DD",
        "value-format": field.valueFormat || "YYYY-MM-DD",
        shortcuts: field.shortcuts,
        teleported: false,
      };
    case "tag-input":
      return {
        style: { width: "200px" },
        placeholder: field.placeholder || `请输入${field.label}`,
        max: field.max,
        deduplicate: field.deduplicate !== false,
      };
    case "password":
      return {
        style: { width: "200px" },
        type: "password",
        placeholder: field.placeholder || `请输入${field.label}`,
        clearable: true,
        showPassword: true,
        onKeyup: (evt) => {
          if (evt.key === "Enter") {
            props.onSearch();
          }
        },
      };
    case "textarea":
      return {
        style: { width: "200px" },
        type: "textarea",
        placeholder: field.placeholder || `请输入${field.label}`,
        autosize: field.autosize || { minRows: 2, maxRows: 4 },
        clearable: true,
      };
    default:
      return {
        style: { width: "200px" },
        placeholder: field.placeholder || `请输入${field.label}`,
        clearable: true,
        onKeyup: (evt) => {
          if (evt.key === "Enter") {
            props.onSearch();
          }
        },
      };
  }
};

const getCollapsedProps = (field) => {
  const base = getComponentProps(field);
  // 展开层里稍宽一些
  if (field.type === "date-range") {
    return { ...base, style: { width: "260px" } };
  }
  if (field.type === "date" || field.type === "select-multiple") {
    return { ...base, style: { width: "240px" } };
  }
  return { ...base, style: { width: "240px" } };
};
</script>

<style scoped>
.search-form-wrapper {
  width: 100%;
}
.search-form {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
  float: right;
}
:deep(.el-form-item) {
  margin-bottom: 0;
  margin-right: 0;
}
.popover-filter {
  padding: 4px 4px;
  max-height: 400px;
  overflow: auto;
}
.popover-filter__title {
  font-size: 13px;
  color: #606266;
  margin-bottom: 6px;
  font-weight: 600;
}
.popover-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.popover-filter__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid #e4e7ed;
}
</style>
