import { request } from "../../request/index";

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true,
      },
      {
       id:1,
       value:'待付款',
       isActive:false,
     },
     {
       id:2,
       value:'代发货',
       isActive:false,
     },
     {
      id:3,
      value:'退货/退款',
      isActive:false,
    }
    ]
  },
  
  onShow(options) {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    }
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    // console.log(currentPage.options);
    
    const {type} = currentPage.options;
    // 激活选中页面标题 当 type = 1 index=0
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },

  // 获取订单列表方法
  async getOrders(type){
    const res = await request({url:"/my/orders/all",data:{type}});
    // console.log(res);
    this.setData({
      orders:res.orders.map(v=>({...v,create_time_cn:(new DataCue(v.create_item*1000).toLocaleString())}))
    })
  },

  // 根据标题索引来激活选中标题数组
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index ? v.isActive=true : v.isActive=false);
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e){
    // console.log(e);
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },

 


 
 
})