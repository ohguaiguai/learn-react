let { Map, is } = require('immutable');
let map1 = Map({ a: { aa: 1 }, b: 2, c: 3 });
let map2 = map1.set('b', 50);
let map3 = map1.set('b', 50);
console.log(map1 === map2); // false 因为map1作为b的父节点被克隆了一份
console.log(map1.get('b'));
console.log(map2.get('b'));
console.log(map1.get('a') === map2.get('a')); // true， a和b处于不同的分支,a被map1和map2共享了
/* let obj1 = {a:{b:'c'}};
let obj2 = {a:{b:'c'}};
console.log(obj1 === obj2);
console.log(_.isEqual(obj1,obj2)); loadash的isEqual是深度比较*/
// is可以实现深比较，但是性能非常非常高
console.log(is(map2, map3)); // true, 没有任何更改就返回同样的对象
