<template>
  <div ref="dom" class="editor"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      return new JsonWorker();
    }
    return new EditorWorker();
  },
};

const props = defineProps({
  theme: { type: String, default: 'vs-dark' },
  language: { type: String, default: 'json' },
  originalValue: String,
  nowValue: String,
});
const emit = defineEmits(['update:nowValue']);
const dom = ref();
let instance;

onMounted(() => {
  instance = monaco.editor.createDiffEditor(dom.value, {
    value: '', // 编辑器初始显示文字
    theme: props.theme, // 官方自带三种主题vs, hc-black, or vs-dark
    fontSize: 14, // 字体大小
    formatOnPaste: true, // 控制是否在粘贴时格式化文本
    scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    originalEditable: false, // 用于控制编辑器（左侧）是否可编辑
    roundedSelection: false, // 右侧是否显示编辑器预览框
    readOnly: false, // 用于控制编辑器（右侧）是否只读
    glyphMargin: true, // Enable the rendering of the glyph margin
    renderSideBySide: true, // Render the diff inline
    enableSplitViewResizing: false, // Optionally disable the resizing
  });
  const originalModel = monaco.editor.createModel(props.originalValue, props.language);
  const modifiedModel = monaco.editor.createModel(props.nowValue, props.language);
  instance.setModel({ original: originalModel, modified: modifiedModel });
  instance.getModifiedEditor().onDidChangeModelContent(() => {
    const nowValue = instance.getModifiedEditor().getValue();
    emit('update:nowValue', nowValue);
  });
});
</script>

<style scoped>
.editor {
  height: 500px;
}
</style>
