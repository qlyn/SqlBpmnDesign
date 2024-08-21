<template>
  <div class="property-panel" ref="propertyPanel">

    <el-drawer :key="process.key" title="流程编辑" :visible.sync="process.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="process" label-width="100px" size="small">
        <el-form-item label="流程ID：">
          <el-input v-model="process.id" @input="updateProperty('id',process.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程分类：">
          <el-input v-model="process.category" @input="updateFlowableProperty('processCategory',process.category)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程名称：">
          <el-input v-model="process.name" @input="updateProperty('name',process.name)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程描述：">
          <el-input v-model="process.document" @input="documentationChange"
                    class="custom-input"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer :key="sequence.key" title="流程线编辑" :visible.sync="sequence.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="sequence" label-width="100px" size="small">
        <el-form-item label="流程ID：">
          <el-input v-model="sequence.id" @input="updateProperty('id',sequence.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程线名称：">
          <el-input v-model="sequence.name" @input="updateProperty('name',sequence.name)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程线跳过条件：">
          <el-input v-model="sequence.skipExpression"
                    @input="updateFlowableProperty('skipExpression',sequence.skipExpression)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="流程线描述：">
          <el-input v-model="sequence.document" @input="documentationChange" class="custom-input"></el-input>
        </el-form-item>
        <!-- 分支允许添加条件 -->
        <el-form-item label="流程线跳转条件：">
          <el-input v-model="sequence.conditionExpression" @input="conditionExpressionChange"
                    class="custom-input"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer :key="start.key" title="开始事件" :visible.sync="start.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="start" label-width="100px" size="small">
        <el-form-item label="节点ID：">
          <el-input v-model="start.id" @input="updateProperty('id',start.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点名称：">
          <el-input v-model="start.name" @input="updateProperty('name',start.name)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点描述：">
          <el-input v-model="start.document" @input="documentationChange" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="发起人：">
          <el-input v-model="start.initiator" @input="updateFlowableProperty('initiator',start.initiator)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="表单标识key：">
          <el-input v-model="start.formKey" @input="updateFlowableProperty('formKey',start.formKey)"
                    class="custom-input"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--结束事件/中间事件-->
    <el-drawer :key="end.key" :title="end.title" :visible.sync="end.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="end" label-width="100px" size="small">
        <el-form-item label="节点ID：">
          <el-input v-model="end.id" @input="updateProperty('id',end.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点名称：">
          <el-input v-model="end.name" @input="updateProperty('name',end.name)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点描述：">
          <el-input v-model="end.document" @input="documentationChange" class="custom-input"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 任务/用户任务节点 -->
    <el-drawer :key="form.key" title="任务编辑" :visible.sync="form.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="form" label-width="100px" size="small">

        <el-form-item label="节点ID：">
          <el-input v-model="form.id" @input="updateProperty('id',form.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点名称：">
          <el-input v-model="form.name" @input="updateProperty('name',form.name)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点颜色：">
          <el-color-picker v-model="form.color" @active-change="colorChange" class="custom-input"></el-color-picker>
        </el-form-item>
        <el-form-item label="节点描述：">
          <el-input v-model="form.document" @input="documentationChange" class="custom-input"></el-input>
        </el-form-item>
        <!-- 审批类型 -->
        <el-form-item label="审批类型：" v-if="userTask">
          <el-select v-model="form.userType" @change="clearApprovalType" placeholder="请选择" class="custom-input">
            <el-option value="assignee" label="审批人"></el-option>
            <el-option value="candidateUsers" label="候选人"></el-option>
            <el-option value="candidateGroups" label="候选组"></el-option>
          </el-select>
        </el-form-item>
        <!-- 审批人 -->
        <el-form-item label="审批人：" v-if="userTask && form.userType === 'assignee'">
          <el-select v-model="form.assignee" placeholder="请选择" key="1" class="custom-input"
                     @change="updateFlowableProperty('assignee',form.assignee)">
            <el-option
              v-for="item in $attrs.users"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 候选组 -->
        <el-form-item label="候选组：" v-else-if="userTask && form.userType === 'candidateGroups'">
          <el-select v-model="form.candidateGroups" :key="form.candidateGroupsKey" placeholder="请选择" multiple class="custom-input"
                     @change="updateFlowableProperty('candidateGroups',form.candidateGroups)">
            <el-option
              v-for="item in $attrs.roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 候选人员 -->
        <el-form-item label="候选人：" v-else-if="userTask && form.userType === 'candidateUsers'">
          <el-select v-model="form.candidateUsers" placeholder="请选择" :key="form.candidateUsersKey" multiple class="custom-input"
                     @change="updateFlowableProperty('candidateUsers',form.candidateUsers)">
            <el-option
              v-for="item in $attrs.users"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多实例：">
          <el-button round @click="multiForm.visible = true" class="custom-input">编辑</el-button>
        </el-form-item>
        <!--
                async: false,//是否异步
                priority: '',//优先级
                formKey: '',//表单标识key
                skipExpression: '',//跳过表达式
                dueDate: '',//到期时间
        -->
        <el-form-item label="异步：" v-if="userTask">
          <!-- 不使用 : 确保 active-value 是字符串类型 -->
          <!-- 不使用 : 确保 inactive-value 是字符串类型 -->
          <el-switch
            v-model="form.async"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="true"
            inactive-value="false"
            class="custom-input"
            @change="updateFlowableProperty('async',form.async)"
          />
        </el-form-item>
        <el-form-item label="优先级：" v-if="userTask">
          <el-input v-model="form.priority" @input="updateFlowableProperty('priority',form.priority)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="表单标识key：" v-if="userTask">
          <el-input v-model="form.formKey" @input="updateFlowableProperty('formKey',form.formKey)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="跳过表达式：" v-if="userTask">
          <el-input v-model="form.skipExpression" @input="updateFlowableProperty('skipExpression',form.skipExpression)"
                    class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="到期时间：" v-if="userTask">
          <el-date-picker
            v-model="form.dueDate"
            type="datetime"
            placeholder="选择到期时间"
            value-format="yyyy-MM-dd HH:mm:ss.SSS"
            align="right"
            class="custom-input"
            @change="updateFlowableProperty('dueDate',form.dueDate)">
          </el-date-picker>
        </el-form-item>
      </el-form>
      userType：{{ form.userType }}
      assignee：{{ form.assignee }}
      candidateGroups：{{ form.candidateGroups }}
      candidateUsers：{{ form.candidateUsers }}
    </el-drawer>
    <!--多实例表单-->
    <el-dialog :key="multiForm.key" title="多实例配置编辑" :visible.sync="multiForm.visible" size="100%"
               v-dialog-drag :before-close="closeMulti"
    >
      <el-form :model="multiForm" label-width="30%" size="small">
        <el-form-item label="审批人集合（流程变量）：">
          <el-input v-model="multiForm.collection" @input="updateMultiProperty" class="EFormItemStyle">
            >
          </el-input>
        </el-form-item>
        <el-form-item label="审批人集合（流程变量）：">
          <el-input v-model="multiForm.elementVariable" @input="updateMultiProperty"
                    class="EFormItemStyle"></el-input>
        </el-form-item>
        <el-form-item label="是否串行：">
          <!-- 使用 : 确保 active-value 是布尔类型 -->
          <!-- 使用 : 确保 inactive-value 是布尔类型 -->
          <el-switch
            v-model="multiForm.isSequential"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            class="EFormItemStyle"
            @change="updateMultiProperty"
          />
        </el-form-item>
        <el-form-item label="完成条件：">
          <el-input v-model="multiForm.completionCondition" @input="updateMultiProperty"
                    class="EFormItemStyle"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--网关节点-->
    <el-drawer :key="gateway.key" title="网关编辑" :visible.sync="gateway.visible" direction="rtl" size="100%"
               class="custom-drawer"
               :show-close="true" :append-to-body="false" :modal="false" :before-close="initData"
    >
      <el-form :model="form" label-width="100px" size="small">

        <el-form-item label="节点ID：">
          <el-input v-model="gateway.id" @input="updateProperty('id',gateway.id)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点名称：">
          <el-input v-model="gateway.name" @input="updateProperty('name',gateway.name)" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="节点描述：">
          <el-input v-model="gateway.document" @input="documentationChange" class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="异步：">
          <!-- 不使用 : 确保 active-value 是字符串类型 -->
          <!-- 不使用 : 确保 inactive-value 是字符串类型 -->
          <el-switch
            v-model="gateway.async"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            class="custom-input"
            @change="updateFlowableProperty('async',gateway.async)"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import beanUtil from '@/api/system/BeanUtil'

