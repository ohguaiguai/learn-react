1. 异步模式
   声明周期内和 setTimeout 内都是批量更新

2.同步模式(默认)
声明周期内是 批量的(默认已经加上了 batchedUpdates)和 setTimeout 内是同步的，若是也想在 setTimeout 内实现批量更新，需要手动加上 batchedUpdates
