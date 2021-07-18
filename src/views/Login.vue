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
    };
  },
  methods: {
    switchFn() {
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
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.fullPath === this.path) to.meta.auth = true;
    next();
  },
};
</script>