export default {
  name: 'PropertyPanel',
  props: {
    modeler: {
      type: Object,
      required: true
    }
  },
  computed: {
    userTask() {
      console.log('判断元素类型：', this.element)
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:UserTask'
    }
  },
  watch: {
    'form.userType': function(newValue) {//当TuserType变化时
      console.log('userType变化：', newValue)
      // if (newValue) {
      //   console.log("新值：",newValue)
      //   const types = ['assignee', 'candidateUsers', 'candidateGroups']
      //   //旧的userType类型不为空时，userType一改变则清空对应的flowable:assignee，
      //   // flowable:candidateUsers，flowable:candidateGroups的内容，同时清除对应的属性值
      //   types.forEach(type => {
      //     if(newValue !== type){
      //       //清除flowable:assignee属性
      //       delete this.element.businessObject.$attrs[`flowable:${type}`]
      //       //清除属性值
      //       this.form[type] = ''
      //     }
      //   })
      // }
    },
    'form.assignee': function(val) {//当flowable:assignee属性值有变化时
      console.log('form.assignee变化：', val)
      if (val) {
        this.form.userType = 'assignee'
      }
      console.log('watch监听到变化，此时form:', this.form)
    },
    'form.candidateUsers': function(val) {//当flowable:candidateUsers属性值有变化时
      console.log('form.candidateUsers变化：', val)
      if (val) {
        this.form.userType = 'candidateUsers'
      }
      console.log('watch监听到变化，此时form:', this.form)

    },
    'form.candidateGroups': function(val) {//当flowable:candidateGroups属性值有变化时
      console.log('form.candidateGroups变化：', val)
      if (val) {
        this.form.userType = 'candidateGroups'
      }
      console.log('watch监听到变化，此时form:', this.form)
    }
    // 'form.assignee': {
    //   immediate: true,//初始化也触发
    //   deep: false,
    //   handler(val) {
    //     console.log('form.assignee新值：', val)
    //     if (beanUtil.isNotNull(val)) {
    //       this.form.userType = 'assignee'
    //     }
    //   }
    // },
    // 'form.candidateUsers': {
    //   immediate: true,//初始化也触发
    //   deep: false,
    //   handler(val) {
    //     console.log('form.candidateUsers新值：', val)
    //     if (beanUtil.isNotNull(val)) {
    //       this.form.userType = 'candidateUsers'
    //     }
    //   }
    // },
    // 'form.candidateGroups': {
    //   immediate: true,//初始化也触发
    //   deep: false,
    //   handler(val) {
    //     console.log('form.candidateGroups新值：', val)
    //     if (beanUtil.isNotNull(val)) {
    //       this.form.userType = 'candidateGroups'
    //     }
    //   }
    // },
  },
  data() {
    return {
      //流程总表单字段
      process: {
        id: '', //流程id
        category: '',//流程分类
        name: '', //流程名字
        document: '', //流程描述
        visible: false, //设置流程表单是否可见
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      //流程线表单字段
      sequence: {
        id: '', //流程线id
        skipExpression: '',//流程线跳过条件
        conditionExpression: '',//流程线跳转条件
        name: '', //流程线名字
        document: '', //流程线描述
        visible: false, //设置流程线表单是否可见
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      //开始节点字段
      start: {
        id: '',
        name: '',
        document: '',
        initiator: '',
        formKey: '',
        visible: false,
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      //结束/中间节点字段
      end: {
        title: '',
        id: '',
        name: '',
        document: '',
        visible: false,
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      //节点表单字段
      form: {
        id: '', //设置节点id
        name: '', //设置节点名字
        document: '', //设置节点描述
        color: null, //设置颜色选择器的节点颜色
        async: false,//是否异步
        priority: '',//优先级
        formKey: '',//表单标识key
        skipExpression: '',//跳过表达式
        dueDate: '',//到期时间
        visible: false, //设置当前节点是否可见
        userType: '',//审批类型
        candidateGroups: '',//候选组
        candidateUsers: '',//候选人
        candidateGroupsKey: beanUtil.generateRandomKey(),//候选组刷新key，用来重新渲染候选组输入项
        candidateUsersKey: beanUtil.generateRandomKey(),//候选人刷新key，用来重新渲染候选人输入项
        assignee: '',//候选人
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      //网关节点字段
      gateway: {
        id: '', //设置节点id
        name: '', //设置节点名字
        document: '', //设置节点描述
        async: false,//是否异步
        visible: false, //设置当前节点是否可见
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      },
      element: {},
      // users: [
      //   { value: 'zhangsan', label: '张三' },
      //   { value: 'lisi', label: '李四' },
      //   { value: 'wangwu', label: '王五' }
      // ],
      // roles: [
      //   { value: 'manager', label: '经理' },
      //   { value: 'personnel', label: '人事' },
      //   { value: 'charge', label: '主管' }
      // ],
      //多实例表单配置
      multiForm: {
        visible: false, //设置多实例表单是否可见
        collection: '',
        elementVariable: '',
        isSequential: false,
        completionCondition: '',
        key: beanUtil.generateRandomKey() //key值，修改后可以重新渲染
      }
    }
  },
  mounted() {
    console.log('进入了mounted方法', this.element)
    this.handleModeler()
  },
  created() {
  },
  // watch:{
  //   "multiForm.isSequential":{
  //     immediate:true, //初始化时让handler调用一下
  //     //handler什么时候调用？当multiForm.isSequential发生改变时。
  //     handler(newValue,oldValue){
  //       console.log('multiForm.isSequential被修改了newValue:'+newValue+"，oldValue："+oldValue)
  //     }
  //   },
  //
  // },
  methods: {
    //初始化data变量
    initData() {
      //注意：必须使用Object.assign方法，this.$options.data()会获取data里的变量初始默认值
      Object.assign(this.$data, this.$options.data())
    },
    handleModeler() {
      //监听节点选择变化
      this.modeler.on('selection.changed', e => {
        console.log('节点选择变化', e.newSelection[0])
        const element = e.newSelection[0]
        if (element) {//元素不为空
          //可操作
          this.dataEchoByElement(element)
        } else { //元素为空
          this.initData()
        }
      })
      //监听节点属性变化
      this.modeler.on('element.changed', e => {
        const { element } = e
        console.log('element.changed节点属性变化：', element.businessObject)
        if (!element) return
        if (element.type === 'bpmn:Process') {//流程属性变化
          // this.process.key = beanUtil.generateRandomKey()
          //浅拷贝一个对象赋值回去，刷新视图
          this.process = { ...this.process }
        } else if (element.type === 'bpmn:SequenceFlow') {//流程线属性变化
          // this.sequence.key = beanUtil.generateRandomKey()
          //浅拷贝一个对象赋值回去，刷新视图
          this.sequence = { ...this.sequence }
        } else if (element.type === 'bpmn:StartEvent') {//开始节点属性变化
          // this.start.key = beanUtil.generateRandomKey()
          //浅拷贝一个对象赋值回去，刷新视图
          this.start = { ...this.start }
        } else if (element.type === 'bpmn:EndEvent' || element.type === 'bpmn:IntermediateThrowEvent') {
          //浅拷贝一个对象赋值回去，刷新视图
          this.end = { ...this.end }
        } else if (element.type === 'bpmn:ExclusiveGateway'
          || element.type === 'bpmn:ParallelGateway'
          || element.type === 'bpmn:InclusiveGateway'
          || element.type === 'bpmn:ComplexGateway'
          || element.type === 'bpmn:EventBasedGateway') { //流程图内的网关节点变化
          //浅拷贝一个对象赋值回去，刷新视图
          this.gateway = { ...this.gateway }
        } else {//流程图内的任务元素节点变化
          // this.form.key = beanUtil.generateRandomKey()
          //浅拷贝一个对象赋值回去，刷新视图
          this.form = { ...this.form }
        }
      })

      this.modeler.on('element.click', event => {
        const element = event.element
        console.log('单击元素事件', element)
        if (element) {//元素不为空
          //可操作
          this.dataEchoByElement(element)
        } else { //元素为空
          this.initData()
        }
      })

      // this.modeler.on("element.changed",(event)=>{
      //   console.log("---------元素变化事件",event)
      // })
      // this.modeler.on("shape.changed",(event)=>{
      //   console.log("---------形状变化事件",event)
      // })
    },
    //判断元素element类型，进行表单展示和数据回显
    dataEchoByElement(element) {
      console.log('数据回显')
      if (element.type === 'bpmn:Process') {
        this.element = element
        console.log('单击Process节点变化，赋值前的:', this.process)
        this.process = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.process) {
          this.process.category = this.process[`flowable:processCategory`]
        }
        if (this.process.documentation) {
          console.log('documentation赋值：', this.process.documentation[0].text)
          this.process.document = this.process.documentation[0].text
        }
        console.log('单击Process节点变化，赋值后的:', this.process)
        // console.log("单击Process节点变化，赋值后的document:",JSON.stringify(this.process.document))
        //必须在上一步赋值后操作，否则会被置为空
        this.process.visible = true
      } else if (element.type === 'bpmn:SequenceFlow') {
        this.element = element
        console.log('单击SequenceFlow节点变化，赋值前的:', this.sequence)
        this.sequence = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.sequence) {
          this.sequence.skipExpression = this.sequence[`flowable:skipExpression`]
        }
        if (this.sequence.documentation) {
          this.sequence.document = this.sequence.documentation[0].text
        }
        if (this.sequence.conditionExpression ) {
          this.sequence.conditionExpression = this.sequence.conditionExpression.body
        }
        console.log('单击SequenceFlow节点变化，赋值后的:', this.sequence)
        // console.log("单击SequenceFlow节点变化，赋值后的document:",JSON.stringify(this.sequence.document))
        //必须在上一步赋值后操作，否则会被置为空
        this.sequence.visible = true
      } else if (element.type === 'bpmn:StartEvent') {
        this.element = element
        console.log('单击StartEvent节点变化，赋值前的:', this.start)
        this.start = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.start) {
          this.start.formKey = this.start[`flowable:formKey`]
        }
        if (this.start) {
          this.start.initiator = this.start[`flowable:initiator`]
        }
        if (this.start.documentation) {
          this.start.document = this.start.documentation[0].text
        }
        console.log('单击StartEvent节点变化，赋值后的:', this.start)
        //必须在上一步赋值后操作，否则会被置为空
        this.start.visible = true
      } else if (element.type === 'bpmn:EndEvent' || element.type === 'bpmn:IntermediateThrowEvent') {
        this.element = element
        console.log('单击EndEvent|IntermediateThrowEvent节点变化，赋值前的:', this.end)
        this.end = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.end.documentation) {
          this.end.document = this.end.documentation[0].text
        }
        console.log('单击EndEvent|IntermediateThrowEvent节点变化，赋值后的:', this.end)
        if (element.type === 'bpmn:EndEvent') {
          this.end.title = '结束事件'
        } else if (element.type === 'bpmn:IntermediateThrowEvent') {
          this.end.title = '中间事件'
        }
        //必须在上一步赋值后操作，否则会被置为空
        this.end.visible = true
      } else if (element.type === 'bpmn:ExclusiveGateway'
        || element.type === 'bpmn:ParallelGateway'
        || element.type === 'bpmn:InclusiveGateway'
        || element.type === 'bpmn:ComplexGateway'
        || element.type === 'bpmn:EventBasedGateway') {
        this.element = element
        // console.log('element.businessObject：',element.businessObject);
        // console.log('element.businessObject.$attrs：',JSON.stringify(element.businessObject.$attrs));
        //将选择节点的属性赋值给form
        this.gateway = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        if (this.gateway.documentation) {
          this.gateway.document = this.gateway.documentation[0].text
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.gateway) {
          this.gateway.async = this.gateway[`flowable:async`]
        }
        //必须在上一步赋值后操作，否则会被置为空
        this.gateway.visible = true
        console.log('节点变化后的visible:', this.gateway.visible)
        console.log('单击Gateway节点变化，赋值后的:', JSON.stringify(this.gateway))
      } else { //Task/UserTask类型数据回显
        this.element = element
        // console.log('element.businessObject：',element.businessObject);
        // console.log('element.businessObject.$attrs：',JSON.stringify(element.businessObject.$attrs));
        //将选择节点的属性赋值给form
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        if (this.form.documentation) {
          this.form.document = this.form.documentation[0].text
        }
        //将一些非同名属性设置回去，进行绑定
        if (this.form) {
          this.form.async = this.form[`flowable:async`]
          this.form.formKey = this.form[`flowable:formKey`]
          this.form.dueDate = this.form[`flowable:dueDate`]
          this.form.priority = this.form[`flowable:priority`]
          this.form.skipExpression = this.form[`flowable:skipExpression`]
          if (beanUtil.isNotNull(this.form[`flowable:assignee`])) {//必须，空值也赋值的话否则会触发多个监听watch，导致审批类型userType无法正确赋值
            this.form.assignee = this.form[`flowable:assignee`]
          }
          if (beanUtil.isNotNull(this.form[`flowable:candidateUsers`])) {//必须，空值也赋值的话否则会触发多个监听watch，导致审批类型userType无法正确赋值
            if (Array.isArray(this.form[`flowable:candidateUsers`])) {//数组类型，直接赋值
              this.form.candidateUsers = this.form[`flowable:candidateUsers`]
            } else { //字符串类型，需要处理
              const candidateUserArr = this.form[`flowable:candidateUsers`].split(',')
              if (candidateUserArr.length > 1) {
                console.log('有多个，需要转换为数组赋值')
                //图层读出来的flowable:candidateUsers是String类西，以逗号分割，比如3,5 => split(',')会转为数组类型,map(Number)将字符串数组转为数字数组
                this.form.candidateUsers = candidateUserArr.map(Number) // "3,5"
              } else if (candidateUserArr.length === 1) {
                console.log('只有一个，只需要转换为String赋值')
                this.form.candidateUsers = this.form[`flowable:candidateUsers`]
              }
              console.log('this.form[`flowable:candidateUsers`]:', JSON.stringify(this.form[`flowable:candidateUsers`]))
              console.log('this.form[`flowable:candidateUsers`]:', beanUtil.getObjectType(this.form[`flowable:candidateUsers`]))
            }
            //重新渲染candidateGroups输入项元素
            this.form.candidateGroupsKey = beanUtil.generateRandomKey()
          }
          if (beanUtil.isNotNull(this.form[`flowable:candidateGroups`])) {//必须，空值也赋值的话否则会触发多个监听watch，导致审批类型userType无法正确赋值
            if (Array.isArray(this.form[`flowable:candidateGroups`])) {//数组类型，直接赋值
              this.form.candidateGroups = this.form[`flowable:candidateGroups`]
            } else { //字符串类型，需要处理
              const candidateGroupArr = this.form[`flowable:candidateGroups`].split(',')
              if (candidateGroupArr.length > 1) {
                console.log('有多个，需要转换为数组赋值')
                //图层读出来的flowable:candidateGroups是String类西，以逗号分割，比如3,5 => split(',')会转为数组类型,map(Number)将字符串数组转为数字数组
                this.form.candidateGroups = candidateGroupArr.map(Number) // "3,5"
              } else if (candidateGroupArr.length === 1) {
                console.log('只有一个，只需要转换为String赋值')
                this.form.candidateGroups = candidateGroupArr
              }
              console.log('this.form[`flowable:candidateGroups`]:', JSON.stringify(this.form[`flowable:candidateGroups`]))
              console.log('this.form[`flowable:candidateGroups`]:', beanUtil.getObjectType(this.form[`flowable:candidateGroups`]))
            }
            //重新渲染candidateUsersKey输入项元素
            this.form.candidateUsersKey = beanUtil.generateRandomKey()
          }
          if (this.form.loopCharacteristics) {
            this.multiForm.isSequential = this.form.loopCharacteristics.isSequential
            if (this.form.loopCharacteristics.completionCondition) {
              this.multiForm.completionCondition = this.form.loopCharacteristics.completionCondition.body
            }
            console.log('单击Task|UserTask节点变化0，赋值后的:', this.element.businessObject.loopCharacteristics.$attrs)
            if (this.element.businessObject.loopCharacteristics.$attrs) {
              if (this.element.businessObject.loopCharacteristics.$attrs['flowable:collection']) {
                this.multiForm.collection = this.element.businessObject.loopCharacteristics.$attrs['flowable:collection']
              }
              if (this.element.businessObject.loopCharacteristics.$attrs['flowable:elementVariable']) {
                this.multiForm.elementVariable = this.element.businessObject.loopCharacteristics.$attrs['flowable:elementVariable']
              }
            }
            console.log('单击Task|UserTask节点变化1，赋值后的:', this.element)
          }
          // if (this.form.userType === 'candidateUsers') {
          //   this.form['candidateUsers'] =
          //     this.form['candidateUsers'].split(',') || []
          // }
          //必须在上一步赋值后操作，否则会被置为空
          this.form.visible = true
          console.log('节点变化后的visible:', this.form.visible)
          console.log('单击Task|UserTask节点变化2，赋值后的:', JSON.stringify(this.form))
          console.log('单击Task|UserTask节点变化3，赋值后的:', this.form)
        }
      }
    },
    // 属性面板颜色，更新回流程节点
    colorChange(color) {
      const modeling = this.modeler.get('modeling')
      modeling.setColor(this.element, {
        fill: null,
        stroke: color
      })
      modeling.updateProperties(this.element, { color: color })
    },
    // 任务节点配置人员
    addUser(properties) {
      this.updateProperties(
        Object.assign(properties, {
          userType: Object.keys(properties)[0]
        })
      )
    },
    // 切换人员类型
    clearApprovalType(newValue) {
      console.log('新值：', newValue)
      const types = ['assignee', 'candidateUsers', 'candidateGroups']
      if (newValue) {
        types.forEach(type => {
          if (type !== newValue) {
            console.log('删除元素type：', type)
            //删除页面元素
            delete this.element.businessObject.$attrs[type]
            //删除表单赋值
            this.form[type] = ''
            //删除图层xml里的配置属性
            this.deleteFlowableProperty(type)
          }
        })
      }
      // const types = ['assignee', 'candidateUsers', 'candidateGroups']
      // if(newValue){
      //   types.forEach(type => {
      //     if(type !== newValue){
      //       console.log("删除元素type：",type)
      //       delete this.element.businessObject.$attrs[type]
      //       this.form[type] = ''
      //     }
      //   })
      // }else {
      //   types.forEach(type => {
      //     console.log("删除元素type：",type)
      //     delete this.element.businessObject.$attrs[type]
      //     this.form[type] = ''
      //   })
      // }
      // console.log('删除后的form：', this.form)
    },
    //关闭多实例菜单触发
    async closeMulti() {
      // console.log("调用closeMulti")
      this.multiForm.visible = false
      // 强制刷新画布（让图层重新渲染，同时任务显示多实例配置标志）
      this.$emit('updateMultiProperty')
    },
    //多实例完成条件属性变化，更新回流程节点
    updateMultiProperty() {
      let loopCharacteristics = this.element.businessObject.get('loopCharacteristics')
      if (!loopCharacteristics) {
        loopCharacteristics = this.modeler.get('moddle').create('bpmn:MultiInstanceLoopCharacteristics')
      }
      loopCharacteristics['isSequential'] = this.multiForm.isSequential
      loopCharacteristics['$attrs']['flowable:collection'] = this.multiForm.collection
      loopCharacteristics['$attrs']['flowable:elementVariable'] = this.multiForm.elementVariable

      const completionConditionElement = this.modeler.get('moddle').create('bpmn:Expression', { body: this.multiForm.completionCondition })
      loopCharacteristics['completionCondition'] = completionConditionElement
      this.updateProperties({ loopCharacteristics: loopCharacteristics })
    },

    //描述属性变化，更新回流程节点
    documentationChange(document) {
      //创建一个bpmn2:documentation节点标签，text指定<bpmn2:documentation></bpmn2:documentation>里的内容
      const documentationElement = this.modeler.get('moddle').create('bpmn:Documentation', { text: document })
      this.updateProperties({ documentation: [documentationElement] })
    },
    //描述属性变化，更新回流程节点
    conditionExpressionChange(conditionExpression) {
      //创建一个bpmn2:conditionExpression节点标签，text指定<bpmn2:conditionExpression></bpmn2:conditionExpression>里的内容
      const conditionExpressionElement = this.modeler.get('moddle').create('bpmn:FormalExpression')
      conditionExpressionElement.body = conditionExpression
      this.updateProperties({
        'conditionExpression': conditionExpressionElement
      })
      //方法二：不使用this.updateProperties方法避免属性名错误设置
      // const modeling = this.modeler.get("modeling");
      // modeling.updateProperties(this.element, {
      //   conditionExpression : conditionExpressionElement
      // });
    },
    //更新带flowable:前缀的属性，传入属性名，和属性值
    updateFlowableProperty(propertyName, propertyValue) {
      // 获取当前属性
      const currentProperties = this.modeler.get('elementRegistry').get(this.element.id).businessObject
      if (currentProperties[propertyName] === propertyValue) {
        return // 如果没有变化则不更新
      }
      console.log('更新flowable:属性名：', propertyName, '，更新flowable:属性值：', propertyValue)
      this.updateProperties({
        ['flowable:' + propertyName]: propertyValue //加上[]才能作为属性名传入，否则只会传入propertyName作为属性名
      })
    },
    //删除flowable：前缀属性
    deleteFlowableProperty(propertyName) {
      this.updateProperties({
        ['flowable:' + propertyName]: undefined //加上[]才能作为属性名传入，否则只会传入propertyName作为属性名
      })
    },
    //更新属性，传入属性名，和属性值
    updateProperty(propertyName, propertyValue) {
      // 获取当前属性
      const currentProperties = this.modeler.get('elementRegistry').get(this.element.id).businessObject
      if (currentProperties[propertyName] === propertyValue) {
        return // 如果没有变化则不更新
      }
      console.log('更新属性名：', propertyName, '，更新属性值：', propertyValue)
      this.updateProperties({
        [propertyName]: propertyValue //加上[]才能作为属性名传入，否则只会传入propertyName作为属性名
      })
    },
    //删除属性
    deleteProperty(propertyName) {
      this.updateProperties({
        [propertyName]: undefined //加上[]才能作为属性名传入，否则只会传入propertyName作为属性名
      })
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties(properties) {
      console.log('properties:', properties)
      const modeling = this.modeler.get('modeling')
      modeling.updateProperties(this.element, properties)
    }
  }
}
</script>
<style lang="scss" scoped>
//旧的方法：定义长宽与父元素里的兄弟元素匹配
//.property-panel {
//position: absolute;
//right: 0px;
//top: 12vh; /*定义右侧工具栏向上偏移12个屏幕百分比单位*/
//border-top: 1px solid #cccccc;
//border-left: 1px solid #cccccc;
//padding: 20px 0;
//width: 25vw;
//height: 100%;
//}
//新的方法：!important设置以父元素定义的为准
.property-panel {
  position: absolute !important; //position: absolute !important;：确保 el-drawer 以绝对定位方式相对于父元素进行定位。
  transform: none !important; //transform: none !important;：取消可能的 transform 属性，以防止任何不必要的偏移。
  width: 100%;
  height: 100%;
}

//定义表单里的输入项宽度（不能超过表单所属父元素的长度）
.custom-input {
  width: 20vw;
}

//设置drawer跟随父元素
.custom-drawer {
  position: absolute !important; //position: absolute !important;：确保 el-drawer 以绝对定位方式相对于父元素进行定位。
  top: 0 !important; //top: 0 !important;：取消 el-drawer 默认的顶部偏移，让它跟随父元素的 top: 10vh; 偏移。
  transform: none !important; //transform: none !important;：取消可能的 transform 属性，以防止任何不必要的偏移。
}

//设置el-drawer允许滚动条滚动
> > > .el-drawer__body {
  overflow: auto;
}

> > > .el-drawer__container ::-webkit-scrollbar {
  display: none;
}

//设置el-drawer进入后不自动选中黑色边框
> > > :focus {
  outline: 0;
}
</style>
