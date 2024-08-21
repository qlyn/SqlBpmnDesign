import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';
// 定义隐藏左侧工具栏部分的图形
export default class CustomPaletteProvider extends PaletteProvider {
  constructor(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
    super(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate);
  }
  getPaletteEntries(element) {
    const entries = super.getPaletteEntries(element);
    // 指定左侧工具栏要隐藏的元素
    // delete entries['create.intermediate-event']; // 中间
    // delete entries['create.user-task']; // 用户任务
    // delete entries['create.user-sign-task']; // 会签任务
    delete entries['create.subprocess-expanded'];// 子流程
    // delete entries['create.data-object'];// 数据对象
    // delete entries['create.data-store'];// 数据存储
    // delete entries['create.participant-expanded'];// 扩展流程
    // delete entries['create.group'];// 分组
    return entries;
  }


  //所有的左侧工具栏元素
  /**
  {
    "hand-tool": {
        "group": "tools",
        "className": "bpmn-icon-hand-tool",
        "title": "激活抓手工具",
        "action": {

        }
    },
    "lasso-tool": {
        "group": "tools",
        "className": "bpmn-icon-lasso-tool",
        "title": "激活套索工具",
        "action": {

        }
    },
    "space-tool": {
        "group": "tools",
        "className": "bpmn-icon-space-tool",
        "title": "激活创建/删除空间工具",
        "action": {

        }
    },
    "global-connect-tool": {
        "group": "tools",
        "className": "bpmn-icon-connection-multi",
        "title": "激活全局连接工具",
        "action": {

        }
    },
    "tool-separator": {
        "group": "tools",
        "separator": true
    },
    "create.start-event": {
        "group": "event",
        "className": "bpmn-icon-start-event-none",
        "title": "创建开始事件",
        "action": {

        }
    },
    "create.intermediate-event": {
        "group": "event",
        "className": "bpmn-icon-intermediate-event-none",
        "title": "创建中间/边界事件",
        "action": {

        }
    },
    "create.end-event": {
        "group": "event",
        "className": "bpmn-icon-end-event-none",
        "title": "创建结束事件",
        "action": {

        }
    },
    "create.exclusive-gateway": {
        "group": "gateway",
        "className": "bpmn-icon-gateway-none",
        "title": "创建网关",
        "action": {

        }
    },
    "create.task": {
        "group": "activity",
        "className": "bpmn-icon-task",
        "title": "创建任务",
        "action": {

        }
    },
    "create.data-object": {
        "group": "data-object",
        "className": "bpmn-icon-data-object",
        "title": "创建数据对象引用",
        "action": {

        }
    },
    "create.data-store": {
        "group": "data-store",
        "className": "bpmn-icon-data-store",
        "title": "创建数据存储引用",
        "action": {

        }
    },
    "create.subprocess-expanded": {
        "group": "activity",
        "className": "bpmn-icon-subprocess-expanded",
        "title": "创建扩展子过程",
        "action": {

        }
    },
    "create.participant-expanded": {
        "group": "collaboration",
        "className": "bpmn-icon-participant",
        "title": "创建池/参与者",
        "action": {

        }
    },
    "create.group": {
        "group": "artifact",
        "className": "bpmn-icon-group",
        "title": "创建组",
        "action": {

        }
    }
  }
   */
}
