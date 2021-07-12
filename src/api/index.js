import axios from 'axios'
import {get,post} from "./http";

//用户API
//登录
export const loginIn = (params)=>post(`client/user/login/status`,params)
//注册
export const SignUp=(params)=>post(`client/user/add`,params)
//返回指定ID用户
export const getUserOfId=(id)=>get(`client/user/detail?id=${id}`)
//更新用户信息
export const updateUserMsg=(params)=>post(`client/user/update`,params)

//歌单API
//获取全部歌单
export const getSongList=()=>get(`client/songList`)
//返回指定风格歌单
export const getSongListOfStyle = (style) => get(`client/songList/likeStyle/detail?style=${style}`)
// 返回标题包含文字的歌单
export const getSongListOfLikeTitle = (keywords) => get(`client/songList/likeTitle/detail?title=${keywords}`)
// 返回歌单里指定歌单ID的歌曲
export const getListSongOfSongId =(songListId)=>get(`client/listSong/detail?songListId=${songListId}`)

// =======================> 歌手 API
// 返回所有歌手
export const getAllSinger = () => get('client/singer')
// 通过性别对歌手分类
export const getSingerOfSex = (sex) => get(`client/singer/sex/detail?sex=${sex}`)
 //返回指定Id的歌手
 export const getSingerOfId= (id) => get(`client/singer/id/detail?id=${id}`)
// =======================> 收藏 API
// 返回的指定用户ID的收藏列表
export const getCollectionOfUser = (userId) => get(`client/collection/detail?userId=${userId}`)
// 添加收藏的歌曲 type: 0 代表歌曲， 1 代表歌单
export const setCollection = (params) => post(`client/collection/add`, params)
// 判断歌曲是否已收藏
export const isCollected = (params) => post(`client/collection/isCollected`,params)

// =======================> 评分 API
// 提交评分
export const setRank = (params) => post(`client/rank/add`, params)
// 获取指定歌单的评分
export const getRankOfSongListId = (songListId) => get(`client/rank?songListId=${songListId}`)

// =======================> 评论 API
// 添加评论
export const setComment = (params) => post(`client/comment/add`, params)
// 点赞
export const setLike = (params) => post(`client/comment/like`, params)
// 返回所有评论
export const getAllComment = (type, id) => {
  let url = ''
  if (type === 1) {
    url = `client/comment/songList/detail?songListId=${id}`
  } else if (type === 0) {
    url = `client/comment/song/detail?songId=${id}`
  }
  return get(url)
}

// =======================> 歌曲 API
// 返回指定歌曲ID的歌曲
export const getSongOfId = (id) => get(`client/song/detail?id=${id}`)
// 返回指定歌手ID的歌曲
export const getSongOfSingerId = (id) => get(`client/song/singerId/detail?singerId=${id}`)
// 返回指定歌手名 或歌名的歌曲
export const getSongOfSingerName = (keywords) => get(`client/song/singerName/detail?name=${keywords}`)
// 下载音乐
export const download = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})
