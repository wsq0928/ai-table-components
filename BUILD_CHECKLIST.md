# 构建检查清单

在构建和发布之前，请按照此清单进行检查。

## 📋 构建前检查

### 1. 环境检查

```bash
# 检查 Node.js 版本（建议 16.x 或更高）
node -v

# 检查 npm 版本
npm -v
```

### 2. 依赖安装

```bash
# 清理旧的依赖
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install
```

### 3. 文件检查

- [ ] 所有组件文件都在 `src/components/` 目录
- [ ] `src/components/index.js` 入口文件存在且正确
- [ ] `src/utils/validators.js` 工具文件存在
- [ ] `package.json` 配置正确
- [ ] `vite.config.js` 配置正确

### 4. package.json 检查

确保以下字段已正确填写：

```json
{
  "name": "ai-table-components",           // ✅ 包名
  "version": "1.0.0",                      // ✅ 版本号
  "description": "...",                    // ✅ 描述
  "main": "./dist/ai-table-components.umd.js",
  "module": "./dist/ai-table-components.es.js",
  "author": "",                            // ⚠️ 需要填写
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": ""                              // ⚠️ 需要填写
  },
  "bugs": {
    "url": ""                              // ⚠️ 需要填写
  },
  "homepage": ""                           // ⚠️ 需要填写
}
```

## 🔨 执行构建

### 1. 清理旧的构建文件

```bash
rm -rf dist
```

### 2. 执行构建命令

```bash
npm run build
```

### 3. 检查构建输出

构建成功后，应该在 `dist/` 目录看到以下文件：

```
dist/
├── ai-table-components.es.js      # ES 模块格式（推荐）
├── ai-table-components.umd.js     # UMD 格式（兼容性）
└── ai-table-components.css        # 样式文件
```

验证文件：

```bash
# 列出构建文件
ls -lh dist/

# 查看文件大小
du -sh dist/*
```

### 4. 检查构建产物

- [ ] `.es.js` 文件存在且大小合理
- [ ] `.umd.js` 文件存在且大小合理
- [ ] `.css` 文件存在且大小合理
- [ ] 没有多余的文件

## 🧪 构建后测试

### 1. 本地测试

#### 方法 1: 使用 npm pack

```bash
# 创建测试包
npm pack

# 会生成 ai-table-components-1.0.0.tgz
```

在测试项目中安装：

```bash
cd /path/to/test-project
npm install /path/to/ai-table-components-1.0.0.tgz
```

#### 方法 2: 使用 npm link

```bash
# 在组件库目录
npm link

# 在测试项目目录
npm link ai-table-components
```

### 2. 测试检查清单

在测试项目中验证：

- [ ] 包可以正常安装
- [ ] 导入组件无错误
- [ ] 样式正常显示
- [ ] 组件功能正常工作
- [ ] 没有控制台错误

### 3. 测试代码示例

```javascript
// main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import AiTableComponents from 'ai-table-components'
import 'ai-table-components/dist/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(AiTableComponents)
app.mount('#app')
```

```vue
<!-- TestPage.vue -->
<template>
  <AiTableModules :data="data" :headers="headers" />
</template>

<script setup>
import { ref } from 'vue'
import { AiTableModules } from 'ai-table-components'

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

## 📦 打包检查

### 1. 检查打包内容

```bash
# 查看将要发布的文件
npm pack --dry-run
```

确认只包含必要文件：

- [ ] `dist/` 目录
- [ ] `README.md`
- [ ] `LICENSE`
- [ ] `package.json`
- [ ] 没有 `src/`、`examples/`、`node_modules/` 等

### 2. 检查 .npmignore

确保 `.npmignore` 正确配置，排除不需要发布的文件。

## ✅ 发布前最终检查

- [ ] 版本号已更新
- [ ] CHANGELOG.md 已更新
- [ ] README.md 内容正确
- [ ] 所有文档已更新
- [ ] 代码已提交到 Git（如果使用）
- [ ] 已创建 Git tag（如果使用）
- [ ] 构建成功无错误
- [ ] 本地测试通过
- [ ] 准备好发布

## 🚀 发布

准备就绪后，执行发布：

```bash
# 登录 npm（如果还未登录）
npm login

# 发布
npm publish
```

## 🔍 发布后验证

```bash
# 查看包信息
npm view ai-table-components

# 查看版本
npm view ai-table-components version

# 查看所有版本
npm view ai-table-components versions
```

访问 NPM 网站验证：
```
https://www.npmjs.com/package/ai-table-components
```

## ⚠️ 常见问题

### 构建失败

```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build
```

### 样式文件未生成

检查 `vite.config.js` 中的配置是否正确。

### 模块导入错误

检查 `src/components/index.js` 中的导出是否正确。

### 发布失败

```bash
# 检查登录状态
npm whoami

# 检查 npm 源
npm config get registry

# 应该是 https://registry.npmjs.org/
```

## 📝 注意事项

1. **首次发布**：确保包名在 NPM 上未被占用
2. **版本号**：遵循语义化版本规范
3. **文档**：确保文档与代码同步
4. **测试**：充分测试后再发布
5. **回滚**：发布后 24 小时内可以撤销

## 🎉 完成

恭喜！您的包已成功构建和发布！

下一步：
- 在社区分享
- 收集用户反馈
- 持续改进

---

**祝构建顺利！**
