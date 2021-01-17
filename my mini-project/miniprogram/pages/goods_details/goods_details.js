import { request } from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
// pages/goods_details/goods_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    // 商品是否被收藏过
    isCollect:false
  },

  // 存放接口返回的数据
  goodsInfo:[],

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    // console.log(options);
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}});
    // console.log(goodsObj);
    this.goodsInfo = goodsObj;
    // 获取缓存中商品收藏数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.goodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        //有些iPhone用户不能使用webp格式图片
        // 将webp格式转换为jpg格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },

  // 点击轮播图,放大预览
  handlePrevewImage(e){
    //1.先构建要预览的图片数组
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
    // 2.接受传递过来的url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      // 解构
      current,
      urls
    })
  },

  // 点击 加入购物车
  handleCart(){
    // console.log('加入购物车')
    // 1.获取缓存中 购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 2.判断商品是否存在于购物车数组
    let index = cart.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if(index===-1){
      this.goodsInfo.num = 1;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo)
    }else{
      cart[index].num++
    }
    // 3.吧购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 4.弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      // 防手抖，点击后1.5s才能再次触发
      mask:true,
    })
  },
  
  // 点击商品收藏图标
  handleCollect(){
    let isCollect = false;
    let collect=wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title:"取消成功",
        icon:'success',
        mask:true
      })
    }else{
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title:"收藏成功",
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  }
  
})