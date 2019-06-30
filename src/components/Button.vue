<template>
    <div>
        <button @click="handleClick">我的button</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick() {
                this.$emit('lala',{msg:'hello'});
            }
        },
    }
</script>

<style scoped>

</style>