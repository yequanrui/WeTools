const openDialog = async ({ title, defaultPath, buttonLabel, filters, properties }) => {
  return await window.api.openDialog({
    title, // 对话框窗口的标题
    defaultPath, // 对话框的默认展示路径
    buttonLabel, // 确认按钮的自定义标签，当为空时将使用默认标签
    filters, // 文件类型数组，用于规定用户可见或可选的特定类型范围
    /**
     * 对话框相关属性：
     * openFile - 允许选择文件
     * openDirectory - 允许选择文件夹
     * multiSelections - 允许多选
     * showHiddenFiles - 显示对话框中的隐藏文件
     * promptToCreate - 如果输入的文件路径在对话框中不存在, 则提示创建。这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
     * dontAddToRecent - 不要将正在打开的项目添加到最近的文档列表中
     */
    properties,
  });
};

export { openDialog };
