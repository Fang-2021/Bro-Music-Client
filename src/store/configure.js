const configure={
  state:{
    // HOST:'http://localhost:8888',
    HOST:'http://47.118.78.168:8888',
    loginIn:false,//用户是否登录
    searchWord:'',//搜索关键词
    showAside:false,//是否显示侧边栏
    activeName:'',//歌单类型名
    index:0,//列表中的序号
    inActive:false,
    path:''//当前路径
  },
  getters:{
    isActive: state=>{
      let isActive =state.isActive
      if(!isActive){
        isActive=JSON.parse(window.sessionStorage.getItem('isActive')||null)
      }
      return isActive
    },
    loginIn:state=>{
      let loginIn =state.loginIn
      if(!loginIn){
        loginIn=JSON.parse(window.sessionStorage.getItem('loginIn')||null)
      }
      return loginIn
    },
    activeName:state=>{
      let activeName=state.activeName
      if(!activeName){
        activeName=JSON.parse(window.sessionStorage.getItem('activeName')||null)
      }
      return activeName
    },
    showAside: state=>{
      let showAside =state.showAside
      if(!showAside){
        showAside=JSON.parse(window.sessionStorage.getItem('showAside')||null)
      }
      return showAside
    },
    index: state=>{
      let index= state.index
      if(!index){
        index.JSON.parse(window.sessionStorage.getItem('index')||null)
      }
      return index
    },
    searchWord: state=>state.searchWord,
    path: state=>state.path
  },
  mutations:{
    setIsActive:(state,isActive)=>{
      state.isActive =isActive
      window.sessionStorage.setItem('isActive',JSON.stringify(isActive))
    },
    setLoginIn:(state,loginIn)=>{
      state.loginIn=loginIn
      window.sessionStorage.setItem('loginIn',JSON.stringify(loginIn))
    },
    setActiveName:(state,activeName)=>{
      state.activeName=activeName
      window.sessionStorage.setItem('activeName',JSON.stringify(activeName))
    },
    setShowAside:(state,showAside)=>{
      state.showAside=showAside
      window.sessionStorage.setItem('showAside',JSON.stringify(showAside))
    },
    setIndex:(state,index)=>{state.index=index},
    setSearchWord:(state,searchWord)=>{state.searchWord=searchWord},
    setPath:(state,path)=>{state.path=path},
  },
  actions:{}
}
export  default configure
