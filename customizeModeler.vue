<template>
  <div class="containers">
<!--    <ul class="buttons">-->
<!--      <li>-->
<!--        <a href="javascript:" @click="$refs.refFile.click()">加载本地BPMN文件</a>-->
<!--        <input type="file" id="files" ref="refFile" style="display: none" @change="loadFileXML"/>-->
<!--      </li>-->

<!--      <li>-->
<!--        <a href="javascript:" @click="saveXML" title="保存为bpmn">保存为BPMN文件</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" @click="saveSVG" title="保存为svg">保存为SVG图片</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="handlerUndo" title="撤销操作">撤销</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="handlerRedo" title="恢复操作">恢复</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="handlerZoom(0.1)" title="放大">放大</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="handlerZoom(-0.1)" title="缩小">缩小</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="handlerZoom(0)" title="还原">还原</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="javascript:" class="active" @click="fitViewport()" title="居中">居中</a>-->
<!--      </li>-->
<!--    </ul>-->
<!--    &lt;!&ndash; 创建一个canvas画布 bpmn-js是通过canvas实现绘图的，并设置ref让vue获取到element &ndash;&gt;-->
<!--    <div class="canvas" ref="canvas"></div>-->
<!--    &lt;!&ndash;定义右侧工具类&ndash;&gt;-->
<!--    <panel :key="key" v-if="bpmnModeler" :modeler="bpmnModeler" @updateMultiProperty="loadXML()" />-->


    <el-container style="height: 100%">
      <!--顶部工具栏-->
      <el-header class="topTool" :key="topToolKey">
        <div style="display: flex; padding: 10px 0px; justify-content: space-between;">
          <div>
            <el-upload action="" :before-upload="loadFileXML" style="margin-right: 10px; display:inline-block;">
              <el-tooltip effect="dark" content="加载xml" placement="bottom">
                <el-button size="mini" icon="el-icon-folder-opened">加载xml</el-button>
              </el-tooltip>
            </el-upload>
            <el-tooltip effect="dark" content="新建" placement="bottom">
              <el-button size="mini" icon="el-icon-circle-plus" @click="createNewDiagramByInitXml">新建</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="居中" placement="bottom">
              <el-button size="mini" icon="el-icon-rank" @click="fitViewport">居中</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="放大" placement="bottom">
              <el-button size="mini" icon="el-icon-zoom-in" @click="handlerZoom(0.1)">放大</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="缩小" placement="bottom">
              <el-button size="mini" icon="el-icon-zoom-out" @click="handlerZoom(-0.1)">缩小</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="撤销" placement="bottom">
              <el-button size="mini" icon="el-icon-back" @click="handlerUndo">撤销</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="恢复" placement="bottom">
              <el-button size="mini" icon="el-icon-right" @click="handlerRedo">恢复</el-button>
            </el-tooltip>
          </div>
          <div>
            <el-button size="mini" icon="el-icon-document" @click="editXML">编辑xml</el-button>
            <el-button size="mini" icon="el-icon-document" @click="showXML">预览xml</el-button>
            <el-button size="mini" icon="el-icon-download" @click="saveXML">下载xml</el-button>
            <el-button size="mini" icon="el-icon-picture" @click="saveSVG">下载svg</el-button>
            <el-button size="mini" type="primary" @click="uploadXML">上传模型</el-button>
          </div>
        </div>
      </el-header>
      <el-container style="align-items: stretch">
        <el-main class="mainCanvas">
          <!-- 创建一个canvas画布 bpmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
          <div class="canvas" ref="canvas"></div>
        </el-main>

        <div class="rightTool">
          <!--定义右侧工具类-->
          <!--   v-bind="$attrs"：将父组件传入属性$attrs继续传递给孙子组件        -->
          <panel v-bind="$attrs" :key="key" v-if="bpmnModeler" :modeler="bpmnModeler" @updateMultiProperty="loadXML()" />
        </div>
      </el-container>
    </el-container>

    <!--在线编辑xml-->
    <el-dialog @close="resetXML" :title="xmlForm.xmlTitle" :visible.sync="xmlForm.xmlOpen" :key="xmlForm.xmlOpen" width="1450px" append-to-body>
      <div>
        <pre v-highlight>
           <!--contenteditable设置是否可被编辑-->
           <code ref="xmlRef" contenteditable="true" class="xml">
              {{ this.xmlStr }}
           </code>
        </pre>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="xmlForm.isEdit" @click="confirmXML" type="primary">确定</el-button>
        <el-button v-if="xmlForm.isEdit" @click="resetXML">取消</el-button>
        <el-button v-if="!xmlForm.isEdit" @click="resetXML">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*编辑模式*/
