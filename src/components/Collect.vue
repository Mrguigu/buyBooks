<template>
    <div>
      <MHeader>购物车</MHeader>
      <div class="content">
        <ul>
          <li v-for="(item,index) in cartList" :key="index">
            <img :src="item.bookCover" alt=""/>
            <div class="product_info">
              <h3>{{item.bookName}}</h3>
              <p>
                <button @click="add(item)">+</button>
                X{{item.count}}
                <button @click="minus(item)">-</button>
              </p>
                <b>小计:{{item.bookPrice* item.count}}</b>
                <button @click="deleteBook(item.bookId)">删除</button>
            </div>
          </li>
        </ul>
        <div class="total">
          <b>合计:{{totalPrice}}</b>
          <button>结算({{count}})</button>
        </div>
      </div>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader";
    import {mapState,mapGetters} from "vuex";
    import * as types from "../store/mutations-type.js";
    export default {
        name: "Collect",
      components: {MHeader},
      computed:{
          ...mapState({
            cartList:(state)=>state.cartList
          }),//将对象内的对象
          ...mapGetters(["count","totalPrice"])
      },
      methods:{
          add(book){  //使指定的book数量加一
           this.$store.commit(types.CHANGE_CART,{book,changeCount:1});
          },
          minus(book){  //使指定的book数量减一
            this.$store.commit(types.CHANGE_CART,{book,changeCount:-1});
          },
          deleteBook(bookId){ //删除指定book
            this.$store.commit(types.DELETE_CART,bookId);
          }
      }
    }
</script>

<style scoped>
  .content{
    bottom: 110px;  /*只覆盖bottom*/
  }
  .content>ul>li{
    display: flex;
  }
  .content ul li img{
    width: 120px;
    height: 150px;
  }
  .product_info button{
    width: 40px;
    height: 25px;
    color: #ffffff;
    background: red;
    /*display: block;*/
    border: none;
    border-radius: 15px;
    outline: none;
  }
  .content b{
    color: red;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;    /*为什么没用*/
  }
  .product_info{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .total{
    position: fixed;
    bottom: 50px;
    left: 0px;
    height: 60px;
    width: 100%;
    border-top: 1px solid #cccccc;
    background: white;
  }
  .total b{
    width: 50%;
    height: auto;
    float: left;
    margin: 0;
  }
  .total button{
    float: right;
    height: inherit;
    width: 100px;
    font-size: larger;
    background: #cccccc;
    color: #ffffff;
    border:none;
    outline: none;
  }
</style>
