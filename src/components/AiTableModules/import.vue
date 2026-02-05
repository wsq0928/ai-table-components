<template>
  <div class="import-component">
    <el-button
      v-if="showButton"
      :type="buttonType"
      :icon="Upload"
      @click="openDialog"
    >
      {{ buttonText }}
    </el-button>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :width="dialogWidth"
      :before-close="handleCancel"
    >
      <el-upload
        ref="uploadRef"
        :file-list="fileList"
        class="upload-file"
        action="#"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
        :on-exceed="handleExceed"
        :limit="limit"
        :auto-upload="false"
        :accept="accept"
        :multiple="multiple"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          请将文件拖拽至此处 <em>或点击选择文件上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip" style="color: red">
            {{ tipText }}
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" :loading="uploading" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Upload, UploadFilled } from "@element-plus/icons-vue";
import axios from "axios";

const props = defineProps({
  // 上传接口地址
  uploadApi: {
    type: String,
    required: true,
  },
  // 是否显示按钮
  showButton: {
    type: Boolean,
    default: true,
  },
  // 按钮文字
  buttonText: {
    type: String,
    default: "导入",
  },
  // 按钮类型
  buttonType: {
    type: String,
    default: "primary",
  },
  // 对话框标题
  dialogTitle: {
    type: String,
    default: "文件上传",
  },
  // 对话框宽度
  dialogWidth: {
    type: String,
    default: "45%",
  },
  // 允许的文件类型
  accept: {
    type: String,
    default: ".csv,.xlsx,.xls",
  },
  // 文件大小限制（MB）
  maxSize: {
    type: Number,
    default: 10,
  },
  // 是否允许多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 最大上传数量
  limit: {
    type: Number,
    default: 1,
  },
  // 提示文字
  tipText: {
    type: String,
    default: "请注意：您可以在此处拖拽文件，但文件夹不支持（10MB以内）",
  },
  // 额外的请求参数
  extraParams: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["success", "error", "cancel"]);

const dialogVisible = ref(false);
const fileList = ref([]);
const uploadRef = ref();
const currentFile = ref(null);
const uploading = ref(false);

// 打开对话框
const openDialog = () => {
  dialogVisible.value = true;
};

// 验证文件大小
const validateFileSize = (file) => {
  const isLT = file.size / 1024 / 1024 < props.maxSize;
  if (!isLT) {
    ElMessage.error(`上传的文件大小不能超过 ${props.maxSize}MB!`);
    uploadRef.value?.clearFiles();
  }
  return isLT;
};

// 验证文件名
const validateFileName = (name) => {
  const parts = name.split(".");
  return parts.length >= 2;
};

// 文件改变时
const handleFileChange = (file, files) => {
  if (validateFileSize(file.raw)) {
    if (validateFileName(file.raw.name)) {
      fileList.value = files;
      currentFile.value = file.raw;
    } else {
      fileList.value = [];
      ElMessage.warning("请选择有效的文件");
    }
  }
};

// 移除文件
const handleFileRemove = () => {
  fileList.value = [];
  currentFile.value = null;
};

// 超出限制
const handleExceed = (files) => {
  uploadRef.value?.clearFiles();
  const file = files[0];
  uploadRef.value?.handleStart(file);
};

// 确认上传
const handleConfirm = async () => {
  if (!currentFile.value) {
    ElMessage.warning("请先选择文件");
    return;
  }

  uploading.value = true;
  const formData = new FormData();
  formData.append("file", currentFile.value);

  // 添加额外参数
  Object.keys(props.extraParams).forEach((key) => {
    formData.append(key, props.extraParams[key]);
  });

  try {
    const response = await axios.post(props.uploadApi, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    ElMessage.success("上传文件成功");
    emit("success", response.data);
    handleCancel();
  } catch (error) {
    ElMessage.error(error.message || "上传失败");
    emit("error", error);
  } finally {
    uploading.value = false;
  }
};

// 取消
const handleCancel = () => {
  dialogVisible.value = false;
  handleFileRemove();
  emit("cancel");
};

// 暴露方法
defineExpose({
  openDialog,
  closeDialog: handleCancel,
});
</script>

<style scoped>
.import-component {
  display: inline-block;
}

.upload-file {
  width: 100%;
}

:deep(.el-upload-dragger) {
  padding: 40px;
}
</style>
