<template>
  <div class="singer">
    <ul class="singer-header">
      <li
        v-for="(item, index) in singerStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="handleChangeView(item)">
        {{item.name}}
      </li>
    </ul>
    <content-list :contentList="data" path="singer-album"></content-list>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="albumDatas.length">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import ContentList from "../components/ContentList";
import {singerStyle} from "../assets/data/singer";
import {getAllSinger,getSingerOfSex} from "../api";

export default {
  name: "singer",
  components:{
    ContentList
  },
  data(){
    return {
      singerStyle: [], // 歌手导航栏类别
      activeName: '全部歌手',
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: []
    }
  },
  computed: {
    // 计算当前表格中的数据
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created () {
    this.singerStyle = singerStyle
    this.getAllSinger()
  },
  methods: {
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleChangeView (item) {
      this.activeName = item.name
      this.albumDatas = []
      if (item.name === '全部歌手') {
        this.getAllSinger()
      } else {
        this.getSingerSex(item.type)
      }
    },
    // 获取所有歌手
    getAllSinger () {
      getAllSinger()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 通过性别对歌手分类
    getSingerSex (sex) {
      getSingerOfSex(sex)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/singer.scss";
  .singer-header {
    width: 100%;
    padding: 0 40px;
    position: relative;
    background: url('../assets/img/background.jpg');
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    li {
      display: inline-block;
      line-height: 40px;
      margin: 40px 20px 15px 20px;
      font-size: 20px;
      font-weight: 400;
      color: $color-grey;
      border-bottom: none;
      cursor: pointer;
    }
    li.active {
      color: $color-black;
      font-weight: 600;
      border-bottom: 4px solid $color-black;
    }
  }
  .pagination {
    @include layout(center);
    transform: translateY(15px);
  }

</style>
