import  Vue from "vue";
import  Vuex from "vuex";
import  logger from "vuex/dist/logger.js" //引入vuex的日志插件
import  mutations from "./mutations.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    cartList:[]
  },
  getters:{
    count(state){ //一共多少本
      return state.cartList.reduce((total,next)=>{return total +next.count},0);
    },
    totalPrice(state){  //总价
      return state.cartList.reduce((total,next)=>{return total+ next.count * next.bookPrice;},0);
    }
  }
  ,
  mutations,
  strict:true,
  plugins:[logger()]
});
