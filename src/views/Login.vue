<template>
  <div class="login">
    <h1>This is an Login page</h1>
    <button @click="switchFn">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: "",
      auth: false,
    };
  },
  methods: {
    switchFn() {
      this.$route.meta.auth = true;
      // 模拟登录之后跳回
      this.$router.replace({
        path: this.path,
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    next((vm) => {
      vm.path = from.fullPath;
      vm.auth = from.meta.auth;
    });
  },
};
</script>
