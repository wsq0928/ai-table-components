<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    :direction="direction"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      :label-width="labelWidth"
      :validate-on-rule-change="true"
      class="drawer-form"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
        :required="field.required"
      >
        <component
          :is="getComponent(field)"
          v-model="formData[field.prop]"
          v-bind="getComponentProps(field)"
        >
          <!-- select 选项 -->
          <template
            v-if="field.type === 'select'"
            #default
          >
            <el-option
              v-for="option in getOptions(field)"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
          <!-- radio-group 选项 -->
          <template
            v-if="field.type === 'radio'"
            #default
          >
            <el-radio
              v-for="option in getOptions(field)"
              :key="option.value"
              :label="option.value"
            >{{ option.label }}</el-radio>
          </template>
          <!-- checkbox-group 选项 -->
          <template
            v-if="field.type === 'checkbox'"
            #default
          >
            <el-checkbox
              v-for="option in getOptions(field)"
              :key="option.value"
              :label="option.value"
            >{{ option.label }}</el-checkbox>
          </template>
        </component>
      </el-form-item>

      <!-- 自定义插槽：表单最下方 -->
      <slot
        v-if="visible && formData"
        name="operationDrawer"
        :row="initialData || {}"
        :formData="formData"
      />
    </el-form>

    <template #footer>
      <div class="drawer-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from "vue";
import TagInput from "./tag-input.vue";
import { validators } from "./validators.js";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "新增",
  },
  fields: {
    type: Array,
    default: () => [],
  },
  size: {
    type: [String, Number],
    default: "500px",
  },
  direction: {
    type: String,
    default: "rtl",
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  getOptions: {
    type: Function,
    default: null,
  },
  // 初始数据（编辑模式时传入）
  initialData: {
    type: Object,
    default: () => ({}),
  },
  // 表单标签宽度
  labelWidth: {
    type: String,
    default: "100px",
  },
  // 插槽字段的验证规则配置（用于插槽中的表单项）
  slotFields: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "submit", "cancel", "close"]);

const formRef = ref(null);
const formData = reactive({});
const formRules = reactive({});

// 控制抽屉显示
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 组件映射
const componentMap = {
  input: "el-input",
  password: "el-input",
  textarea: "el-input",
  number: "el-input-number",
  select: "el-select",
  date: "el-date-picker",
  "date-range": "el-date-picker",
  datetime: "el-date-picker",
  "datetime-range": "el-date-picker",
  switch: "el-switch",
  radio: "el-radio-group",
  checkbox: "el-checkbox-group",
  "tag-input": TagInput,
  slider: "el-slider",
  rate: "el-rate",
  color: "el-color-picker",
  upload: "el-upload",
};

// 获取组件
const getComponent = (field) => {
  return componentMap[field.type] || "el-input";
};

// 获取选项数据
const getOptions = (field) => {
  if (props.getOptions) {
    return props.getOptions(field) || [];
  }
  if (typeof field.options === "function") {
    return field.options() || [];
  }
  return field.options || [];
};

// 获取 maxlength 值
const getMaxlength = (field) => {
  if (field.maxlength === false) {
    return undefined;
  }
  return field.maxlength ?? 128;
};

// 是否显示字数统计
const showWordLimit = (field) => {
  const maxlength = getMaxlength(field);
  return maxlength !== undefined;
};

