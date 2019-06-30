<template>
  <form action>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  provide() {
    return {
      // 将表单的实例传递给后代
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created() {
    // 缓存需要校验的项
    this.fields = [];
    this.$on("formItemAdd", item => this.fields.push(item));
  },
  methods: {
    // 将FormItem数组转化为validate()返回的promise数组
    async validate(callback) {
      const tasks = this.fields.map(item => item.validate());
      console.log(tasks)
      //    获取所以结果统一处理
      const results = await Promise.all(tasks);
      let ret = true;
      ret = results.every(item => item);
      console.log(ret);
      callback(ret);
    }
  }
};
</script>

<style scoped>
</style>