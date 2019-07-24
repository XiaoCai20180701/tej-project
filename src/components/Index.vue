<template>
    <div class="index-vue">
        <!-- 侧边栏 -->
        <aside :class="asideClassName">
            <!-- logo -->
            <div class="logo-c">
                <span v-show="isShowAsideTitle">童E家—后台管理平台</span>
            </div>
            <!-- 菜单栏 -->
            <Menu ref="asideMenu" theme="light" width="100%" @on-select="gotoPage"
            accordion :open-names="openMenus" :active-name="currentPage" @on-open-change="menuChange">
                <!-- 动态菜单 -->
                <div v-for="(item, index) in menuItems" :key="index">
                    <Submenu v-if="!item.meta.requireAuth && item.children" :name="index">
                        <template slot="title">
                            <Icon :size="item.size" :type="item.type"/>
                            <span v-show="isShowAsideTitle">{{item.text}}</span>
                        </template>
                        <div v-for="(subItem, i) in item.children" :key="index + i">
                            <Submenu v-if="subItem.children > 0" :name="index + '-' + i">
                                <template slot="title">
                                    <Icon :size="subItem.size" :type="subItem.type"/>
                                    <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                                </template>
                                <MenuItem class="menu-level-3" v-for="(threeItem, k) in subItem.children" :name="threeItem.name" :key="index + i + k">
                                    <Icon :size="threeItem.size" :type="threeItem.type"/>
                                    <span v-show="isShowAsideTitle">{{threeItem.text}}</span>
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else v-show="isShowAsideTitle" :name="subItem.name">
                                <Icon :size="subItem.size" :type="subItem.type"/>
                                <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                            </MenuItem>
                        </div>
                    </Submenu>
                    <MenuItem v-else :name="item.name">
                        <Icon :size="item.size" :type="item.type" />
                        <span v-show="isShowAsideTitle">{{item.text}}</span>
                    </MenuItem>
                </div>
            </Menu>
        </aside>

        <!-- 右侧部分 -->
        <section class="sec-right">
            <!-- 头部 -->
            <div class="top-c">
                <header>
                    <div class="h-left">
                        <div class="pointer" @click="isShrinkAside" title="收缩/展开">
                            <Icon type="ios-apps" />
                        </div>

                    </div>
                    <div class="h-right">
                        <!-- 用户头像 -->
                        <div class="user-img-c">
                            <img :src="userImg">
                        </div>
                        <!-- 下拉菜单 -->
                        <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
                            <div class="pointer">
                                <span>{{userName}}</span>
                                <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
                                <Icon v-show="arrowUp" type="md-arrow-dropup"/>
                            </div>
                            <DropdownMenu slot="list">
                                <!-- name标识符 -->
                                <DropdownItem name="1">修改密码</DropdownItem>
                                <DropdownItem divided  name="2">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </header>
            </div>
            <!-- 面包屑功能 -->
            <p class="crumbs">{{crumbs}}</p>
            <!-- 页面主体 -->
            <div class="main-content">
                <div class="view-c">
                    <keep-alive :include="keepAliveData">
                        <!-- 子页面 -->
                        <router-view v-if="isShowRouter"/>
                    </keep-alive>
                    <div class="loading-c" v-show="showLoading">
                        <Spin size="large"></Spin>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { resetRouter } from '../router'

