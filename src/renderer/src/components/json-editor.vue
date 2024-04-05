<template>
  <div ref="dom" class="json-editor"></div>
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
  language: { type: String, default: 'json' },
  theme: { type: String, default: 'vs-dark' },
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const dom = ref();
let instance;

onMounted(() => {
  instance = monaco.editor.create(dom.value, {
    value: '', // 编辑器初始显示文字
    theme: props.theme, // 官方自带三种主题vs, hc-black, or vs-dark
    fontSize: 14, // 字体大小
    tabSize: 2, // tab缩进长度
    autoIndent: true, // 自动调整缩进
    automaticLayout: false, // 自动布局
    cursorStyle: 'line', // 光标样式
    formatOnPaste: true, // 控制是否在粘贴时格式化文本
    links: true, // 是否点击链接
    minimap: { enabled: false }, // 是否启用小地图
    scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    readOnly: false, // 用于控制编辑器是否只读
  });
  const model = monaco.editor.createModel(props.modelValue, props.language);
  instance.setModel(model);
  instance.onDidChangeModelContent(() => {
    const value = instance.getValue();
    emit('update:modelValue', value);
  });
});
</script>

<style scoped>
.editor {
  height: 500px;
}
</style>
