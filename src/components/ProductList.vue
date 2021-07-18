<template>
  <div class="content">
    <ul>
      <li v-for="item in list" :key="item._id">
        <div class="img">
          <img src="../assets/imgs/logo.png" alt="商品" />
        </div>
        <div class="text">
          <div class="title">{{ item.productName }}</div>
          <p class="describe">{{ item.typeText }}</p>
          <p class="star">{{ item.typeId }}</p>
          <p class="amount">{{ item.price }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getProductList } from "../api/apis/product";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    getProductList().then((res) => {
      this.list = res.data;
    });
  },
};
</script>
<style scoped>
.content {
  padding-left: 32px;
  padding-right: 32px;
}
.content li {
  display: flex;
  padding-bottom: 40px;
  padding-top: 40px;
  border-bottom: 2px solid #f4f4f4;
}
.content .img {
  width: 192px;
  height: 192px;
  background-color: beige;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .text {
  height: 192px;
  margin-left: 40px;
}
.content .title {
  opacity: 0.9;
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #000;
  letter-spacing: 0;
}
.content .describe {
  opacity: 0.6;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  letter-spacing: 0;
}
.content .star {
  opacity: 0.6;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  letter-spacing: 0;
}
.content .amount {
  font-family: PingFangSC-Semibold;
  font-size: 32px;
  color: #fc430e;
  letter-spacing: 0;
}
</style>
