#!/usr/bin/env node

/**
 * 构建检查脚本
 * 检查构建产物是否正确生成
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 开始检查构建产物...\n')

const distDir = path.resolve(__dirname, '../dist')
const requiredFiles = [
  'ai-table-components.es.js',
  'ai-table-components.umd.js',
  'ai-table-components.css'
]

let allValid = true

// 检查 dist 目录是否存在
if (!fs.existsSync(distDir)) {
  console.error('❌ dist 目录不存在！请先运行 npm run build')
  process.exit(1)
}

console.log('✅ dist 目录存在\n')

// 检查必需的文件
console.log('📋 检查必需文件：\n')
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file)
  const exists = fs.existsSync(filePath)
  
  if (exists) {
    const stats = fs.statSync(filePath)
    const sizeInKB = (stats.size / 1024).toFixed(2)
    console.log(`  ✅ ${file} (${sizeInKB} KB)`)
  } else {
    console.log(`  ❌ ${file} - 文件不存在！`)
    allValid = false
  }
})

console.log('\n')

// 检查文件大小
const esFile = path.join(distDir, 'ai-table-components.es.js')
if (fs.existsSync(esFile)) {
  const stats = fs.statSync(esFile)
  const sizeInKB = stats.size / 1024
  
  console.log('📊 文件大小检查：\n')
  
  if (sizeInKB < 10) {
    console.log('  ⚠️  警告：ES 模块文件过小，可能构建不完整')
    allValid = false
  } else if (sizeInKB > 5000) {
    console.log('  ⚠️  警告：ES 模块文件过大，可能包含了不必要的依赖')
  } else {
    console.log(`  ✅ ES 模块文件大小合理 (${sizeInKB.toFixed(2)} KB)`)
  }
}

console.log('\n')

// 最终结果
if (allValid) {
  console.log('✅ 所有检查通过！构建产物正常。\n')
  console.log('📦 可以执行以下操作：')
  console.log('   1. npm pack          - 打包测试')
  console.log('   2. npm publish       - 发布到 NPM')
  process.exit(0)
} else {
  console.log('❌ 检查发现问题，请修复后重新构建。\n')
  process.exit(1)
}
