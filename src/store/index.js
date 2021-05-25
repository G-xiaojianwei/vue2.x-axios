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