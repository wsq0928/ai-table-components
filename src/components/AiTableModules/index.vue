<template>
  <div class="ai-table-modules">
    <div style="padding: 16px 20px">
      <!-- 工具栏区域：左侧新增按钮，右侧检索内容 -->
      <div class="toolbar-area">
        <div class="toolbar-left">
          <el-button
            v-if="handleAdd"
            type="primary"
            @click="onAdd"
          >
            新增
          </el-button>
          <el-button
            v-if="handleDelete"
            type="danger"
            :disabled="selectedRows.length === 0"
            @click="onBatchDelete"
          >
            删除 ({{ selectedRows.length }})
          </el-button>
          <!-- 导入按钮 -->
          <ImportFile
            v-if="importApi"
            :upload-api="importApi"
            @success="onImportSuccess"
          />
          <!-- 自定义工具栏插槽 -->
          <slot name="toolbar-left" />
        </div>

        <!-- 右侧检索内容 -->
        <div
          v-if="searchFields && searchFields.length > 0"
          class="toolbar-right search-area"
        >
          <SearchForm
            :fields="visibleSearchFields"
            :collapsed-fields="collapsedSearchFields"
            :search-form="searchForm"
            :get-options="getOptions"
            :on-search="onSearch"
            :on-reset="onReset"
          >
            <template #search-extra>
              <slot
                name="search-extra"
                :search-form="searchForm"
              />
            </template>
          </SearchForm>
          <!-- 自定义工具栏右侧插槽 -->
          <slot name="toolbar-right" />
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="table-area">
        <!-- 表头配置按钮 - 绝对定位到表格最右侧 -->
        <div style="position: absolute; right: 1px; top: 3px; z-index: 999">
          <SettingsHeaders
            v-if="headers && headers.length > 0"
            :headers="headers"
            :visible-headers="visibleHeaders"
            @update:headers="handleHeadersUpdate"
            class="settings-header-btn"
          />
        </div>
        <el-table
          ref="tableRef"
          :data="data"
          :loading="loading"
          border
          v-bind="tableProps"
          :height="height"
          @selection-change="onSelectionChange"
          @sort-change="onSortChange"
          @expand-change="onExpandChange"
          class="header-border-only-table"
        >
          <!-- 拖拽列 -->
          <el-table-column
            v-if="draggable"
            width="50"
            align="center"
            fixed="left"
          >
            <template #default>
              <el-icon
                class="drag-handle"
                style="cursor: move; font-size: 16px;"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M256 288a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm0 224a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm0 224a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm512-448a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm0 224a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm0 224a32 32 0 1 1 0-64 32 32 0 0 1 0 64z"
                  />
                </svg>
              </el-icon>
            </template>
          </el-table-column>

          <!-- 展开行 -->
          <el-table-column
            v-if="expandable"
            type="expand"
            width="50"
            align="center"
          >
            <template #default="{ row }">
              <slot
                name="expand"
                :row="row"
                :data="row"
              >
                <div style="padding: 12px 16px; color: #606266">
                  暂无展开内容
                </div>
              </slot>
            </template>
          </el-table-column>

          <!-- 多选列 -->
          <el-table-column
            v-if="handleSelectionChange"
            type="selection"
            width="55"
            align="center"
          />

          <!-- 动态列 -->
          <el-table-column
            v-for="header in visibleHeaders"
            :key="header.prop"
            :prop="header.prop"
            :label="header.label"
            :width="header.width"
            :min-width="header.minWidth || 120"
            :fixed="header.fixed"
            :sortable="header.sortable"
            :align="header.align || 'left'"
          >
            <template #default="{ row }">
              <!-- 多标签提示组件 -->
              <MultiTooltips
                v-if="header.multiTooltips"
                :data="Array.isArray(row[header.prop]) ? row[header.prop] : []"
              />
              <!-- 字典标签展示 -->
              <el-tag
                v-else-if="header.dict && header.dict.length > 0"
                :type="getDictType(row[header.prop], header.dict)"
              >
                {{ getDictLabel(row[header.prop], header.dict) }}
              </el-tag>

              <el-tooltip
                v-else-if="header.tooltip"
                popper-class="custom-tooltip"
                placement="top"
                :content="formatCellValue(row, header)"
              >
                <span :style="{
                    width: header.width || 120 + 'px',
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }">{{ formatCellValue(row, header) }}</span>
              </el-tooltip>
              <!-- 自定义插槽 -->
              <slot
                v-else-if="header.slotName"
                :name="header.slotName"
                :row="row"
                :data="row"
              >
                <!-- 默认显示 -->
                <span>{{ getCellValue(row, header) }}</span>
              </slot>
              <!-- 默认显示或格式化 -->
              <span v-else>{{ formatCellValue(row, header) }}</span>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column
            v-if="rowActions && rowActions.length > 0"
            label="操作"
            :width="rowActionsWidth || getActionsColumnWidth(rowActions)"
            :fixed="rowActionsFixed || 'right'"
            align="center"
          >
            <template #default="{ row }">
              <ActionButtons
                :actions="rowActions"
                :row="row"
                @action="onRowAction"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页区域 -->
    <div
      v-if="pager"
      class="pagination-area"
    >
      <el-pagination
        v-model:current-page="pager.current"
        v-model:page-size="pager.pageSize"
        :total="pager.total"
        :page-sizes="pager.pageSizes || [10, 20, 50, 100]"
        :layout="pager.layout || 'total, sizes, prev, pager, next, jumper'"
        @current-change="onPageChange"
        @size-change="onSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
