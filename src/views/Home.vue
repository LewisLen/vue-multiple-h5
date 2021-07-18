<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/imgs/logo.png" />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Home",
  components: {
    ProductList,
  },
};
</script>
<style lang="scss">
.home img {
  width: 50%;
  display: block;
  margin: auto;
}
</style>
