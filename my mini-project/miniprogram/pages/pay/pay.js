//引入
import { getSetting,chooseAddress,openSetting,showModal,showToast } from '../../utils/asyncWx'
import regeneratorRuntime,{async} from '../../lib/runtime/runtime'


Page({

  // 1.获取用户收货地址
  // 2.获取用户对所授予的小程序的收货地址的权限 状态是scope

  data:{
    // 地址数据
    address:{},
    //购物车数据
    cart:[],
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },

  onShow(){
    // 获取缓存中地址数据
    const address = wx.getStorageSync("address");
    // 获取缓存中购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数据
    cart = cart.filter(v=>v.checked);

   this.setData({address});

  //  总价格 总数量
   let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  
  // 点击支付功能
  handleOrderPay(){
    
  }
  
})

  