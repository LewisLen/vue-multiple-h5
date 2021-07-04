<template>
  <div class="task">
    <h1>This is an about Task</h1>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      console.log("Task", this.$route.meta.keepAlive);
    }, 1000);
  },
};
</script>
