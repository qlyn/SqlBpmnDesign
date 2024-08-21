/**
 * 定义PaletteProvider左侧工具栏的工具图形和对应中文的映射
 */
export default class BpmData {
  constructor () {
    this.controls = [] // 设计器控件
    this.init()
  }
  init () {
    this.controls = [
      //第一分组：tools分组的按钮
      { action: 'hand-tool', title: '抓手'},
      { action: 'lasso-tool', title: '套索'},
      { action: 'space-tool', title: '空间'},
      { action: 'global-connect-tool', title: '全局连接'},
      //第二分组：event分组的按钮
      { action: 'create.start-event', title: '开始' },
      { action: 'create.intermediate-event', title: '中间' },
      { action: 'create.end-event', title: '结束' },
      //第三分组：gateway分组的按钮
      { action: 'create.exclusive-gateway', title: '网关/条件' },
      //第四分组：activity分组的按钮
      { action: 'create.task', title: '任务' },


      { action: 'create.user-task', title: '用户任务' },
      { action: 'create.user-sign-task', title: '会签任务' },
      { action: 'create.subprocess-expanded', title: '子流程' },
      { action: 'create.data-object', title: '数据对象' },
      { action: 'create.data-store', title: '数据存储' },
      { action: 'create.participant-expanded', title: '扩展流程' },
      { action: 'create.group', title: '分组' },
    ]
  }
  // 获取控件配置信息
  getControl (action) {
    const result = this.controls.filter(item => item.action === action)
    return result[0] || {}
  }
}
