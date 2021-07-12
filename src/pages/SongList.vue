<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li
        v-for="(item, index) in songStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="handleChangeView(item.name)">
        {{item.name}}
      </li>
    </ul>
    <div class="song-content">
      <content-list :contentList="data" path="song-list-album"></content-list>
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
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { mapGetters } from 'vuex'
import { songStyle } from '../assets/data/songList'
import { getSongList, getSongListOfStyle } from '../api/index'
export default {
  name: 'song-list',
  components: {
    ContentList
  },
  data () {
    return {
      songStyle: [], // 歌单导航栏类别
      activeName: '全部歌单',
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: [] // 歌单
    }
  },
  computed: {
    ...mapGetters([
      'songsList'
    ]),
    // 计算当前表格中的数据
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  mounted () {
    this.songStyle = songStyle
    this.handleChangeView('全部歌单')
  },
  methods: {
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 获取歌单
    handleChangeView: function (name) {
      this.activeName = name
      this.albumDatas = []
      if (name === '全部歌单') {
        this.getSongList(this.cur_page)
      } else {
        this.getSongListOfStyle(name)
      }
    },
    // 获取全部歌单
    getSongList (page) {
      getSongList()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 通过类别获取歌单
    getSongListOfStyle (style) {
      getSongListOfStyle(style)
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
@import '../assets/css/song-list.scss';
.song-list-header {
  width: 100%;
  padding: 0 0px;
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
    margin: 40px 20px 15px 15px;
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
