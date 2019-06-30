<template>
  <input :type="type" :value="inputValue" @input="inputHandler" @change="handleChange" @blur="handleBlur">
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    validateEvent: {
        type: Boolean,
        default: true
    }
  },
  data() {
    return {
      // 单项数据流的原则，组件内不能修改props的属性
      inputValue: this.value
    };
  },
  watch: {
      inputValue(val) {
          if(this.validateEvent) {
              this.$dispatch('FormItem','validate',[val]);
          }
      }
  },
  methods: {
    inputHandler(e) {
      this.inputValue = e.target.value;
      // 通知父组件 值的更新
      this.$emit("input", this.inputValue);
    console.log(this.$parent.$options.name)
    // 父级如果是单纯标签则可以直接使用该方法向上传递事件 
    // 但是如果父级是自定义的其他组件 则无法使用该方法向上传递事件
    // 因为上一级的组件不是该配套组件 没有对应的方法
    // 所以需要使用dispatch向上层层查找直到找到我们自己的配套的组件 就能调用相应的方法
    //   this.$parent.$emit("validate", this.inputValue);
    },
    handleChange(e) {
        this.$emit("change", e.target.value);
    },
    handleBlur(e) {
    //      this.inputValue = e.target.value;
    //   // 通知父组件 值的更新
    //   this.$emit("input", this.inputValue);
    },
    $dispatch(componentName, eventName, params) {
      // 向父元素广播事件
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // 向上循环查找 只要条件为true循环就一直执行 为false则跳出循环
      while(parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if(parent) {
          name = parent.$options.name;
        }
      }
      if(parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};
</script>

<style scoped>
</style>