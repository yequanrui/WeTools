const express = require('express');

const app = express();
app.get('/checkUpdate/:platform', (req, res) => {
  let { platform } = req.params;
  let resinfo = null;
  // 返回 Windows 配置
  if (platform == 'latest.yml') {
    resinfo = {
      name: 'v1.0.2',
      version: 'v1.0.2',
      path: 'https://niaoshuai-book.oss-cn-beijing.aliyuncs.com/theme-1.0.0%20Setup.exe',
      notes: 'xxxxxx',
      sha512:
        '4d1a4a9f797a43e968483ee7dcc74ed25d1b0d256e979e68d310dce4cd131541ad0e84f0e4ddf23a424133f2736038c79c43aa3b45e9a280d487fbc693dd3f05',
    };
  }
  // 返回 Mac 配置
  if (platform == 'latest-mac.yml') {
    resinfo = {
      name: 'v1.0.3',
      version: 'v1.0.3',
      path: 'https://niaoshuai-book.oss-cn-beijing.aliyuncs.com/theme-darwin-arm64-1.0.0.zip',
      notes: 'xxxxxx',
      sha512:
        '8f7c5951a4a100eec0c05caa19d9a5e2392122830360301fd4ca2baae2dedac54ff6065d6aed03e433287863a5c0a250aa9a8bbdd5eba1b2756ec14e2ab4c01f',
    };
  }
  if (!resinfo) {
    resinfo = { code: 400, msg: '参数错误' };
  }
  res.send(resinfo);
});
app.listen(3000, () => {
  console.log('express web server is listen at 3000 port!');
});
