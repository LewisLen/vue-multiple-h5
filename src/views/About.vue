<template>
  <div class="about">
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