import { Plus, Delete } from "@element-plus/icons-vue";
import Sortable from "sortablejs";
import SettingsHeaders from "./settings-headers.vue";
import ActionButtons from "./action-buttons.vue";
import MultiTooltips from "./multi-tooltips.vue";
import SearchForm from "./search-form.vue";
import ImportFile from "./import.vue";

const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },
  // 表格高度
  height: {
    type: String,
    default: "100%",
  },
  // 表头配置
  headers: {
    type: Array,
    default: () => [],
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  // 分页配置
  pager: {
    type: Object,
    default: null,
  },
  // 搜索字段配置
  searchFields: {
    type: Array,
    default: () => [],
  },
  // 直接展示的检索项数量（剩余的放入弹层）
  searchFieldsNumber: {
    type: Number,
    default: null,
  },
  // 行操作配置
  rowActions: {
    type: Array,
    default: () => [],
  },
  // 操作列宽度
  rowActionsWidth: {
    type: Number,
    default: null,
  },
  // 操作列固定位置
  rowActionsFixed: {
    type: String,
    default: "right",
  },
  // 是否显示展开行
  expandable: {
    type: Boolean,
    default: false,
  },
  // 表格其他属性
  tableProps: {
    type: Object,
    default: () => ({}),
  },
  // 搜索方法
  handleSearch: {
    type: Function,
    default: null,
  },
  // 重置方法
  handleReset: {
    type: Function,
    default: null,
  },
  // 新增方法
  handleAdd: {
    type: Function,
    default: null,
  },
  // 批量删除方法
  handleDelete: {
    type: Function,
    default: null,
  },
  // 导入接口地址
  importApi: {
    type: String,
    default: null,
  },
  // 导入成功回调
  handleImport: {
    type: Function,
    default: null,
  },
  // 分页变化方法
  handlePageChange: {
    type: Function,
    default: null,
  },
  // 每页条数变化方法
  handleSizeChange: {
    type: Function,
    default: null,
  },
  // 行操作方法
  handleRowAction: {
    type: Function,
    default: null,
  },
  // 选择变化方法
  handleSelectionChange: {
    type: Function,
    default: null,
  },
  // 排序变化方法
  handleSortChange: {
    type: Function,
    default: null,
  },
  // 是否启用行拖拽排序
  draggable: {
    type: Boolean,
    default: false,
  },
  // 行唯一标识字段
  rowKey: {
    type: String,
    default: "id",
  },
  // 拖拽排序回调
  handleRowDrag: {
    type: Function,
    default: null,
  },
  // 展开行变化回调
  handleExpandChange: {
    type: Function,
    default: null,
  },
});

// 搜索表单数据
const searchForm = reactive({});

// 选中的行
const selectedRows = ref([]);

// 可见的表头（用于表头配置）
const visibleHeaders = ref([]);

