# tej-project

> A Vue.js project

## 更新日志

> #### 商品管理

1.新增商品/查看商品详情，选中所属厂商之后，再去选择修改时，修复下拉框只显示被选中的数据问题   【2019-08-14】

2.修复商品状态更改后，是否可编辑商品问题(商品禁用，可查看可编辑;商品启用，可查看不编辑)  【2019-08-14】

3.修改已有分类的树形菜单默认鼠标上移方式为 default 【2019-08-14】

4.添加 新增商品 表单验证 【2019-08-14】

5.修复 新增商品分类 问题 【2019-08-14】

> #### 厂家管理

1.修复已通过厂家详情中，跳转到编辑商品页数据为空问题 【2019-08-14】

2.修复已通过厂家详情中，更改商品状态未请求接口问题 【2019-08-14】

3.已通过厂家详情页面，显示账户余额 【2019-08-14】

4.修改 厂家账单列表 样式 【2019-08-14】

> #### 商家管理

1.已通过商家详情页面，显示账户余额、积分余额 【2019-08-14】

2.修改 商家账单列表 样式 【2019-08-14】

> #### 数据管理

1.页面初始进入，排行榜默认显示商品访问量 【2019-08-14】

2.日期选择器点击确定按钮，若选择时间值未空，则提示用户选择时间 【2019-08-14】

> #### 订单管理

1.修复订单详情显示失败问题 【2019-08-14】

> #### 账户管理

1.修复新增账户角色中有管理员选项问题。全平台管理员只有一个 【2019-08-14】

2.新增 个人中心 页面 【2019-08-14】

> #### 所有页面

1.实现页面局部刷新，修复弹窗请求时视觉效果问题 【2019-08-14】

2.修复组件缓存问题 【2019-08-14]

3.添加回车键事件，搜索框回车，只刷新表格列表数据  【2019-08-14】

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