import BpmnModeler from 'bpmn-js/lib/Modeler'
/*视图模式*/
import BpmnViewer from 'bpmn-js/lib/Viewer.js'
/*~代表从node_modules里引入bpmn.js的的样式*/
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
/**引入国际化文件*/
import  customizeTranslate from '@/views/system/sysDesign/translate/customizeTranslate'
// 左侧自定义工具栏
import BpmData from "./palette/bpmData";
import CustomPaletteProvider from './palette/CustomizePaletteProvider'
//定义右侧工具栏
import panel from "./propertyPanel/PropertyPanel-right.vue";
//引入初始化的xml
import getInitStr from './init/init'
import beanUtil from '@/api/system/BeanUtil'

//设置高亮显示
import Hljs from 'highlight.js'
//样式文件，可选择node_modules-highlight.js-styles文件夹里其他高亮样式css
import 'highlight.js/styles/atom-one-dark.css'
import vkbeautify from 'vkbeautify'

export default {
  name: 'modeler-by-sql',
  //必须用mounted，在数据有变化时重新加载xml到图层
  mounted() {
    this.init()
  },
  components: {
    panel,
    vkbeautify
  },
  // 自定义指令
  directives: {
    highlight: (el) => {
      let blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        Hljs.highlightBlock(block)
      })
    }
  },
  data() {
    return {
      key: beanUtil.generateRandomKey(),//key值，用来刷新图层
      topToolKey: beanUtil.generateRandomKey(),//顶部工具栏的key值，用来刷新图层
      bpmnModeler: null,
      container: null,
      canvas: null,
      //BPMN的xml数据
      // xmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      //   '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
      //   '<bpmn2:process id="Process_1" isExecutable="false">\n' +
      //   '  <bpmn2:startEvent id="StartEvent_1" />\n' +
      //   '</bpmn2:process>\n' +
      //   '<bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      //   '  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
      //   '    <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
      //   '      <dc:Bounds x="192" y="82" width="36" height="36" />\n' +
      //   '    </bpmndi:BPMNShape>\n' +
      //   '  </bpmndi:BPMNPlane>\n' +
      //   '</bpmndi:BPMNDiagram>\n' +
      //   '</bpmn2:definitions>`;',
      xmlStr: getInitStr(),
      scale: 1, //图层的放大缩小比例

      //左侧工具栏
      bpmData: new BpmData(),
      //编辑/预览弹窗
      xmlForm:{
        xmlTitle: '', //弹窗标题
        xmlOpen: false, //弹窗是否可见
        isEdit: false, //弹窗是否编辑
      },
    }
  },
  methods: {
    async init() {
      this.bpmnModeler = new BpmnModeler({
        container: this.$refs.canvas,
        //启用bpmn.js的快捷键设置
        /*ctrl + z : 撤销
          ctrl + y : 恢复
          ctrl + c : 复制
          ctrl + v : 粘贴
          ctrl + + : 放大
          ctrl + - : 缩小
          ctrl + 0 : 恢复
          ctrl + del : 删除
          ctrl + 箭头 : 上下左右移动*/
        keyboard: {
          bindTo: window
        },
        //禁用效果
        // additionalModules: [
        // {
        //   // 禁用滚轮滚动
        //   zoomScroll: ["value", ""],
        //   // 禁止拖动线
        //   bendpoints: ["value", ""],
        //   // 禁用左侧面板
        //   paletteProvider: ["value", ""],
        //   // 禁止点击节点出现contextPad
        //   contextPadProvider: ["value", ""],
        //   // 禁止双击节点出现label编辑框
        //   labelEditingProvider: ["value", ""]
        // }],
        //自定义效果
        additionalModules: [{
            //自定义国际化
            translate: ['value', customizeTranslate],
            //自定义左侧工具栏
            paletteProvider: ['type', CustomPaletteProvider], // 左侧工具栏
          }
        ],
      })
      console.log('chushihua')
      this.createNewDiagramByXmlString()
    },
    /**
     * 创建一个新的图层根据默认初始化内容(默认初始化内容在getInitStr中定义)
     */
    async createNewDiagramByInitXml() {
      try {
        this.xmlStr = getInitStr()
        this.xmlStr = this.xmlStr.replace(/<!\[CDATA\[(.+?)]]>/g, function(match, str) {
          return str.replace(/</g, '&lt;')
        })
        //导入xmlString内容到bpmnModeler图层里
        const result =  await this.bpmnModeler.importXML(this.xmlStr);
        console.log('创建新图层：', result)
        if (beanUtil.isNotNull(result.warnings)) {
          // this.addEventBusListener();
          this.setColor();
          this.adjustPalette();
          //屏幕自适应居中：流程图渲染完成后可能会出现集中在画布左侧/右侧等情形，导致整体不够美观，通过zoom可以配置自适应画布，保证渲染图位于画布的中间位置
          this.fitViewport()
        }
      } catch (err) {
        console.log(err.message, err.warnings)
      }
    },
    /**
     * 创建一个新的图层（createNewDiagramByXmlString会根据xmlString重新创建一个新的图层）
     */
    async createNewDiagramByXmlString() {
      try {
        this.xmlStr = this.xmlStr.replace(/<!\[CDATA\[(.+?)]]>/g, function(match, str) {
          return str.replace(/</g, '&lt;')
        })
        //导入xmlString内容到bpmnModeler图层里
        const result =  await this.bpmnModeler.importXML(this.xmlStr);

        console.log('创建新图层：', result)
        if(beanUtil.isNotNull(result.warnings)){
          // this.addEventBusListener();
          this.setColor();
          this.adjustPalette();
          //屏幕自适应居中：流程图渲染完成后可能会出现集中在画布左侧/右侧等情形，导致整体不够美观，通过zoom可以配置自适应画布，保证渲染图位于画布的中间位置
          this.fitViewport()
        }
      } catch (err) {
        console.log(err.message, err.warnings)
      }
    },
    //设置显示的xmlString内容
    async setXmlString(xml){
      //赋值
      this.xmlStr=xml
      //最新xmlString导入图层
      const result =  await this.bpmnModeler.importXML(this.xmlStr);
      console.log("重新渲染result:",result)
      if(beanUtil.isNotNull(result.warnings)){
        console.log("重新渲染xml:",this.xmlStr)
        //重新刷新渲染图层（必须）
        this.key = beanUtil.generateRandomKey()
        // this.$nextTick(()=>{
        this.setColor();//重新设置下颜色
        // })
      }
    },
    /**
     * 加载xml内容渲染到图层
     */
    async loadXML() {
      //获取网页图层画好的最新xml内容/子组件修改过的xml最新内容
      const { xml } = await this.bpmnModeler.saveXML({ format: true })
      this.xmlStr = xml
      // console.log("待重新渲染的xml：",this.xmlStr)
      //最新xmlString导入图层
      const result =  await this.bpmnModeler.importXML(this.xmlStr);
      console.log("重新渲染result:",result)
      if(beanUtil.isNotNull(result.warnings)){
        console.log("重新渲染xml:",this.xmlStr)
        //重新刷新渲染图层（必须）
        this.key = beanUtil.generateRandomKey()
        // this.$nextTick(()=>{
          this.setColor();//重新设置下颜色
        // })
      }
    },
    /**
     * 加载本地文件的xml内容渲染到图层
     */
    loadFileXML(file) {
      const that = this

      // const file = this.$refs.refFile.files[0]

      var reader = new FileReader()
      reader.readAsText(file,'utf-8')
      // reader.onload = function() {
      //   that.xmlStr = this.result
      //   console.log("加载本地文件的xml:",this.xmlStr)
      //   that.createNewDiagramByXmlString()
      // }
      reader.onload = () => {
        that.xmlStr = reader.result
        this.createNewDiagramByXmlString()
        this.topToolKey = beanUtil.generateRandomKey()
      }
    },


    /**
     * 已渲染图层内容保存到本地xml
     * @returns {Promise<void>}
     */
    async saveXML() {
      console.log("打印此时图层的xml:",JSON.stringify(this.bpmnModeler.getDefinitions()))
      //获取网页图层画好的xml内容
      const { xml } = await this.bpmnModeler.saveXML({ format: true })
      console.log("下载的bpmn：",xml)
      this.xmlStr = xml
      var xmlBlob = new Blob([xml], {
        type: 'application/xml;charset=UTF-8,'
      })

      var downloadLink = document.createElement('a')
      downloadLink.download = 'bpmn文件导出'
      downloadLink.innerHTML = 'Get BPMN SVG'
      downloadLink.href = window.URL.createObjectURL(xmlBlob)
      downloadLink.onclick = function(event) {
        document.body.removeChild(event.target)
      }
      downloadLink.style.visibility = 'hidden'
      document.body.appendChild(downloadLink)
      downloadLink.click()
    },
    /**
     * 下载文件方法
     * @param filename
     * @param data
     * @param type
     */
    downloadFile(filename, data, type) {
      var a = document.createElement('a')
      var url = window.URL.createObjectURL(new Blob([data], { type: type }))
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    },
    /**
     * 图层内容保存为本地SVG
     * @returns {Promise<void>}
     */
    async saveSVG() {
      try {
        const result = await this.bpmnModeler.saveSVG()
        const { svg } = result

        var svgBlob = new Blob([svg], {
          type: 'image/svg+xml'
        })

        var downloadLink = document.createElement('a')
        downloadLink.download = 'ops-coffee-bpmn.svg'
        downloadLink.innerHTML = 'Get BPMN SVG'
        downloadLink.href = window.URL.createObjectURL(svgBlob)
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target)
        }
        downloadLink.style.visibility = 'hidden'
        document.body.appendChild(downloadLink)
        downloadLink.click()
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * 撤销上一步（ctrl+z）
     */
    handlerUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    /**
     * 恢复下一步(ctrl+y)
     */
    handlerRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    /**
     * 放大缩小
     * @param radio
     */
    handlerZoom(radio) {
      const newScale = !radio ? 1.0 : this.scale + radio;
      this.bpmnModeler.get("canvas").zoom(newScale);

      this.scale = newScale;
    },
    /**
     * 居中(屏幕自适应居中：流程图渲染完成后可能会出现集中在画布左侧/右侧等情形，导致整体不够美观，通过zoom可以配置自适应画布，保证渲染图位于画布的中间位置)
     */
    fitViewport() {
      this.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
    },
    //添加监听时间
    addEventBusListener() {
      /**
       * eventBus可以监听的事件类型：
       // Canvas Events
       canvas.destroy        // 触发在画布被销毁时
       canvas.init           // 触发在画布初始化时
       canvas.viewbox.changed // 触发在画布视图框（viewbox）发生变化时
       canvas.viewbox.changing // 触发在画布视图框（viewbox）正在变化时
       // Connection Events
       connect.end          // 触发在连接操作结束时
       connection.added     // 触发在连接被添加到模型中时
       connection.changed   // 触发在连接属性发生变化时
       connection.remove    // 触发在连接被移除时
       connection.removed   // 触发在连接从模型中被移除时
       // Diagram Events
       create.end           // 触发在创建操作结束时
       diagram.clear        // 触发在图表被清除时
       diagram.destroy      // 触发在图表被销毁时
       diagram.init         // 触发在图表初始化时
       // Element Events
       element.changed      // 触发在元素属性发生变化时
       element.click        // 触发在元素被点击时
       element.hover        // 触发在元素被悬停时
       element.marker.update // 触发在元素的标记更新时
       element.out          // 触发在鼠标离开元素时
       // Elements Events
       elements.changed     // 触发在多个元素属性发生变化时

       // Interaction Events
       interactionEvents.createHit // 触发在创建命中的事件时
       interactionEvents.updateHit // 触发在更新命中的事件时

       // Render Events
       render.connection    // 触发在渲染连接时
       render.getConnectionPath // 触发在获取连接路径时
       render.getShapePath // 触发在获取形状路径时
       render.shape        // 触发在渲染形状时

       // Selection Events
       selection.changed   // 触发在选择状态发生变化时

       // Shape Events
       shape.added         // 触发在形状被添加到模型中时
       shape.changed       // 触发在形状属性发生变化时
       shape.move.end      // 触发在形状移动操作结束时
       shape.remove        // 触发在形状被移除时
       shape.removed       // 触发在形状从模型中被移除时
       */
      const that = this;
      // //第一种：eventBus对象绑定事件
      // const eventBus = this.bpmnModeler.get("eventBus");
      // eventBus.on("element.click", function(e) {
      //   that.elementClick(e);
      // });
      //第二种：直接通过this.bpmnModeler对象绑定
      //单击整个bpmn图层事件（即单击哪里都会触发）
      this.bpmnModeler.on("element.click", (event)=> {
        that.elementClick(event);
      });
      //拖动事件(设置颜色会触发shape.changed事件，造成死循环)
      this.bpmnModeler.on("shape.changed", (event)=>{
        console.log("shape.changed类型：",event.element)
      })
      const modeling = this.bpmnModeler.get('modeling');
      this.bpmnModeler.on('shape.added', (event) => {
        console.log("shape.added类型：",event.element)
        if (event.element.type === 'bpmn:UserTask' || event.element.type === 'bpmn:Task') {
          console.log("动态监听，检测到添加了新元素，改变颜色")
          //必须获取仓库里的元素
          let element = this.bpmnModeler.get("elementRegistry").get(event.element.id)
          console.log("获取到的元素：",element)
          this.$nextTick().then(() => {
            modeling.setColor(element, { stroke: 'green' });
          })
        }
      });
      //节点属性变化事件
      this.bpmnModeler.on('elements.changed', (event) => {
        console.log("elements.changed类型：",event.element)
      })
      //多个事件监听写法
      // const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move'];
      // events.forEach((event) => {
      //   that.bpmnModeler.on(event, (e) => {
      //     console.log(event, e);
      //     if (event === 'connect.end') {
      //       const modeling = this.bpmnModeler.get('modeling');
      //       debugger;
      //     }
      //     if (!e || (e.element && e.element.type === 'bpmn:Process')) return; // 这里根元素是 bpmn:Process
      //     const elementRegistry = bpmnjs.get('elementRegistry');
      //     const shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
      //     console.log(shape);
      //     // 通过监听事件判断操作方式
      //     if (event === 'shape.added') {
      //       console.log('新增了shape');
      //     } else if (event === 'shape.removed') {
      //       console.log('删除了shape');
      //     }
      //   });
      // });
    },
    elementClick(event) {
      console.log("单击事件")
      console.log("全部节点：",this.bpmnModeler.get("elementRegistry").getAll())
      console.log("获取ID为Process_1的节点：",this.bpmnModeler.get("elementRegistry").get("Process_1"))
      if (event.element.businessObject.$type === "bpmn:UserTask") {
        console.log(
          "这是一个用户节点",
          event.element.businessObject.id,
          event.element.businessObject.$type,
          event.element.businessObject.name
        );
      }
      //获取ID为StartEvent_1的节点
      const element = this.bpmnModeler.get("elementRegistry").get("StartEvent_1");
      //修改节点的name属性
      this.bpmnModeler.get("modeling").updateProperties(element, {
        name: "开始节点"
      });
    },
    //设置颜色
    setColor(){
      let elementList = this.bpmnModeler.get("elementRegistry").getAll()
      elementList.forEach(n => {
        console.log("元素：",n)
        console.log("元素类型：",n.type)
        if (n.type === 'bpmn:UserTask') {
        }
        // 排他网关
        else if (n.type === 'bpmn:ExclusiveGateway') {
        }
        // 并行网关
        else if (n.type === 'bpmn:ParallelGateway') {
        }
        else if (n.type === 'bpmn:StartEvent') {
          console.log("执行了")
          this.bpmnModeler.get('modeling').setColor(n, {stroke: 'green',
            fill: 'rgba(0, 80, 0, 0.4)'})
        }
        else if (n.type === 'bpmn:EndEvent') {
        }
      })
      // //接口获取图形节点
      // let shapeIds = ['StartEvent_1',]
      // let shapes = []
      // shapeIds.forEach((id)=>{
      //   let shape = this.bpmnModeler.get("elementRegistry").get(id)
      //   shapes.push(shape)
      // })
      // this.bpmnModeler.get('modeling').setColor(shapes, {stroke: 'green'})
    },

    // 调整左侧工具栏排版
    adjustPalette() {
      try {
        // 获取 bpmn 设计器实例
        const canvas = this.$refs.canvas;
        const djsPalette = canvas.children[0].children[1].children[4];
        const djsPalStyle = {
          width: "130px",
          padding: "5px",
          background: "white",
          left: "20px",
          borderRadius: 0
        };
        for (var key in djsPalStyle) {
          djsPalette.style[key] = djsPalStyle[key];
        }
        const palette = djsPalette.children[0];
        const allGroups = palette.children;
        //将左侧工具栏djsPalette里的第一个分组的图标隐藏
        // allGroups[0].style["display"] = "none";
        // 修改控件样式
        for (var gKey in allGroups) {
          const group = allGroups[gKey];
          for (var cKey in group.children) {
            const control = group.children[cKey];
            //定义一个css属性对象
            const controlStyle = {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              padding: "5px"
            };
            if (control.className && control.dataset && control.className.indexOf("entry") !== -1) {
              console.log("左侧菜单遍历div元素：",control)
              console.log("左侧菜单遍历：",control.dataset)
              //找到bpmnData.js里对应的要显示的内容，加上title和css设置
              const controlProps = this.bpmData.getControl(control.dataset.action);
              console.log("左侧菜单遍历找到对应control：",controlProps)
              console.log("group:",group)
              console.log("data-group:",group.getAttribute("data-group"))
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
                controlProps["title"]
              }</div>`;
              //div元素加上style属性
              for (var csKey in controlStyle) {
                control.style[csKey] = controlStyle[csKey];
              }
              console.log("左侧菜单加上后的div元素：",control)
            }
          }
        }
        console.log("allGroups：",allGroups)
        console.log("djsPalette：",canvas.children[0].children[1].children[4])
        console.log("djsPalette2：",canvas.children[0].children[1])
      } catch (e) {
        console.log(e);
      }
    },






    //去掉编辑框内容
    resetXML() {
      this.xmlForm.xmlOpen = false
      this.xmlForm.xmlTitle = ''
      this.xmlForm.isEdit=false
    },
    //打开编辑框
    async editXML() {
      console.log('调用editXML方法')
      console.log('xml:',this.xml)
      console.log('xmlContent:',this.xmlContent)
      this.xmlForm.isEdit=true;
      this.xmlForm.xmlTitle = 'xml编辑'
      await this.loadXML()
      this.xmlStr = vkbeautify.xml(this.xmlStr)
      // console.log("xmlContent:",this.xmlContent)
      //此时data的xmlContent和对话框中的<code>标签双向绑定处于失效。需手动渲染
      //为什么放在最后？和:key属性绑定，等待数据完成后再重新渲染编辑框，否则数据渲染不生效无法显示内容但xmlContent是正确的
      this.xmlForm.xmlOpen = true
    },
    //打开预览框
    //async：定义一个异步函数，异步函数的返回值是一个promise对象
    async showXML() {
      console.log('调用showXML方法')
      this.xmlForm.isEdit=false;
      this.xmlForm.xmlTitle = 'xml预览'
      await this.loadXML()
      this.xmlStr = vkbeautify.xml(this.xmlStr)
      // console.log("xmlContent:",this.xmlContent)
      //此时data的xmlContent和对话框中的<code>标签双向绑定处于失效。需手动渲染
      //为什么放在最后？和:key属性绑定，等待数据完成后再重新渲染编辑框，否则数据渲染不生效无法显示内容但xmlContent是正确的
      this.xmlForm.xmlOpen = true
    },
    //编辑框的确定按钮
    confirmXML() {
      //此时双向绑定数据失效：使用ref获取标签元素内容并解析为xml文本
      this.xmlStr = vkbeautify.xml(this.$refs.xmlRef.innerText)
      console.log('调用子组件confirmXML方法：', this.xmlStr)
      this.createNewDiagramByXmlString()
      this.xmlForm.xmlOpen = false
      this.$message.success('保存成功')
    },
    //上传按钮
    async uploadXML(){
      const processElement = this.getProcessElement()
      const { xml } = await this.bpmnModeler.saveXML({ format: true })
      const saveSVGResult = await this.bpmnModeler.saveSVG()
      const { svg } = saveSVGResult
      const result = { 'process':processElement, xml, svg }
      console.log("上传的xml:",xml)
      //子组件调用父组件的save方法，并传入result数据
      this.$emit('uploadXML', result)
      //子ifame给父ifame传result数据
      window.parent.postMessage(result, '*')
    },
    //获取Process元素
    getProcessElement() {
      const rootElements = this.bpmnModeler.getDefinitions().rootElements
      for (let i = 0; i < rootElements.length; i++) {
        if (rootElements[i].$type === 'bpmn:Process') return rootElements[i]
      }
    },
  }
}
</script>

<style scoped>
/*基础图层和容器效果*/
.containers {
  /*设置宽高*/
  width: 100%;
  height: calc(100vh - 82px);
  /*如下属性给containers容器加上网格属性*/
  background: white;
  overflow: auto;
  background-image: linear-gradient(
    90deg,
    rgba(220, 220, 220, 0.5) 6%,
    transparent 0
  ),
  linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
  background-size: 12px 12px;
  width: 100%;
  height: calc(100vh - 82px);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.canvas{
  width: 100%;
  height: 100%;
}
/*定义顶部工具栏样式*/
.topTool{
  /*border-bottom: 1px solid rgb(218 218 218);*/
  height: 4vh; /*定义顶部工具栏高度为4vh*/
}
/*定义主canvas样式*/
.mainCanvas{
  width: 75vw;
  border: #2d2f33;
  padding: 0;
}
/*定义右边工具栏样式*/
.rightTool{
  width: 25vw;
  left: 75vw;
  top: 10vh;
  border: #6cadc8;
}
/*三个自定义按钮效果*/
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
}

.buttons li {
  display: inline-block;
  margin: 5px;
}

.buttons li a {
  color: #333;
  background: #fff;
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  text-decoration: none;
}

/*隐藏左侧工具栏Palette的css*/
.bpmn-icon-data-store {
  display: none;
}


</style>