// 需要直接展示的搜索项
const visibleSearchFields = computed(() => {
  const fields = props.searchFields || [];
  if (!props.searchFieldsNumber && props.searchFieldsNumber !== 0) {
    return fields;
  }
  return fields.slice(0, props.searchFieldsNumber);
});

// 收起到弹层的搜索项
const collapsedSearchFields = computed(() => {
  const fields = props.searchFields || [];
  if (!props.searchFieldsNumber && props.searchFieldsNumber !== 0) {
    return [];
  }
  return fields.slice(props.searchFieldsNumber);
});

// 表格引用
const tableRef = ref(null);

// 初始化搜索表单
const initSearchForm = () => {
  if (props.searchFields) {
    props.searchFields.forEach((field) => {
      if (field.type === "tag-input" || field.type === "select-multiple" || field.multiple) {
        searchForm[field.prop] = [];
      } else if (field.type === "date-range" || field.type === "date") {
        searchForm[field.prop] = null;
      } else {
        searchForm[field.prop] =
          field.defaultValue ?? (field.type === "number" ? null : "");
      }
    });
  }
};

// 初始化可见表头
const initVisibleHeaders = () => {
  if (props.headers) {
    visibleHeaders.value = [...props.headers];
  }
};

// 获取选项数据（支持函数和数组）
const getOptions = (field) => {
  if (typeof field.options === "function") {
    return field.options() || [];
  }
  return field.options || [];
};

// 获取单元格值
const getCellValue = (row, header) => {
  return row[header.prop] ?? "";
};

// 格式化单元格值
const formatCellValue = (row, header) => {
  const value = getCellValue(row, header);
  if (header.formatter && typeof header.formatter === "function") {
    return header.formatter(row, header, value);
  }
  return value;
};

// 根据 value 从 dict 中获取 label
const getDictLabel = (value, dict) => {
  if (!dict || dict.length === 0) return value;
  const item = dict.find(d => d.value === value);
  return item ? item.label : value;
};

// 根据 value 从 dict 中获取 type
const getDictType = (value, dict) => {
  if (!dict || dict.length === 0) return undefined;
  const item = dict.find(d => d.value === value);
  return item && item.type ? item.type : undefined;
};

// 计算操作列宽度
const getActionsColumnWidth = (actions) => {
  const actionCount = actions.length;
  if (actionCount <= 3) {
    return actionCount * 60 + 20;
  } else {
    return 200; // 有下拉菜单时固定宽度
  }
};

// 搜索
const onSearch = () => {
  const params = { ...searchForm };
  // 清理空值
  Object.keys(params).forEach((key) => {
    if (
      params[key] === "" ||
      params[key] === null ||
      (Array.isArray(params[key]) && params[key].length === 0)
    ) {
      delete params[key];
    }
  });
  if (props.handleSearch) {
    props.handleSearch(params);
  }
};

// 重置
const onReset = () => {
  initSearchForm();
  if (props.handleReset) {
    props.handleReset();
  } else {
    // 如果没有提供重置方法，自动触发搜索
    onSearch();
  }
};

// 新增
const onAdd = () => {
  if (props.handleAdd) {
    props.handleAdd();
  }
};

// 批量删除
const onBatchDelete = () => {
  if (selectedRows.value.length === 0) {
    return;
  }
  if (props.handleDelete) {
    props.handleDelete(selectedRows.value);
    // 清空选中
    selectedRows.value = [];
    tableRef.value?.clearSelection();
  }
};

// 导入成功
const onImportSuccess = (data) => {
  if (props.handleImport) {
    props.handleImport(data);
  }
};

// 行操作
const onRowAction = (actionKey, row) => {
  if (props.handleRowAction) {
    props.handleRowAction(actionKey, row);
  }
};

// 选择变化
const onSelectionChange = (selection) => {
  selectedRows.value = selection;
  if (props.handleSelectionChange) {
    props.handleSelectionChange(selection);
  }
};

// 分页变化
const onPageChange = (page) => {
  if (props.handlePageChange) {
    props.handlePageChange(page);
  }
};

// 每页条数变化
const onSizeChange = (size) => {
  if (props.handleSizeChange) {
    props.handleSizeChange(size);
  }
};

// 排序变化
const onSortChange = ({ prop, order }) => {
  if (props.handleSortChange) {
    props.handleSortChange({ prop, order });
  }
};