// 获取组件属性
const getComponentProps = (field) => {
  const baseProps = {
    placeholder: field.placeholder || `请输入${field.label}`,
    clearable: field.clearable !== false,
    disabled: field.disabled || false,
  };

  switch (field.type) {
    case "input":
      return {
        ...baseProps,
        maxlength: getMaxlength(field),
        showWordLimit: showWordLimit(field),
        ...field.props,
      };
    case "password":
      return {
        ...baseProps,
        type: "password",
        showPassword: true,
        maxlength: getMaxlength(field),
        showWordLimit: showWordLimit(field),
        ...field.props,
      };
    case "textarea":
      return {
        ...baseProps,
        type: "textarea",
        autosize: field.autosize || { minRows: 3, maxRows: 6 },
        maxlength: getMaxlength(field),
        showWordLimit: showWordLimit(field),
        ...field.props,
      };
    case "number":
      return {
        min: field.min,
        max: field.max,
        step: field.step || 1,
        "controls-position": field.controlsPosition || "right",
        precision: field.precision,
        ...field.props,
      };
    case "select":
      return {
        ...baseProps,
        placeholder: field.placeholder || `请选择${field.label}`,
        multiple: field.multiple,
        filterable: field.filterable,
        ...field.props,
      };
    case "date":
      return {
        ...baseProps,
        type: "date",
        placeholder: field.placeholder || `请选择${field.label}`,
        format: field.format || "YYYY-MM-DD",
        "value-format": field.valueFormat || "YYYY-MM-DD",
        ...field.props,
      };
    case "datetime":
      return {
        ...baseProps,
        type: "datetime",
        placeholder: field.placeholder || `请选择${field.label}`,
        format: field.format || "YYYY-MM-DD HH:mm:ss",
        "value-format": field.valueFormat || "YYYY-MM-DD HH:mm:ss",
        ...field.props,
      };
    case "date-range":
      return {
        ...baseProps,
        type: "daterange",
        "range-separator": field.rangeSeparator || "至",
        "start-placeholder": field.placeholder?.[0] || "开始日期",
        "end-placeholder": field.placeholder?.[1] || "结束日期",
        format: field.format || "YYYY-MM-DD",
        "value-format": field.valueFormat || "YYYY-MM-DD",
        shortcuts: field.shortcuts,
        ...field.props,
      };
    case "datetime-range":
      return {
        ...baseProps,
        type: "datetimerange",
        "range-separator": field.rangeSeparator || "至",
        "start-placeholder": field.placeholder?.[0] || "开始时间",
        "end-placeholder": field.placeholder?.[1] || "结束时间",
        format: field.format || "YYYY-MM-DD HH:mm:ss",
        "value-format": field.valueFormat || "YYYY-MM-DD HH:mm:ss",
        shortcuts: field.shortcuts,
        ...field.props,
      };
    case "switch":
      return {
        activeText: field.activeText,
        inactiveText: field.inactiveText,
        activeValue: field.activeValue ?? true,
        inactiveValue: field.inactiveValue ?? false,
        ...field.props,
      };
    case "radio":
      return {
        ...field.props,
      };
    case "checkbox":
      return {
        ...field.props,
      };
    case "tag-input":
      return {
        placeholder: field.placeholder || `请输入${field.label}`,
        max: field.max,
        deduplicate: field.deduplicate !== false,
        ...field.props,
      };
    case "slider":
      return {
        min: field.min || 0,
        max: field.max || 100,
        step: field.step || 1,
        showInput: field.showInput,
        showStops: field.showStops,
        range: field.range,
        ...field.props,
      };
    case "rate":
      return {
        max: field.max || 5,
        allowHalf: field.allowHalf,
        showText: field.showText,
        ...field.props,
      };
    case "color":
      return {
        showAlpha: field.showAlpha,
        colorFormat: field.colorFormat || "hex",
        ...field.props,
      };
    case "upload":
      return {
        action: field.action,
        multiple: field.multiple,
        limit: field.limit,
        accept: field.accept,
        ...field.props,
      };
    default:
      return {
        ...baseProps,
        maxlength: getMaxlength(field),
        showWordLimit: showWordLimit(field),
        ...field.props,
      };
  }
};

// 初始化表单数据（不设置验证规则）
const initFormDataOnly = () => {
  // 先清空 formData，避免残留数据
  Object.keys(formData).forEach((key) => {
    delete formData[key];
  });

  if (props.fields) {
    props.fields.forEach((field) => {
      // 优先使用 initialData（编辑模式）
      if (props.initialData && props.initialData[field.prop] !== undefined) {
        formData[field.prop] = props.initialData[field.prop];
      } else if (field.defaultValue !== undefined) {
        // 其次使用字段的默认值
        formData[field.prop] = field.defaultValue;
      } else {
        // 最后根据类型设置默认值
        switch (field.type) {
          case "tag-input":
          case "checkbox":
            formData[field.prop] = [];
            break;
          case "number":
            formData[field.prop] = null;
            break;
          case "switch":
            formData[field.prop] = field.inactiveValue ?? false;
            break;
          case "date-range":
          case "datetime-range":
            formData[field.prop] = null;
            break;
          default:
            formData[field.prop] = "";
        }
      }
    });
  }

  // 如果 initialData 中有其他字段（如插槽中使用的字段），也添加到 formData
  if (props.initialData) {
    Object.keys(props.initialData).forEach((key) => {
      if (formData[key] === undefined) {
        formData[key] = props.initialData[key];
      }
    });
  }

  // 初始化插槽字段的数据（确保插槽中使用的字段在 formData 中存在）
  if (props.slotFields && props.slotFields.length > 0) {
    props.slotFields.forEach((field) => {
      // 如果 formData 中还没有这个字段，初始化它
      if (formData[field.prop] === undefined) {
        // 优先使用 initialData
        if (props.initialData && props.initialData[field.prop] !== undefined) {
          formData[field.prop] = props.initialData[field.prop];
        } else if (field.defaultValue !== undefined) {
          // 其次使用字段的默认值
          formData[field.prop] = field.defaultValue;
        } else {
          // 默认设置为空字符串
          formData[field.prop] = "";
        }
      }
    });
  }
};

