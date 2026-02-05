# 快速开始指南

这是一个快速上手指南，帮助您快速构建和发布 ai-table-components。

## 🚀 5 分钟快速开始

### 步骤 1: 完善配置（1 分钟）

打开 `package.json`，填写以下信息：

```json
{
  "author": "你的名字 <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ai-table-components"
  },
  "bugs": {
    "url": "https://github.com/yourusername/ai-table-components/issues"
  },
  "homepage": "https://github.com/yourusername/ai-table-components#readme"
}
```

💡 如果暂时没有 GitHub 仓库，可以先留空，稍后再填。

### 步骤 2: 安装依赖（2 分钟）

```bash
cd ai-table-components
npm install
```

等待依赖安装完成...

### 步骤 3: 构建项目（1 分钟）

```bash
npm run build
```

构建成功后，会在 `dist/` 目录生成以下文件：
- `ai-table-components.es.js`
- `ai-table-components.umd.js`
- `ai-table-components.css`

### 步骤 4: 检查构建结果（30 秒）

```bash
npm run check-build
```

如果看到 ✅ 全部通过，说明构建成功！

### 步骤 5: 测试打包（30 秒）

```bash
npm pack
```

会生成 `ai-table-components-1.0.0.tgz` 文件。

---

## 🧪 在项目中测试

### 方法 1: 使用生成的 .tgz 文件

在您的测试项目中：

```bash
npm install /path/to/ai-table-components-1.0.0.tgz
```

### 方法 2: 使用 npm link

在 ai-table-components 目录：
```bash
npm link
```

在测试项目目录：
```bash
npm link ai-table-components
```

### 测试代码

```vue
<template>
  <AiTableModules :data="data" :headers="headers" />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const data = ref([
  { id: 1, name: '测试', age: 25 }
])

const headers = ref([
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
])
</script>
```

---

## 📦 发布到 NPM

### 首次发布

1. **注册 NPM 账号**（如果还没有）
   - 访问 https://www.npmjs.com/signup
   - 填写注册信息

2. **登录 NPM**
   ```bash
   npm login
   ```
   输入用户名、密码和邮箱

3. **检查包名是否可用**
   ```bash
   npm view ai-table-components
   ```
   如果提示 404，说明包名可用

4. **发布**
   ```bash
   npm publish
   ```

5. **验证发布**
   ```bash
   npm view ai-table-components
   ```

### 更新版本

```bash
# Bug 修复
npm version patch  # 1.0.0 -> 1.0.1

# 新功能
npm version minor  # 1.0.0 -> 1.1.0

# 重大更新
npm version major  # 1.0.0 -> 2.0.0

# 然后发布
npm publish
```

---

## 🎯 一键准备发布（推荐）

我们提供了自动化脚本，一键完成所有准备工作：

```bash
npm run prepare-publish
```

这个脚本会自动：
1. ✅ 检查 Node.js 版本
2. ✅ 检查 package.json 配置
3. ✅ 清理旧的构建文件
4. ✅ 安装依赖
5. ✅ 执行构建
6. ✅ 检查构建产物
7. ✅ 预览打包内容

全部通过后，就可以直接 `npm publish` 了！

---

## ⚠️ 常见问题

### 1. 构建失败？

```bash
# 清理后重试
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### 2. 发布失败：403 Forbidden？

```bash
# 检查登录状态
npm whoami

# 重新登录
npm logout
npm login
```

### 3. 发布失败：包名已存在？

修改 `package.json` 中的 `name` 字段，使用不同的包名。

建议使用带作用域的包名：`@yourusername/ai-table-components`

### 4. 样式不生效？

确保在项目中引入了样式文件：
```javascript
import 'ai-table-components/dist/style.css'
```

---

## 📚 更多文档

- **完整文档**: [README.md](./README.md)
- **API 文档**: [docs/API.md](./docs/API.md)
- **使用指南**: [docs/GUIDE.md](./docs/GUIDE.md)
- **发布指南**: [PUBLISH.md](./PUBLISH.md)
- **构建检查**: [BUILD_CHECKLIST.md](./BUILD_CHECKLIST.md)
- **常见问题**: [FAQ.md](./FAQ.md)

---

## 🎉 完成！

恭喜您成功构建和发布了 ai-table-components！

如有问题，欢迎提交 Issue。

**祝使用愉快！** 🚀
