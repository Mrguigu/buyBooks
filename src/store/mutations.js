import * as types from "./mutations-type.js";


export  default {
  /***
   *函数作用：将book添加的state中cartList中。
   * @param state
   * @param book  :所有添加图书的对象
   */
    [types.ADD_CART](state,book){
      //防止改变原对象
       let newBook =JSON.parse(JSON.stringify(book));
      //判断所添加的图书是否存在
      let product=state.cartList.find((item)=>{return  item.bookId===newBook.bookId;});
      if(product){
        product.count++;
      }else{
        newBook.count=1;     //这样不会改变原对象吗? 会的
        state.cartList.push(newBook);
      }
    },
  /**
   * 函数作用：更改cartList中指定book的数量
   * @param state
   * @param book  :所需改变的book对象
   * @param changeCount： 改变的数量
   * 返回值: 返回该book的在购物车剩余数量
   */
  [types.CHANGE_CART](state,{book,changeCount}){
      let newBook =JSON.parse(JSON.stringify(book));
      //判断所添加的图书是否存在
      let product=state.cartList.find((item)=>{return  item.bookId===newBook.bookId;});
      //剩余数量
      let surplus=0;
      if(product){
            product.count+=(changeCount);
            surplus=product.count;
            if(product.count===0){
                state.cartList=state.cartList.filter((item)=>{return item.count>0});
            }
       }
      return surplus;
    },
  /**
   * 函数作用:将购物车清空
   * @param state
   */
  [types.CLEAR_CART](state){
      state.cartList=[];
  },
  /**
   * 函数作用:删除指定book
   * 返回值: 删除是否成功
   * @param state
   * @param bookId: 指定book的id
   */
  [types.DELETE_CART](state,bookId){
       let count=state.cartList.length;
       state.cartList= state.cartList.filter((item)=>{return item.bookId!=bookId});
       if(count>state.cartList.length){
         return true;
       }else{
         return false;
       }
  }
}
