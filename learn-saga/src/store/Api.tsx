export default {
  login(username: string, password: string) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (Math.random() >= 0.5) {
          resolve(username + ':' + password);
        } else {
          reject('登录失败');
        }
      }, 2000);
    });
  },
  set(key: string, value: any) {
    localStorage.setItem(key, value);
  },
  clear(key) {
    localStorage.removeItem(key);
  },
};
