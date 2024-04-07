const crypto = require('crypto');
const fs = require('fs');

// 异步读取文件并计算SHA-512哈希
function getSha512Hash(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const hash = crypto.createHash('sha512');
        hash.update(data);
        resolve(hash.digest('hex'));
      }
    });
  });
}

// 使用方法
const filePath = '../out/make/squirrel.windows/x64/theme-1.0.0 Setup.exe'; // 替换为你的文件路径
getSha512Hash(filePath)
  .then((hash) => {
    console.log('SHA-512 Hash:', hash);
  })
  .catch((error) => {
    console.error('Error generating SHA-512 hash:', error);
  });
