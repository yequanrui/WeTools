import fs from 'fs-extra';
import replaceList from '../../resources/replace.json';

// readdir：读取目录下的文件名和文件夹名称
// writeFile：往文件中写入内容
// lstatSync：用于获取文件或文件夹的状态信息，包括文件类型、大小、权限等，它会返回一个 fs.Stats 对象，可以通过这个对象获取文件或文件夹的各种属性。其对象的一个方法属性isDirectory，可以用于检查指定路径是否为一个文件夹
// existsSync：用于检查指定路径的文件或文件夹是否存在。它会返回一个布尔值，如果文件或文件夹存在则返回 true，否则返回 false
function replaceHtml(welinkPath) {
  fs.readdir(welinkPath)
    .then((files) => {
      if (Array.isArray(files)) {
        let replaceStr = '';
        files.forEach((item) => {
          // 检查是否为文件夹且文件夹名称符合大驼峰命名规范且包含index.tsx文件
          if (
            fs.lstatSync(`./src/components/${item}`).isDirectory() &&
            /^[A-Z][a-zA-Z]*$/.test(item) &&
            fs.existsSync(`${welinkPath}/${item}/index.tsx`)
          ) {
            replaceStr = `${replaceStr}\nexport { default as ${item} } from './components/${item}';`;
          }
        });

        fs.writeFile('./src/index.export.ts', replaceStr);
      }
    })
    .catch((err) => console.error(err));
}

export { replaceHtml };
