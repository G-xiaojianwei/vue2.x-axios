<<<<<<< HEAD
# vue项目的安装与使用

=======
>>>>>>> 872760d (新增vuex)
## vue2.x版本的安装
```python
    npm install vue@2.5.2 vue-cli -g
    vue init webpack 'project'
```

### vue2.x版本与axios异步请求
> 将axios内容封装在项目src -- api文件夹中
>axios安装命令：`npm i axios --save`

<<<<<<< HEAD
#### ajax.js
=======
---

**ajax.js**
>>>>>>> 872760d (新增vuex)
```python
/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
*/
import axios from 'axios'
export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = ''//数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
```
<<<<<<< HEAD
#### index.js
=======
**index.js**
>>>>>>> 872760d (新增vuex)
```python
    /*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
```

### 跨域配置
> 文件内容在config文件夹中
<<<<<<< HEAD
#### index.js(片段)
=======

**index.js(片段)**

>>>>>>> 872760d (新增vuex)
```python
proxyTable: {
  '/api': { // 匹配所有以 '/api'开头的请求路径
    target: 'http://localhost:4000', // 服务器网址
    changeOrigin: true, // 支持跨域
    pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
      '^/api': ''
    }
  }
}    
```
<<<<<<< HEAD
=======

>>>>>>> 872760d (新增vuex)
### 使用方法
**HelloWorld.vue**
```python
<script>
    import {reqFoodCategorys} from '../api'
    
    export default {
      name: 'HelloWorld',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      //第一种写法
      mounted () {
        const result =  reqFoodCategorys()
        result.then(function (response) {
          console.log(response.data)
        })
      }
      
     //第二种写法async/await
     async mounted () {
        const result = await reqFoodCategorys()
        console.log(result)
      }
    }
</script>
```
<<<<<<< HEAD
=======
---
### vue2.x版本中的vuex使用
vuex中的核心概念有`state` `getters` `mutations` `actions`

vuex的使用
> 在 `src` 目录中创建 `store` 文件夹 再创建一个 `index.js` 文件

**index.js** 
```python
import Vue from 'vue'
import Vuex from 'vuex'

const ADDFUN_A='ADDFUN_A'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // 状态管理数据存放
        a:12454,
        name:'vue'
    },
    mutations:{
        //同步函数，类似于vue中的methods
        [ADDFUN_A](state,payload){
            state.a+=payload.n
        }
    },
    actions:{
        //异步函数
        addAsync({commit}){
           setTimeout(function(){
            commit({
                type:'ADDFUN_A',
                n:2
            })
           },1000)
        },
        addAsync2({dispatch}){
            dispatch('addAsync')
        }
    },
    getters:{
        //vuex中的计算属性，可以将复杂的计算处理后返回 用户想要的值
        nameA(state){
            return state.name+state.a
        }
    }
})
```

> `store` 文件创建好后，需要在 `main.js` 中挂载到app上

```python
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```

###vuex在组件中的使用
```python
<div class="hello" >
    <h1>{{ a }}</h1>
    <h1>{{ nameA }}</h1>
    <button @click="addAsync2()">点击1</button>
    <button @click="ADDFUN_A({n:1})">点击2</button>
    <button @click="addSan()">点击3</button>
  </div>
</template>

<script>
import {reqFoodCategorys} from '../api'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ' Vue.js App'
    }
  },
  mounted () {
    const result =  reqFoodCategorys()
    result.then(function (r) {
      console.log(r)
    })
  },
  computed:{
    ...mapState(['a']),
    ...mapGetters(['nameA']),
  },
  methods:{
    ...mapMutations(['ADDFUN_A']),
    ...mapActions(['addAsync','addAsync2']),
    
    addSan(){
    this.$store.dispatch('addAsync2')
    }

  }
}
</script>
```
>>>>>>> 872760d (新增vuex)
