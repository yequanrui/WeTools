const initMain = async () => {
  const appVersion = await window.versions.app();
  document.getElementById('app-info').innerText = `${appVersion}`;
};
initMain();

const initAbout = () => {
  document.getElementById(
    'app-info'
  ).innerText = `（当前工具版本：${appVersion}，使用了Chrome ${versions.chrome()}，Node.js ${versions.node()}，和Electron ${versions.electron()}）`;
};

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
});
document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system();
  document.getElementById('theme-source').innerHTML = 'System';
});

const setButton = document.getElementById('set-title');
const titleInput = document.getElementById('title');
setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

const btn = document.getElementById('open-file');
const filePathElement = document.getElementById('filePath');
btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

const counter = document.getElementById('counter');
window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue;
  event.sender.send('counter-value', newValue);
});
