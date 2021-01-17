
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 被点击的左侧的菜单
    currentIndex:0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop:0,
  },

  // 接口返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用缓存技术
    // 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      // 本地存储没有数据直接发送请求，获取数据
      this.getCates();
    }
    else{
      // 如果没有
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
        console.log('使用旧数据')
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        console.log(leftMenuList);
        console.log(rightContent);
        this.setData({
        leftMenuList,
          rightContent
        })
      }
    }
  },

  async getCates(){
    //  request({
    //    url : "/categories"
    //  })
    //  .then(res=>{
    //   //  console.log(res)
    //   this.Cates=res.data.message;

    //   // 使用缓存效果
    //   wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})

    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   let rightContent = this.Cates[0].children;
    //   // console.log(leftMenuList);
    //   // console.log(rightContent);
    //   this.setData({
    //    leftMenuList,
    //     rightContent
    //   })
    //  })

    // 使用es7的async await技术来发送请求
    const res = await request({url:'/categories'});

    // this.Cates=res.data.message;
    this.Cates = res;
    
      // 使用缓存效果
      wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})

      let leftMenuList = this.Cates.map(v=>v.cat_name);
      let rightContent = this.Cates[0].children;
      // console.log(leftMenuList);
      // console.log(rightContent);
      this.setData({
       leftMenuList,
        rightContent
      })
  },
    // 左侧菜单点击事件
    handleItemTap(e){
      const {index} = e.currentTarget.dataset;
      let rightContent = this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightContent,
        // 重新设置右侧内容的scroll-view标签距离顶部的距离
        scrollTop:0
      })
    }
})