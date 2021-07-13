<template>
  <div class="about">
    About Page About Page
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      console.log("About", this.$route.meta.keepAlive);
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
$color: red;
.about {
  color: $color;
  font-size: 16px;
  h1 {
    color: $--color-primary;
    font-size: 32px;
  }
}
</style>
