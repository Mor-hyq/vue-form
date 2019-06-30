<template>
  <div>
    {{name}}购物车
    <table border="1">
      <tr>
          <th></th>
        <th>课程名</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(item, index) in cart" :key="item.id" :class="{active:item.active}">
        <td>
            <input type="checkbox" name="" id="" v-model="item.active">
        </td>
        <td>{{item.text}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="minus(index)">-</button>
          {{item.count}}
          <button @click="add(index)">+</button>
        </td>
        <td>{{item.price * item.count}}</td>
      </tr>
      <tr>
          <td></td>
          <td colspan="2">{{activeCount}}/{{totalCount}}</td>
          <td colspan="2">￥{{totalPrice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ["name"],
  data() {
      return {
          cart: []
      }
  },
  watch: {
      cart: {
          handler() {
              this.setLocal();
          },
          deep: true
      }
  },
  created() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.$bus.$on('addCart', (good) => {
        const ret = this.cart.find(v => v.id === good.id);
        if(ret) {
          ret.count += 1;
        } else {
          let r = {
            ...good,
            count: 1,
            active: true
          }
          this.cart.push(r);
        }
      });
  },
  computed: {
      activeCount() {
          return this.cart.filter(v => v.active).length;
      },
      totalCount() {
          return this.cart.length;
      },
      totalPrice() {
          let num = 0;
          let actArr = this.cart.forEach(item => {
              if(item.active) {
                  num += item.price * item.count;
              }
          });
        return num;
      }
  },
  methods: {
       setLocal() {
        localStorage.setItem('cart',JSON.stringify(this.cart));
      },
    minus(i) {
      const count = this.cart[i].count;
      if (count < 2) {
        this.remove(i);
      } else {
        this.cart[i].count -= 1;
      }
    },
    add(i) {
      this.cart[i].count += 1;
    },
    remove(i) {
      if (window.confirm(`是否删除${this.cart[i].text}商品？`))
        this.cart.splice(i, 1);
    }
  }
};
</script>

<style scoped>
    tr.active {
        color: #fd8300;
    }
</style>