<template>
<div class="home">
  <div class="background">
    <!--  轮播图-->
    <swiper :swiperList="swiperList"/>
    <!--  热门歌单-->
    <div class="section">
      <div class="section-title">歌单</div>
      <content-list :contentList="songList" path="song-list-album"></content-list>
    </div>
    <!--  热门歌手-->
    <div class="section">
      <div class="section-title">歌手</div>
      <content-list :contentList="singerList" path="singer-album"></content-list>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from "../components/Swiper";
import {swiperList} from "../assets/data/swiper";
import {getSongList,getAllSinger} from "../api/index";
import ContentList from "../components/ContentList.vue";
export default {
  name: "home",
  components:{
    Swiper,
    ContentList
  },
  data(){
    return{
      swiperList:[],
      songList:[],
      singerList:[]
    }
  },
  created() {
    this.swiperList=swiperList
    this.getSongList()
    this.getAllSinger()
  },
  methods:{
    getSongList(){
      getSongList()
      .then(res=>{
        this.songList=res.sort().slice(0,10)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getAllSinger(){
      getAllSinger()
        .then(res=>{
          this.singerList=res.sort().slice(0,10)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
.background {
  position: relative;
  background: url('../assets/img/background.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.section {
  position: relative;
  background: url('../assets/img/outBackground.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  width: 100%;
  margin-top: 20px;
  padding: $content-padding;
  background-color: $color-white;
  box-sizing: border-box;
  .section-title {
    height: 60px;
    line-height: 60px;
    padding-top: 10px;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    color: $color-black;
    box-sizing: border-box;
  }
}
</style>
