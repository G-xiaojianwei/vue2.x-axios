<template>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
