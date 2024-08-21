<template>
  <div class="app-container" label-width="100%">

    <el-row>
      <!-- 角色名称 -->
      <el-col :span="24">
        <Flow :xmlData="xmlData" :taskData="taskList"></Flow>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Flow from '../../../components/bpmnView/Flow'
//拖拽组件

export default {
  components: {
    Flow
  },
  data() {
    return {
      xmlData: '<?xml version="1.0" encoding="UTF-8"?>\n<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:flowable="http://flowable.org/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">\n  <process id="flow_zyv3ha1k" name="test002" flowable:processCategory="leave">\n    <startEvent id="start_event" name="开始">\n      <outgoing>Flow_04fwe6a</outgoing>\n    </startEvent>\n    <userTask id="Activity_0lirtf3" name="" flowable:formKey="5846" flowable:userType="assignee" flowable:dataType="fixed" flowable:assignee="2">\n      <incoming>Flow_04fwe6a</incoming>\n      <outgoing>Flow_0dtxcc6</outgoing>\n    </userTask>\n    <sequenceFlow id="Flow_04fwe6a" sourceRef="start_event" targetRef="Activity_0lirtf3" />\n    <endEvent id="Event_1djyta9" name="">\n      <incoming>Flow_0dtxcc6</incoming>\n    </endEvent>\n    <sequenceFlow id="Flow_0dtxcc6" sourceRef="Activity_0lirtf3" targetRef="Event_1djyta9" />\n  </process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_flow">\n    <bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="flow_zyv3ha1k">\n      <bpmndi:BPMNShape id="BPMNShape_start_event" bpmnElement="start_event" bioc:stroke="">\n        <omgdc:Bounds x="240" y="200" width="30" height="30" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x="242" y="237" width="23" height="14" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Activity_0lirtf3_di" bpmnElement="Activity_0lirtf3">\n        <omgdc:Bounds x="320" y="175" width="100" height="80" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Event_1djyta9_di" bpmnElement="Event_1djyta9">\n        <omgdc:Bounds x="472" y="197" width="36" height="36" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id="Flow_04fwe6a_di" bpmnElement="Flow_04fwe6a">\n        <di:waypoint x="270" y="215" />\n        <di:waypoint x="320" y="215" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id="Flow_0dtxcc6_di" bpmnElement="Flow_0dtxcc6">\n        <di:waypoint x="420" y="215" />\n        <di:waypoint x="472" y="215" />\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n',
      taskList: [
        {
          'key': 'start_event',
          'completed': true
        },
        {
          'key': 'Flow_04fwe6a',
          'completed': true
        },
        {
          'key': 'Activity_0lirtf3',
          'completed': false
        }
      ],
      // flowData:{
      //   nodeData: [
      //     {
      //       "key": "start_event",
      //       "completed": true
      //     },
      //     {
      //       "key": "Flow_04fwe6a",
      //       "completed": true
      //     },
      //     {
      //       "key": "Activity_0lirtf3",
      //       "completed": false
      //     }
      //   ],
      //   xmlData: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:bioc=\"http://bpmn.io/schema/bpmn/biocolor/1.0\" xmlns:flowable=\"http://flowable.org/bpmn\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" targetNamespace=\"http://www.flowable.org/processdef\">\n  <process id=\"flow_zyv3ha1k\" name=\"test002\" flowable:processCategory=\"leave\">\n    <startEvent id=\"start_event\" name=\"开始\">\n      <outgoing>Flow_04fwe6a</outgoing>\n    </startEvent>\n    <userTask id=\"Activity_0lirtf3\" name=\"\" flowable:formKey=\"5846\" flowable:userType=\"assignee\" flowable:dataType=\"fixed\" flowable:assignee=\"2\">\n      <incoming>Flow_04fwe6a</incoming>\n      <outgoing>Flow_0dtxcc6</outgoing>\n    </userTask>\n    <sequenceFlow id=\"Flow_04fwe6a\" sourceRef=\"start_event\" targetRef=\"Activity_0lirtf3\" />\n    <endEvent id=\"Event_1djyta9\" name=\"\">\n      <incoming>Flow_0dtxcc6</incoming>\n    </endEvent>\n    <sequenceFlow id=\"Flow_0dtxcc6\" sourceRef=\"Activity_0lirtf3\" targetRef=\"Event_1djyta9\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_flow\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_flow\" bpmnElement=\"flow_zyv3ha1k\">\n      <bpmndi:BPMNShape id=\"BPMNShape_start_event\" bpmnElement=\"start_event\" bioc:stroke=\"\">\n        <omgdc:Bounds x=\"240\" y=\"200\" width=\"30\" height=\"30\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"242\" y=\"237\" width=\"23\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_0lirtf3_di\" bpmnElement=\"Activity_0lirtf3\">\n        <omgdc:Bounds x=\"320\" y=\"175\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_1djyta9_di\" bpmnElement=\"Event_1djyta9\">\n        <omgdc:Bounds x=\"472\" y=\"197\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"Flow_04fwe6a_di\" bpmnElement=\"Flow_04fwe6a\">\n        <di:waypoint x=\"270\" y=\"215\" />\n        <di:waypoint x=\"320\" y=\"215\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0dtxcc6_di\" bpmnElement=\"Flow_0dtxcc6\">\n        <di:waypoint x=\"420\" y=\"215\" />\n        <di:waypoint x=\"472\" y=\"215\" />\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n"
      // }
    }
  },
  methods: {}
}
</script>

