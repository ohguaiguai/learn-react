export function delay(this: any, ms: number, ms2: number) {
  console.log('this.name', this);
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(ms + ms2);
    }, ms + ms2);
  });
}
//fs.readFile node方法 1参数是文件名 2参数是回调函数
export function readFile(filename: string, callback: any) {
  setTimeout(function () {
    callback(null, filename);
  }, 1000);
}
