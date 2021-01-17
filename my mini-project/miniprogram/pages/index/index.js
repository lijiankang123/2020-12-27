//index.js
const app = getApp()
import { request } from '../../request/index'


Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  onLoad: function(options) {
    this.getSwiper();
    this.getCates();
    this.getFloor();
  },

  // 获取轮播图数据
  getSwiper(){
    request({
      url: '/home/swiperdata'
    })
    .then(result=>{
      this.setData({swiperList:result})
    })
  },

  // 获取导航数据
  getCates(){
     request({
       url:'/home/catitems'
     })
     .then(result=>{
      //  console.log(result);
       this.setData({catesList:result})
     })
  },
  
  getFloor(){
     request({
       url:'/home/floordata'
     })
     .then(result=>{
       this.setData({
         floorList:result
       })
     })
  }
})
