<template>
<div class="content-list">
  <ul class="section-content">
    <li class="content-item" v-for="(item,index) in contentList" :key="index">
      <div class="kuo" @click="goAlbum(item)">
        <el-image
          style="width: 200px; height: 200px"
          :src=attachImageUrl(item.pic)
          :fit="'cover'"></el-image>
      </div>
      <div class="section-title">{{item.name||item.title}}</div>
    </li>
  </ul>
</div>

</template>

<script>
import mixin from "../mixins";
export default {
  name: "content-list",
  mixins:[mixin],
  props:{
    contentList:Array,
    path:String
  },
  methods:{
    goAlbum(item){
      this.$store.commit('setPath', '')
      this.$store.commit('setTempList',item)
      this.$router.push({path:`/${this.path}/${item.id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/content-list.scss";
.content-list {
  min-height: 500px;
  padding: 0 0px;
  .section-content {
    @include layout(flex-start, stretch, row, wrap);
  }
  position: relative;
  background: url('../assets/img/contentBackground.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