// 设置验证规则
const initFormRules = () => {
  // 先清空之前的验证规则
  Object.keys(formRules).forEach((key) => {
    delete formRules[key];
  });

  // 确保 formRules 是响应式对象
  if (!formRules || typeof formRules !== "object") {
    Object.assign(formRules, {});
  }

  if (props.fields) {
    props.fields.forEach((field) => {
      const rules = [];

      // 如果提供了完整的 rules 数组，直接使用
      if (field.rules && Array.isArray(field.rules)) {
        // 确保所有规则的 trigger 正确设置，并确保 message 是中文
        formRules[field.prop] = field.rules.map((rule) => ({
          ...rule,
          trigger:
            rule.trigger || (field.type === "select" ? "change" : "blur"),
          // 如果是必填规则但没有 message，使用中文提示
          message:
            rule.message || (rule.required ? "必填项不能为空" : rule.message),
        }));
      } else {
        // 必填规则（如果设置了 required: true）
        // validators.js 中的校验函数在值为空时会放行，所以需要单独的必填规则
        if (field.required) {
          rules.push({
            required: true,
            message: "必填项不能为空",
            trigger: field.type === "select" ? "change" : "blur", // select 使用 change，其他使用 blur
          });
        }

        // 如果提供了 rule 或 validator（校验器函数）
        // validators.js 中的校验函数已经包含了错误提示信息
        if (field.rule || field.validator) {
          const validator = field.rule || field.validator;
          // 如果 validator 是字符串，从 validators 对象中获取
          if (typeof validator === "string" && validators[validator]) {
            rules.push({
              validator: validators[validator],
              trigger: field.type === "select" ? "change" : "blur", // select 使用 change，其他使用 blur
            });
          } else if (typeof validator === "function") {
            // 如果是函数，直接使用
            rules.push({
              validator: validator,
              trigger: field.type === "select" ? "change" : "blur", // select 使用 change，其他使用 blur
            });
          }
        }

        // 如果有规则，设置到 formRules
        if (rules.length > 0) {
          formRules[field.prop] = rules;
        }
      }
    });
  }

  // 处理插槽字段的验证规则
  if (props.slotFields && props.slotFields.length > 0) {
    props.slotFields.forEach((field) => {
      const rules = [];

      // 如果提供了完整的 rules 数组，直接使用
      if (field.rules && Array.isArray(field.rules)) {
        formRules[field.prop] = field.rules.map((rule) => ({
          ...rule,
          trigger: rule.trigger || "blur",
        }));
      } else {
        // 必填规则
        if (field.required) {
          rules.push({
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          });
        }

        // 如果提供了 rule 或 validator（校验器函数）
        if (field.rule || field.validator) {
          const validator = field.rule || field.validator;
          if (typeof validator === "string" && validators[validator]) {
            rules.push({
              validator: validators[validator],
              trigger: "blur",
            });
          } else if (typeof validator === "function") {
            rules.push({
              validator: validator,
              trigger: "blur",
            });
          }
        }

        // 如果有规则，设置到 formRules
        if (rules.length > 0) {
          formRules[field.prop] = rules;
        }
      }
    });
  }
};

// 初始化表单数据（兼容旧代码）
const initFormData = () => {
  initFormDataOnly();
  initFormRules();
};

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    // 确保验证规则已设置（特别是插槽字段）
    initFormRules();

    // 等待下一个 tick 确保规则已应用
    await nextTick();

    await formRef.value.validate();
    // 使用 toRaw 确保获取最新的响应式数据
    const submitData = { ...formData };
    emit("submit", submitData);
  } catch (error) {
    console.error("表单验证失败:", error);
    // 验证失败时不关闭抽屉
  }
};

// 取消
const handleCancel = () => {
  emit("cancel");
  visible.value = false;
};

// 关闭
const handleClose = () => {
  emit("close");
  // 重置表单
  formRef.value?.resetFields();
};

// 监听 fields 变化，只在抽屉打开时重新初始化
watch(
  () => props.fields,
  () => {
    if (visible.value) {
      initFormData();
    }
  },
  { deep: true }
);

// 监听 initialData 变化，编辑模式时更新表单数据
watch(
  () => props.initialData,
  () => {
    if (visible.value && props.initialData) {
      initFormData();
    }
  },
  { deep: true }
);

// 监听 visible 变化，打开时初始化
watch(
  () => visible.value,
  (val) => {
    if (val) {
      // 打开时先初始化表单数据（不设置验证规则）
      // 确保 formData 对象存在
      if (!formData || typeof formData !== "object") {
        Object.assign(formData, {});
      }
      initFormDataOnly();

      // 先设置验证规则，确保失去焦点时能正确触发验证
      initFormRules();

      // 延迟清除验证状态，避免初始化时显示错误
      nextTick(() => {
        if (formRef.value) {
          formRef.value.clearValidate();
        }
      });
    } else {
      // 关闭时重置表单并清除验证
      nextTick(() => {
        if (formRef.value) {
          formRef.value.resetFields();
          formRef.value.clearValidate();
        }
      });
    }
  },
  { immediate: false }
);
</script>

<style scoped>
/* .drawer-form {
  padding: 20px;
} */

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e4e7ed;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-input),
:deep(.el-select),
:deep(.el-date-picker),
:deep(.el-input-number) {
  width: 100%;
}
</style>
