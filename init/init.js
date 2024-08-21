
function randomStr() {
  return Math.random().toString(36).slice(-8)
}
{/* <process id="process_${randomStr()}" name="name_${randomStr()}"> */}
export default function() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
    'xmlns:flowable="http://flowable.org/bpmn" ' +
    'id="sample-diagram" ' +
    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
    'xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
    '<bpmn2:process id="Process_1" isExecutable="false">\n' +
    '  <bpmn2:startEvent id="StartEvent_1" />\n' +
    '</bpmn2:process>\n' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    '    <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
    '      <dc:Bounds x="192" y="82" width="36" height="36" />\n' +
    '    </bpmndi:BPMNShape>\n' +
    '  </bpmndi:BPMNPlane>\n' +
    '</bpmndi:BPMNDiagram>\n' +
    '</bpmn2:definitions>`;'
}
