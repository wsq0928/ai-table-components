<template>
  <div class="action-buttons">
    <!-- 根据操作按钮数量动态显示 -->
    <template v-for="(action, index) in visibleActions" :key="index">
      <el-button
        :type="action.type"
        size="small"
        text
        @click="handleClick(action.key)"
        :disabled="action.disabled"
      >
        {{ action.label }}
      </el-button>
    </template>
    <!-- 下拉菜单：4个按钮时显示，或超过3个时显示 -->
    <el-dropdown v-if="dropdownActions.length > 0" @command="handleClick">
      <el-button type="info" size="small" text>
        <el-icon><MoreFilled /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :disabled="action.disabled"
            v-for="action in dropdownActions"
            :key="action.key"
            :command="action.key"
          >
            {{ action.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ElMessageBox } from "element-plus";
import { MoreFilled } from "@element-plus/icons-vue";

const props = defineProps({
  actions: {
    type: Array,
    required: true,
    default: () => [],
  },
  row: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["action"]);

// 根据操作数量计算可见按钮
const visibleActions = computed(() => {
  const actionCount = props.actions.length;
  if (actionCount === 3) {
    // 3个按钮时，全部显示
    return props.actions;
  } else if (actionCount === 4) {
    // 4个按钮时，显示前2个
    return props.actions.slice(0, 2);
  } else if (actionCount > 3) {
    // 超过3个时，显示前2个
    return props.actions.slice(0, 2);
  }
  // 少于3个时，全部显示
  return props.actions;
});

// 计算下拉菜单中的按钮
const dropdownActions = computed(() => {
  const actionCount = props.actions.length;
  if (actionCount === 4) {
    // 4个按钮时，后2个放入下拉菜单
    return props.actions.slice(2);
  } else if (actionCount > 3) {
    // 超过3个时，从第3个开始的所有按钮放入下拉菜单
    return props.actions.slice(2);
  }
  // 3个或少于3个时，不需要下拉菜单
  return [];
});

// 处理操作按钮点击
const handleClick = async (actionKey) => {
  // 如果是删除操作，显示确认框
  if (actionKey === "delete") {
    try {
      await ElMessageBox.confirm("您确定要删除您所选中的数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      // 用户确认后触发删除操作
      emit("action", actionKey, props.row);
    } catch {
      // 用户取消，不执行任何操作
    }
  } else {
    // 其他操作直接触发
    emit("action", actionKey, props.row);
  }
};
</script>

<style scoped>
.action-buttons {
  display: inline-flex;
  align-items: center;
  gap: 0;
}
</style>
