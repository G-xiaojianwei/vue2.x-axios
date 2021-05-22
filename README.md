# vue项目的安装与使用

## vue2.x版本的安装
```python
    npm install vue@2.5.2 vue-cli -g
    vue init webpack 'project'
```

### vue2.x版本与axios异步请求
> 将axios内容封装在项目src -- api文件夹中
>axios安装命令：`npm i axios --save`

#### ajax.js
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
#### aindex.js
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
#### index.js(片段)
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
      
     //第二种写法promise
     async mounted () {
        const result = await reqFoodCategorys()
        console.log(result)
      }
    }
</script>
```
