# AI Table Components 文档

欢迎使用 AI Table Components 组件库！

## 📖 文档导航

### 快速开始

- [README](../README.md) - 项目介绍和快速开始
- [使用指南](./GUIDE.md) - 详细的使用教程和示例
- [API 文档](./API.md) - 完整的 API 参考

### 更新日志

- [CHANGELOG](../CHANGELOG.md) - 版本更新记录

### 许可证

- [LICENSE](../LICENSE) - MIT 许可证

## 🚀 快速链接

### 基础使用

1. **安装**
   ```bash
   npm install ai-table-components
   ```

2. **引入**
   ```javascript
   import { AiTableModules } from 'ai-table-components'
   import 'ai-table-components/dist/style.css'
   ```

3. **使用**
   ```vue
   <AiTableModules :data="data" :headers="headers" />
   ```

### 主要组件

- **AiTableModules** - 主表格组件
  - 表格展示
  - 搜索功能
  - 分页功能
  - 排序功能
  - 批量操作

- **AddReuse** - 表单组件
  - 新增数据
  - 编辑数据
  - 表单验证

- **SearchForm** - 搜索表单
- **ImportComponent** - 数据导入
- **TagInput** - 标签输入

### 工具函数

- **validators** - 表单验证器
  - 邮箱验证
  - 手机号验证
  - IP 地址验证
  - 端口号验证
  - 更多...

## 📝 文档结构

```
docs/
├── README.md          # 文档导航（本文件）
├── GUIDE.md          # 使用指南
└── API.md            # API 文档
```

## 🔗 相关资源

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Vite 官方文档](https://vitejs.dev/)

## 💬 获取帮助

如果您在使用过程中遇到问题：

1. 查看 [使用指南](./GUIDE.md) 中的常见问题章节
2. 查看 [API 文档](./API.md) 确认参数使用
3. 提交 [Issue](../../issues)
4. 发送邮件联系我们

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进文档！

## 📄 许可

本项目采用 MIT 许可证 - 查看 [LICENSE](../LICENSE) 了解详情。