// 展开行变化
const onExpandChange = (row, expandedRows) => {
  if (props.handleExpandChange) {
    props.handleExpandChange(row, expandedRows);
  }
};

// 表头更新
const handleHeadersUpdate = (headers) => {
  visibleHeaders.value = headers;
};

// 初始化
initSearchForm();
initVisibleHeaders();

// 监听 headers 变化
watch(
  () => props.headers,
  () => {
    initVisibleHeaders();
  },
  { deep: true }
);

// 监听 searchFields 变化
watch(
  () => props.searchFields,
  () => {
    initSearchForm();
  },
  { deep: true }
);

// 初始化拖拽排序
const initDraggable = () => {
  if (!props.draggable || !tableRef.value) return;

  nextTick(() => {
    const tbody = tableRef.value.$el.querySelector(".el-table__body-wrapper tbody");
    if (!tbody) return;

    Sortable.create(tbody, {
      animation: 150,
      handle: ".drag-handle", // 如果需要拖拽手柄，可以指定
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (oldIndex === newIndex) return;

        // 获取当前数据的副本
        const newData = [...props.data];
        // 获取被拖拽的行数据
        const movedRow = newData[oldIndex];
        // 执行数据交换
        newData.splice(oldIndex, 1);
        newData.splice(newIndex, 0, movedRow);

        // 回调父组件
        if (props.handleRowDrag) {
          props.handleRowDrag({
            id: movedRow[props.rowKey],
            row: movedRow,
            oldIndex,
            newIndex,
            data: newData,
          });
        }
      },
    });
  });
};

// 组件挂载后初始化拖拽
onMounted(() => {
  if (props.draggable) {
    initDraggable();
  }
});

// 监听 draggable 变化
watch(
  () => props.draggable,
  (val) => {
    if (val) {
      initDraggable();
    }
  }
);

// 暴露方法
defineExpose({
  getSelectedRows: () => selectedRows.value,
  clearSelection: () => {
    selectedRows.value = [];
    tableRef.value?.clearSelection();
  },
  refresh: () => {
    onSearch();
  },
});
</script>

<style lang="scss" scoped>
.ai-table-modules {
  display: flex;
  flex-direction: column;
  height: calc(100% - 32px);
  margin: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.toolbar-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
  background-color: #fff;
  flex-shrink: 0;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;

  &.search-area {
    padding: 0;
    background-color: transparent;
    border-bottom: none;
  }
}

.search-form {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;

  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 0;
  }
}

.popover-filter {
  padding: 4px 4px 8px;
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

.table-area {
  flex: 1;
  overflow: auto;
  background-color: #fff;
  position: relative;

  :deep(.header-border-only-table) {
    // 隐藏表格最外层边框
    border-left: none !important;
    border-right: none !important;

    // 保留表头边框
    .el-table__header-wrapper {
      .el-table__header {
        th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
      }
    }

    // 隐藏表格内容区域的所有边框
    .el-table__body-wrapper {
      .el-table__body {
        td {
          border-right: none !important;
          border-bottom: none !important;
        }

        tr {
          td:first-child {
            border-left: none !important;
          }
        }
      }

      // 隐藏表格左右边框
      border-left: none !important;
      border-right: none !important;
    }

    // 隐藏表格底部边框
    .el-table__inner-wrapper::after {
      display: none;
    }

    // 隐藏表格外层容器的左右边框
    &::before,
    &::after {
      display: none;
    }
  }
}

.settings-header-btn {
  position: absolute;
  right: 2px;
  top: 3px;
  z-index: 999;
}

.pagination-area {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  background-color: #fff;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

// 限制表格 tooltip 宽度
:deep(.el-tooltip__popper) {
  max-width: 650px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

// 拖拽样式
.drag-handle {
  cursor: move;
  color: #909399;
  transition: color 0.3s;

  &:hover {
    color: #409eff;
  }
}

:deep(.sortable-ghost) {
  opacity: 0.4;
  background-color: #409eff !important;
}

:deep(.sortable-chosen) {
  background-color: #f5f7fa !important;
}
</style>
<style>
.custom-tooltip {
  max-width: 650px !important;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
</style>
