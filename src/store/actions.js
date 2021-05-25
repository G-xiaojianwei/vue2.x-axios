
export default {
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
}