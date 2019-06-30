<template>
  <div>
    <h3>{{title}}</h3>
    <el-form ref="loginForm" :model="form" :rules="rules " label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- 开课吧版表单元素 -->
    <my-form :model="form" :rules="rules" ref="loginForm2">
      <my-form-item label="用户名" prop="name">
        <div class="test">
          <section>

          <my-input v-model="form.name"></my-input>
          </section>
          <!-- <test> -->

          <!-- </test> -->
        </div>
      </my-form-item>
      <div class="test">
        <my-form-item label="密码" prop="pwd">
          <my-input type="password" v-model="form.pwd"></my-input>
        </my-form-item>
      </div>
      <my-form-item>
        <el-button type="primary" @click="submitForm2()">登录</el-button>
      </my-form-item>
    </my-form>
    {{form}}
  </div>
</template>

<script>
import myInput from "./Input.vue";
import myFormItem from "./FormItem.vue";
import myForm from "./Form.vue";
import test from "./test.vue";
export default {
  props: ["title"],
  data() {
    return {
      someValue: "fjdkls",
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称"
          },
          { min: 6, max: 10, message: "请输入6至10位的用户名" }
        ],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(validate => {
        if (validate) {
          alert("登录成功");
        } else {
          console.log("校验失败");
          return false;
        }
      });
    },
    submitForm2() {
      this.$refs.loginForm2.validate(validate => {
        if (validate) {
          alert("登录成功");
        } else {
          console.log("校验失败");
          return false;
        }
      });
    }
  },
  components: {
    myInput,
    myFormItem,
    myForm,
    test
  }
};
</script>

<style scoped>
</style>