<template>
  <div id="app">
    <p v-if="showName">{{name}}</p>
    <form-test :title="titleVar"></form-test>
    <ul>
      <li v-for="(item, index) in goods" :key="index">
        <span>{{item.text}}</span>
        <span>￥{{item.price}}</span>
        <button @click="addCarts(index)">添加购物车s</button>
      </li>
    </ul>
    <!-- <input type="text" v-model="text">
    <button @click="addGoods">添加</button>-->
    <cart :name="name"></cart>
    <my-button @lala='handleClick'></my-button>
  </div>
</template>

<script>
import Cart from "./components/Cart.vue";
import FormTest from "./components/FormTest.vue";
import myButton from "./components/Button.vue";
import axios from 'axios';
export default {
  name: "app",
  data() {
    return {
      name: "开课吧",
      showName: false,
      goods: [],
      text: "",
      titleVar: '饿了么表单dfd'
    };
  },
  created() {
    // setTimeout(() => {
    //   this.showName = true;
    // }, 2000);
    this.getGoods();
  },
  methods: {
    async getGoods() {
      // axios.get('/api/goods').then(res => {
      //   this.goods = res.data.list;
      // })
      let res = await axios.get('/api/goods');
      this.goods = res.data.list;
    },
    addGoods() {
      if (this.text) {
        this.goods.push({
          text: this.text
        });
        this.text = "";
      }
    },
    addCarts(i) {
      const good = this.goods[i];
      this.$bus.$emit("addCart", good);
      // this.$root.$emit('addCart', good);
      // const ret = this.cart.find(v => v.id === good.id);
      // if(ret) {
      //   ret.count += 1;
      // } else {
      //   let r = {
      //     ...good,
      //     count: 1,
      //     active: true
      //   }
      //   this.cart.push(r);
      // }
    },
    handleClick(obj) {
      console.log(obj);
    }
  },
  components: {
    Cart,
    FormTest,
    myButton
  }
};
</script>

<style scoped>
</style>