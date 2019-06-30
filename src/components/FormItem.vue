<template>
    <div>
        <label v-if="label">{{label}}</label>
        <div>
            <slot></slot>
            <!-- 校验错误信息 -->
            <p v-if="validateStatus == 'error'" class="r">{{errorMessage}}</p>
        </div>
    </div>
</template>

<script>
import schema from 'async-validator';
    export default {
        name: 'FormItem',
        inject: ['form'], // 注入form获取model和rules
        props: ['label', 'prop'],
        data() {
            return {
                validateStatus: '',
                errorMessage: ''
            }
        },
        created() {
            // on与emit方法一一对应
            // 由于子组件会派发该方法 所以需要在父组件先监听该方法
            this.$on('validate',this.validate);
        },
        mounted() {  // 挂载到form上时，派发一个添加事件
            if(this.prop) { // 只在有prop属性时才派发 即只在有表单验证时才派发
                this.$parent.$emit('formItemAdd', this);
            }
        },
        methods: {
            validate() {
                return new Promise(resolve => {
                    // 校验当前项 依赖async-validator
                    const descriptor = {[this.prop]: this.form.rules[this.prop]};
                    const validator = new schema(descriptor);
                    validator.validate({[this.prop]:this.form.model[this.prop]}, errors => {
                        if(errors) {
                            this.validateStatus = 'error';
                            this.errorMessage = errors[0].message;
                            resolve(false);
                        } else {
                            this.validateStatus = '';
                            this.errorMessage = '';
                            resolve(true);
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .r {
        color: red;
    }
</style>