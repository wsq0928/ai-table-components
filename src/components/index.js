// 导入主表格组件
import AiTableModules from './AiTableModules/index.vue'
import SearchForm from './AiTableModules/search-form.vue'
import SettingsHeaders from './AiTableModules/settings-headers.vue'
import ActionButtons from './AiTableModules/action-buttons.vue'
import MultiTooltips from './AiTableModules/multi-tooltips.vue'
import SimpleDetail from './AiTableModules/simple-detail.vue'
import ImportComponent from './AiTableModules/import.vue'
import TagInput from './AiTableModules/tag-input.vue'

// 导入表单组件
import AddReuse from './AddReuse/index.vue'

// 导入工具
import validators from '../utils/validators.js'

// 组件列表
const components = [
  AiTableModules,
  SearchForm,
  SettingsHeaders,
  ActionButtons,
  MultiTooltips,
  SimpleDetail,
  ImportComponent,
  TagInput,
  AddReuse
]

// 定义 install 方法，接收 Vue 作为参数
const install = function(app) {
  // 注册所有组件
  components.forEach(component => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
  
  // 注册主要组件（使用固定名称）
  app.component('AiTableModules', AiTableModules)
  app.component('AddReuse', AddReuse)
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // 完整安装方法
  install,
  
  // 主表格组件
  AiTableModules,
  SearchForm,
  SettingsHeaders,
  ActionButtons,
  MultiTooltips,
  SimpleDetail,
  ImportComponent,
  TagInput,
  
  // 表单组件
  AddReuse,
  
  // 工具
  validators
}

// 默认导出
export default {
  install,
  AiTableModules,
  AddReuse,
  SearchForm,
  SettingsHeaders,
  ActionButtons,
  MultiTooltips,
  SimpleDetail,
  ImportComponent,
  TagInput,
  validators
}