export default {
    name: 'index',
    data () {
        return {
            // 用于储存页面路径
            paths: {},
            // 当前显示页面
            currentPage: '',
            openMenus: [], // 要打开的菜单名字 name属性
            menuCache: [], // 缓存已经打开的菜单
            showLoading: false, // 是否显示loading
            isShowRouter: true,
            tagsArry: [],
            arrowUp: false, // 用户详情向上箭头
            arrowDown: true, // 用户详情向下箭头
            isShowAsideTitle: true, // 是否展示侧边栏内容
            main: null, // 页面主要内容区域
            asideClassName: 'aside-big', // 控制侧边栏宽度变化
            asideArrowIcons: [], // 缓存侧边栏箭头图标 收缩时用
            // 面包屑
            crumbs: '商品管理',
            userName: '',
            userImg: ''
        }
    },
    created() {
        // 已经为ajax请求设置了loading 请求前自动调用 请求完成自动结束
        // 添加请求拦截器
        this.$axios.interceptors.request.use(config => {
            this.showLoading = true
            // 在发送请求之前做些什么
            return config
        }, error => {
            this.showLoading = false
            // 对请求错误做些什么
            return Promise.reject(error)
        })
        // 添加响应拦截器
        this.$axios.interceptors.response.use(response => {
            this.showLoading = false
            // 对响应数据做点什么
            return response
        }, error => {
            this.showLoading = false
            // 对响应错误做点什么
            return Promise.reject(error)
        })
    },
    mounted() {
      this.beforeunloadFn()
        // 第一个标签
        const name = this.$route.name
        this.currentPage = name
        this.tagsArry.push({
            text: this.nameToTitle[name],
            name: name
        })

        // 设置用户信息
        this.userName = localStorage.getItem('userName')
        this.userImg = localStorage.getItem('userImg')

        this.main = document.querySelector('.sec-right')
        this.asideArrowIcons = document.querySelectorAll('aside .ivu-icon-ios-arrow-down')
        let w = document.documentElement.clientWidth || document.body.clientWidth
        // window.onresize = () => {
        //     // 可视窗口宽度太小 自动收缩侧边栏
        //     if (w < 1300 && this.isShowAsideTitle
        //         && w > (document.documentElement.clientWidth || document.body.clientWidth)) {
        //         this.shrinkAside()
        //     }

        //     w = document.documentElement.clientWidth || document.body.clientWidth
        // }
      window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
    watch: {
        $route(to) {
            const name = to.name
            this.currentPage = name
            if (name == 'error') {
                this.crumbs = '404'
                return
            }

            if (!this.keepAliveData.includes(name)) {
                // 如果标签超过8个 则将第一个标签删除
                if (this.tagsArry.length == 8) {
                    this.tagsArry.shift()
                }
                this.tagsArry.push({name, text: this.nameToTitle[name]})
            }

            setTimeout(() => {
                this.crumbs = this.paths[name]
            }, 0)
        }
    },
    computed: {
        // 菜单栏
        menuItems() {
            return this.$store.state.menuItems
        },
        // 需要缓存的路由
        keepAliveData() {
            return this.tagsArry.map(item => item.name)
        },
        // 由于iView的导航菜单比较坑 只能设定一个name参数
        // 所以需要在这定义组件名称和标签栏标题的映射表 有多少个页面就有多少个映射条数
        nameToTitle() {
            const obj = {}
            this.menuItems.forEach(e => {
                this.processNameToTitle(obj, e)
            })

            return obj
        },
    },
    methods: {
      beforeunloadFn (e) {
        // ...
        this.$store.dispatch('getAnyscMenu',this.$store.state.role)
      },
      // 判断当前标签页是否激活状态
        isActive(name) {
            return this.$route.name === name
        },
        // 跳转页面 路由名称和参数
        gotoPage(name, params) {
            this.currentPage = name
            this.crumbs = this.paths[name]
            this.$router.replace({name, params})

            if (!this.keepAliveData.includes(name)) {
                // 如果标签超过8个 则将第一个标签删除
                if (this.tagsArry.length == 8) {
                    this.tagsArry.shift()
                }
                this.tagsArry.push({name, text: this.nameToTitle[name]})
            }
        },
        // 用户操作
        userOperate(name) {
            switch(name) {
                case '1':
                    // 修改密码
                    this.gotoPage('password')
                    break
                case '2':
                    // 退出登陆 清除用户资料
                    localStorage.setItem('token', '')
                    localStorage.setItem('userImg', '')
                    localStorage.setItem('userName', '')
                    // 重设路由
                    resetRouter()
                    this.$router.replace({name: 'login'})
                    break
            }
        },
        // 控制用户三角箭头显示状态
        showArrow(flag) {
            this.arrowUp = flag
            this.arrowDown = !flag
        },
        // 判断
        isShrinkAside() {
            this.isShowAsideTitle? this.shrinkAside() : this.expandAside()
        },
        // 收缩
        shrinkAside() {
            this.asideArrowIcons.forEach(e => {
                e.style.display = 'none'
            })
            this.isShowAsideTitle = false
            this.openMenus = []
            this.$nextTick(() => {
                this.$refs.asideMenu.updateOpened()
            })
            setTimeout(() => {
                this.asideClassName =''
                this.main.style.width = 'calc(100% - 80px)'
            }, 0)
        },
        // 展开
        expandAside() {
            setTimeout(() => {
                this.isShowAsideTitle = true
                this.asideArrowIcons.forEach(e => {
                    e.style.display = 'block'
                })
                this.openMenus = this.menuCache
                this.$nextTick(() => {
                    this.$refs.asideMenu.updateOpened()
                })
            }, 200)
            this.asideClassName = 'aside-big'
            this.main.style.width = 'calc(100% - 220px)'
        },
        // 刷新当前标签页
        reloadPage() {
            let name = this.$route.name
            let index = this.keepAliveData.indexOf(name)
            this.$nextTick(() => {
                if (this.tagsArry.length) {
                    this.isShowRouter = false
                    this.tagsArry.splice(index, 1)
                    this.$nextTick(() => {
                        this.tagsArry.splice(index, 0, {name, text: this.nameToTitle[name]})
                        this.gotoPage(name)
                        this.isShowRouter = true
                    })
                } else {
                    this.isShowRouter = false
                    this.$nextTick(() => {
                        this.tagsArry.push({name, text: this.nameToTitle[name]})
                        this.gotoPage(name)
                        this.isShowRouter = true
                    })
                }
            })
        },
        // 激活标签
        activeTag(i) {
            this.gotoPage(this.tagsArry[i].name)
        },
        // 菜单栏改变事件
        menuChange(data) {
            this.menuCache = data
        },
        processNameToTitle(obj, data, text) {
            if (data.name) {
                obj[data.name] = data.text
                this.paths[data.name] = text? `${text} / ${data.text}` : data.text
            }
            if (data.children) {
                data.children.forEach(e => {
                    this.processNameToTitle(obj, e, text? `${text} / ${data.text}` : data.text)
                })
            }
        }
    }
}
</script>

<style scoped>
.index-vue {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    color: #666;
}
/* 侧边栏 */
aside {
    z-index: 1;
    min-width: 80px;
    background: #fff;
    height: 100%;
    transition: all .5s;
    overflow: auto;
    box-shadow: 3px 0 3px rgba(0,0,0,.05);
}
.logo-c {
    display: flex;
    align-items: center;
    color: #20222a;
    font-size: 16px;
    margin: 20px 0;
    justify-content: center;
}
.logo {
    width: 40px;
    margin-right: 10px;
}
.aside-big {
    min-width: 256px;
}
/* 主体页面 */
.sec-right {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: width .5s;
}
/* 主体页面头部 */
.top-c {
    background: rgba(230,230,230,.5);
    width: 100%;
}
header {
    height: 50px;
    border-bottom: none;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
    font-size: 14px;
}
header .ivu-icon {
    font-size: 24px;
}
.refresh-c {
    margin: 0 30px;
    cursor: pointer;
}
.h-right {
    display: flex;
    align-items: center;
}
.h-left {
    display: flex;
    align-items: center;
}
.user-img-c img {
    width: 100%;
}
.user-img-c {
    width: 34px;
    height: 34px;
    background: #ddd;
    border-radius: 50%;
    margin: 0 40px;
    overflow: hidden;
}
/* 标签栏 */
.ul-c {
    height: 34px;
    margin-top: 2px;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    overflow: hidden;
    width: calc(100% - 160px);
}
.ul-c li {
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    height: 24px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px 5px 2px 3px;
    border: 1px solid #e6e6e6;
}
a {
    color: #666;
    transition: none;
}
.li-a {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ul-c .ivu-icon {
    margin-left: 6px;
}
.active {
    background: #409eff;
    border: 1px solid #409eff;
}
.active a {
    color: #fff;
}
.active .ivu-icon {
    color: #fff;
}
/* 主要内容区域 */
.main-content {
    overflow: auto;
    height: 100%;
    width: 100%;
    background: #eee;
    padding: 18px;
}
.view-c {
    position: relative;
    /*background: #fff;*/
    /*padding: 15px;*/
    min-height: 85vh;
}
.pointer {
    cursor: pointer;
}
/* loading */
.loading-c {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(255,255,255,.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.crumbs {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    color: #97a8be;
    cursor: default;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.ivu-menu-vertical.ivu-menu-light:after {
  background: transparent !important;
}
</style>
