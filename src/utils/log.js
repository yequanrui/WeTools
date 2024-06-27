export class Logger {
  static levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
  static level = this.levels[0]; // 默认为DEBUG级别

  constructor() {
    // 生产环境中设置日志等级
    if (process.env.NODE_ENV === 'production') {
      Logger.setLevel(this.levels[2]);
    }
  }

  static setLevel(newLevel) {
    this.level = newLevel;
  }

  static shouldLog(level) {
    return this.levels[level] >= this.levels[this.level];
  }

  static formatStack(stack) {
    if (!stack) return '';
    // 格式化错误堆栈的逻辑
    return stack
      .split('\n')
      .map((line) => `    at ${line}`)
      .join('\n');
  }

  static sendLog(message) {
    // 假设我们有一个日志收集的API
    const logEndpoint = '/api/logs';
    fetch(logEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    }).catch((error) => {
      console.error('Failed to send log', error);
    });
  }

  static log(level, message, error) {
    if (!this.shouldLog(level)) return;
    const timestamp = new Date().toISOString();
    let formattedMessage = `[${timestamp}] [${level}] ${message}`;
    // 格式化错误堆栈
    if (error) {
      formattedMessage += `\n${this.formatStack(error.stack)}`;
    }
    switch (level) {
      case this.levels[0]:
        console.debug(formattedMessage);
        break;
      case this.levels[1]:
        console.info(formattedMessage);
        break;
      case this.levels[2]:
        console.warn(formattedMessage);
        break;
      case this.levels[3]:
      case this.levels[4]:
        console.error(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
    // 根据环境变量判断是否发送日志到后端
    if (process.env.NODE_ENV === 'production') {
      this.sendLog(formattedMessage);
    }
  }

  static debug(message) {
    this.log(this.levels[0], message);
  }

  static info(message) {
    this.log(this.levels[1], message);
  }

  static warn(message) {
    this.log(this.levels[2], message);
  }

  static error(message, error) {
    this.log(this.levels[3], message, error);
  }

  static fatal(message, error) {
    this.log(this.levels[4], message, error);
  }
}
