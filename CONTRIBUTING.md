# 贡献指南

感谢您考虑为 AI Table Components 做出贡献！

## 🤝 如何贡献

### 报告 Bug

如果您发现了 bug，请：

1. 检查 [Issues](../../issues) 确认问题是否已被报告
2. 如果是新问题，创建一个新的 Issue，包含：
   - 清晰的标题和描述
   - 复现步骤
   - 期望的行为
   - 实际的行为
   - 您的环境信息（浏览器、Vue 版本等）
   - 如果可能，提供代码示例或截图

### 提出新功能

如果您有新功能的建议：

1. 先创建一个 Issue 讨论该功能
2. 说明功能的用途和价值
3. 等待维护者反馈

### 提交代码

#### 准备工作

1. Fork 本仓库
2. 克隆您的 fork：
   ```bash
   git clone https://github.com/your-username/ai-table-components.git
   cd ai-table-components
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

#### 开发

1. 进行您的修改
2. 确保代码风格一致
3. 添加必要的注释
4. 测试您的修改

#### 提交

1. 提交您的更改：
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # 或
   git commit -m "fix: fix bug description"
   ```

2. 推送到您的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```

3. 在 GitHub 上创建 Pull Request

## 📝 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: Bug 修复
- **docs**: 文档更新
- **style**: 代码格式（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 性能优化
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回滚

### 示例

```bash
feat(table): add export to excel feature
fix(form): fix validation error for email field
docs: update README with new examples
style: format code with prettier
refactor(search): optimize search performance
perf(table): improve rendering speed for large datasets
test: add unit tests for validators
chore: update dependencies
```

## 🔍 代码规范

### JavaScript/Vue 代码风格

- 使用 2 空格缩进
- 使用单引号
- 每行末尾不加分号
- Vue 组件使用 PascalCase 命名
- 普通变量使用 camelCase 命名
- 常量使用 UPPER_CASE 命名

### Vue 组件规范

```vue
<template>
  <div class="component-name">
    <!-- 内容 -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

// Emits
const emit = defineEmits(['change', 'update'])

// State
const loading = ref(false)

// Computed
const displayData = computed(() => {
  // ...
})

// Methods
const handleClick = () => {
  // ...
}
</script>

<style scoped>
.component-name {
  /* 样式 */
}
</style>
```

### 命名约定

- **组件文件名**: PascalCase (如 `AiTableModules.vue`)
- **工具文件名**: kebab-case (如 `validators.js`)
- **组件 Props**: camelCase
- **事件名**: kebab-case

## 🧪 测试

目前项目还没有测试框架，我们欢迎您帮助建立测试体系！

如果您添加新功能，请确保：

1. 在本地测试所有功能正常
2. 测试不同的使用场景
3. 检查浏览器控制台没有错误
4. 在不同浏览器中测试（如果可能）

## 📚 文档

如果您的更改涉及到：

- 新功能：请更新 README.md 和 API.md
- API 变更：请更新 API.md
- 使用方式变更：请更新 GUIDE.md
- 重要更新：请在 CHANGELOG.md 中记录

## 🔄 Pull Request 流程

1. 确保您的代码符合项目的代码规范
2. 更新相关文档
3. 在 Pull Request 中清楚地描述您的更改
4. 关联相关的 Issue（如果有）
5. 等待维护者审查
6. 根据反馈进行必要的修改

### Pull Request 标题规范

与提交信息相同，使用 Conventional Commits 格式：

```
feat: add new feature
fix: resolve issue #123
docs: update installation guide
```

### Pull Request 描述模板

```markdown
## 描述
简要描述您的更改

## 类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码优化
- [ ] 其他

## 相关 Issue
关闭 #issue_number

## 更改内容
- 添加了...
- 修复了...
- 优化了...

## 测试
描述您如何测试这些更改

## 截图（如果适用）
添加截图帮助说明

## 检查清单
- [ ] 代码符合项目规范
- [ ] 已更新相关文档
- [ ] 已在本地测试
- [ ] 提交信息符合规范
```

## ❓ 问题和帮助

如果您有任何问题或需要帮助：

1. 查看现有的 [Issues](../../issues)
2. 查看 [文档](./docs/)
3. 创建新的 Issue 提问

## 📜 许可证

通过向此项目提交贡献，您同意您的贡献将在 MIT 许可证下授权。

## 🙏 感谢

感谢您为 AI Table Components 做出贡献！

每一个贡献，无论大小，都会让这个项目变得更好。

---

再次感谢！❤️
