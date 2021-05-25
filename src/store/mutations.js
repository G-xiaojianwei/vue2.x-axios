import {ADDFUN_A} from './mutation-types'


export default {
    //同步函数，类似于vue中的methods
    [ADDFUN_A](state,payload){
        state.a+=payload.n
    }
}