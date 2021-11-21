let express = require('express');
let cors = require('cors');
let logger = require('morgan');
let app = express();
app.use(logger('dev'));
app.use(cors());
app.get('/api/users', function (req, res) {
  let currentPage = parseInt(req.query.currentPage);
  let pageSize = parseInt(req.query.pageSize);
  let total = 25;
  let list = [];
  let offset = (currentPage - 1) * pageSize; // 每一页第一条数据的起始索引
  for (let i = offset; i < offset + pageSize; i++) {
    list.push({ id: i + 1, name: 'name' + (i + 1) });
  }
  res.json({
    currentPage,
    pageSize,
    totalPage: Math.ceil(total / pageSize),
    list,
  });
});
app.listen(8000, () => {
  console.log('sever started at port 8000');
});
