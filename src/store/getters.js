export default {
    //vuex中的计算属性，可以将复杂的计算处理后返回 用户想要的值
    nameA(state){
        return state.name+state.a
    }
}