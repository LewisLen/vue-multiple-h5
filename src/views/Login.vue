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
      console.log(this.path);
      // this.$router.replace({
      //   path: this.path,
      // });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.path = from.fullPath;
    });
  },
};
</script>
