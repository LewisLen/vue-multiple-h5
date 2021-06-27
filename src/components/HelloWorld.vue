<template>
  <div class="content">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="img">img</div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <p class="describe">{{ item.describe }}</p>
          <p class="star">{{ item.star }}</p>
          <p class="amount">{{ item.amount }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: "001",
          title: "科技奇葩说",
          describe: "红哦基地送啊就佛i记得扫if就打死哦啊就",
          star: "4.0",
          amount: "5000元",
        },
        {
          id: "002",
          title: "科技奇葩说",
          describe: "红哦基地送啊就佛i记得扫if就打死哦啊就",
          star: "4.0",
          amount: "5000元",
        },
        {
          id: "003",
          title: "科技奇葩说",
          describe: "红哦基地送啊就佛i记得扫if就打死哦啊就",
          star: "4.0",
          amount: "5000元",
        },
        {
          id: "004",
          title: "科技奇葩说",
          describe: "红哦基地送啊就佛i记得扫if就打死哦啊就",
          star: "4.0",
          amount: "5000元",
        },
        {
          id: "005",
          title: "科技奇葩说",
          describe: "红哦基地送啊就佛i记得扫if就打死哦啊就",
          star: "4.0",
          amount: "5000元",
        },
      ],
    };
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
  justify-content: space-between;
  padding-bottom: 40px;
  padding-top: 40px;
  border-bottom: 2px solid #f4f4f4;
}
.content .img {
  width: 192px;
  height: 192px;
  background-color: beige;
}
.content .text {
  height: 192px;
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
