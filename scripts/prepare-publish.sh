#!/bin/bash

###############################################################################
# 发布准备脚本
# 自动执行发布前的所有检查和准备工作
###############################################################################

set -e  # 遇到错误立即退出

echo "🚀 开始发布准备流程..."
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 步骤 1: 检查 Node.js 版本
echo "📋 步骤 1/7: 检查 Node.js 版本..."
NODE_VERSION=$(node -v)
echo "   Node.js 版本: $NODE_VERSION"
echo ""

# 步骤 2: 检查 package.json 必填字段
echo "📋 步骤 2/7: 检查 package.json 配置..."

check_package_field() {
  local field=$1
  local value=$(node -p "require('./package.json').$field" 2>/dev/null || echo "")
  
  if [ -z "$value" ] || [ "$value" = "undefined" ] || [ "$value" = "" ]; then
    echo -e "   ${RED}❌ $field 未填写${NC}"
    return 1
  else
    echo -e "   ${GREEN}✅ $field: $value${NC}"
    return 0
  fi
}

ALL_FIELDS_OK=true
check_package_field "name" || ALL_FIELDS_OK=false
check_package_field "version" || ALL_FIELDS_OK=false
check_package_field "description" || ALL_FIELDS_OK=false

if [ "$ALL_FIELDS_OK" = false ]; then
  echo ""
  echo -e "${RED}❌ package.json 配置不完整，请补充必填字段${NC}"
  exit 1
fi

echo ""

# 步骤 3: 清理旧的构建文件
echo "📋 步骤 3/7: 清理旧的构建文件..."
if [ -d "dist" ]; then
  rm -rf dist
  echo "   ✅ 已清理 dist 目录"
else
  echo "   ℹ️  dist 目录不存在，跳过清理"
fi
echo ""

# 步骤 4: 安装依赖
echo "📋 步骤 4/7: 检查依赖..."
if [ ! -d "node_modules" ]; then
  echo "   📦 安装依赖中..."
  npm install
  echo "   ✅ 依赖安装完成"
else
  echo "   ✅ 依赖已安装"
fi
echo ""

# 步骤 5: 执行构建
echo "📋 步骤 5/7: 执行构建..."
npm run build

if [ $? -eq 0 ]; then
  echo "   ✅ 构建成功"
else
  echo -e "   ${RED}❌ 构建失败${NC}"
  exit 1
fi
echo ""

# 步骤 6: 检查构建产物
echo "📋 步骤 6/7: 检查构建产物..."
if [ -f "scripts/check-build.js" ]; then
  node scripts/check-build.js
else
  # 简单检查
  if [ -f "dist/ai-table-components.es.js" ] && [ -f "dist/ai-table-components.umd.js" ]; then
    echo "   ✅ 构建产物检查通过"
  else
    echo -e "   ${RED}❌ 构建产物不完整${NC}"
    exit 1
  fi
fi
echo ""

# 步骤 7: 预览打包内容
echo "📋 步骤 7/7: 预览打包内容..."
echo "   将要发布的文件："
npm pack --dry-run 2>&1 | grep -E "^\s+\d+\.\d+\s+[kMG]?B" | head -20
echo ""

# 完成
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ 所有准备工作已完成！${NC}"
echo ""
echo "📦 接下来可以执行："
echo ""
echo -e "   ${YELLOW}npm pack${NC}        - 创建测试包（推荐先测试）"
echo -e "   ${YELLOW}npm publish${NC}     - 发布到 NPM"
echo ""
echo "⚠️  发布前建议："
echo "   1. 在测试项目中安装测试包验证功能"
echo "   2. 确认版本号正确"
echo "   3. 确认 CHANGELOG.md 已更新"
echo ""
echo "═══════════════════════════════════════════════════════════"
