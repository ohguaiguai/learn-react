<li key="A" >A</li>
<li key="B" >B</li>
<li key="C" >C</li>
<li key="D" >D</li>
<li key="E" >E</li>
<li key="F" >F</li>
------------------------------
<li key="A"  >A-new</li>

<li key="C"  >C-new</li>
<li key="E"  >E-new</li>
<li key="B"  >B-new</li>
<li key="G"  >G</li>

第一轮循环
A=A 能复用，更新 A 就可以； 到 B KEY 不一样，则马上跳出第一轮循环

第二轮循环，新建 map key 就是元素的 key,值就是老的 fiber 节点
let map = {'B':B,'C':C,,'D':D,'E':E,'F':F};

继续遍历新的节点

到 C 找到 会给 C 标记为更新，另外会从 map 中删除 C
map = {'D':D,'F':F}; 还没有被复用的 fiber 节点
等新的 JSX 数组遍历完了以后，把 map 里的 fiber 节点全部标准 为删除

C 节点去 map 里找 一找有没有 key 为 C 的 fiber 节点
如果有，说明真的位置变 了，老节点可以复用(Fiber 和 DOm 元素可以复用)
把 C 标记更新

如果有删除操作的话，应该先执行

为什么不要用索引作为 key？

<li key="A" >A</li>
<li key="B" >B</li>
<li key="C" >C</li>
<li key="D" >D</li>

<li key="B" >B</li>
<li key="C" >C</li>
<li key="D" >D</li>
<li key="A" >A</li>

如果用索引对比的话
A-B
B-C
C-D
D-A
需要删除所有老 DOM，全部添加新 DOM， 本来只需要移动 A 到最后即可

这在多个 React 版本共存的情况下就会虽然某个节点上的函数调用了 event.stopPropagation(),
但还是会导致另外一个 React 版本上绑定的事件没有被阻止触发，所以在 17 版本中会把事件绑定到 render 函数的节点上
