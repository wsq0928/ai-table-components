// 内置校验规则配置
export const builtInRules = {
  name: [
    { pattern: /^[\u4e00-\u9fa5a-zA-Z\s]{2,20}$/, message: '只能输入2-20个字符，不允许特殊字符', trigger: 'blur' }
  ],
  ip: [
    { pattern: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, message: '请输入正确的IP地址', trigger: 'blur' }
  ],
  mac: [
    { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: '请输入正确的MAC地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  path: [
    { pattern: /^\/[^\s]*$/, message: '请输入正确的路径格式', trigger: 'blur' }
  ]
}

/**
 * 获取内置校验规则
 * @param {string} ruleName - 规则名称
 * @returns {Array} 校验规则数组
 */
export function getBuiltInRule(ruleName) {
  return builtInRules[ruleName] || null
}

/**
 * 获取所有内置规则名称
 * @returns {Array} 规则名称数组
 */
export function getBuiltInRuleNames() {
  return Object.keys(builtInRules)
}
