import { ClassComponent, HostRoot } from './ReactWorkTags';
import { NoLane, SyncLane } from './ReactFiberLane';
import { ConcurrentMode, NoMode } from './ReactTypeOfMode';
var SyncLanePriority = 12;
var NoLanePriority = 0;
let syncQueue = [];
let NoContext = 0;
let BatchedContext = 1;
let executionContext = NoContext; // 执行环境，默认值是NoContext: 0, 表示非批量

export function scheduleUpdateOnFiber(fiber) {
  let root = markUpdateLaneFromFiberToRoot(fiber);
  // 开始创建一个任务，从根节点开始进行更新, React 的更新总是从根 Fiber 开始
  ensureRootIsScheduled(root);

  // 如果 只用 mode 这个一个控制变量， 那么 setTimeout里面就和外部一样, 所以还需要另一个控制变量保留 setTimeout 和外面的区别。
  // 如果当前的执行上下文环境是NoContext(非批量)并且mode不是并发的话直接执行更新
  if (
    executionContext === NoContext &&
    (fiber.mode & ConcurrentMode) === NoMode // & 按位与： 1 | 1 = 1， 1 | 0 = 0，  0 | 1 = 0， 0 | 0 = 0
  ) {
    flushSyncCallbackQueue();
  }
}

// ReactDOM.unstable_batchedUpdate
export function batchedUpdates(fn) {
  let prevExecutionContext = executionContext;
  executionContext |= BatchedContext; // 或等于, | 按位或； 1 | 1 = 1， 1 | 0 = 1，  0 | 1 = 1， 0 | 0 = 0
  fn(); // handleClick
  executionContext = prevExecutionContext; // 重置

  // setTimeout是在这里执行的
  // ...
}

function ensureRootIsScheduled(root) {
  let nextLanes = SyncLane; // 1
  let newCallbackPriority = SyncLanePriority; // 按理说应该等于最高级别赛道的优先级 12
  var existingCallbackPriority = root.callbackPriority; // 当前根节点上正在执行的更新任务的优先级
  if (existingCallbackPriority === newCallbackPriority) {
    // 这里就是并发模式下在setTimeout里也是批量的原因
    return; // 如果这个新的更新和当前根节点的已经调度的更新相等，那就直接返回，复用上次的更新，不再创建新的更新任务
  }
  scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));

  // queueMicrotask window.queueMicrotask, 使用微任务
  queueMicrotask(flushSyncCallbackQueue);

  root.callbackPriority = newCallbackPriority;
}

function flushSyncCallbackQueue() {
  syncQueue.forEach((cb) => cb());
  syncQueue.length = 0;
}

// 其实就把performSyncWorkOnRoot函数添加一个队列里，等待执行
function scheduleSyncCallback(callback) {
  syncQueue.push(callback);
}

// 这个其实就是我们真正的渲染任务了，比较老的节点和新的节点，得到domdiff结果 更新DOM。都是这个方法里
function performSyncWorkOnRoot(workInProgress) {
  let root = workInProgress;
  console.log('开始执行调合任务');
  while (workInProgress) {
    if (workInProgress.tag === ClassComponent) {
      let inst = workInProgress.stateNode; // 获取此fiber对应的类组件的实例
      inst.state = processUpdateQueue(inst, workInProgress);
      inst.render(); // 得到新状态后，就可以调用render方法得到新的虚拟dom，进行dom diff 更新DOM
    }
    workInProgress = workInProgress.child;
  }
  commitRoot(root);
}
function commitRoot(root) {
  root.callbackPriority = NoLanePriority;
}

// 根据老状态和我们更新队列计算新状态
function processUpdateQueue(inst, fiber) {
  return fiber.updateQueue.reduce((state, { payload }) => {
    if (typeof payload === 'function') {
      payload = payload(state);
    }
    return { ...state, ...payload };
  }, inst.state);
}

// 找到根节点
function markUpdateLaneFromFiberToRoot(fiber) {
  let parent = fiber.return;
  while (parent) {
    fiber = parent;
    parent = parent.return;
  }
  if (fiber.tag === HostRoot) {
    return fiber;
  }
  return null;
}
