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
    // 全选数据
    allChecked:false,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },

  onShow(){
    // 获取缓存中地址数据
    const address = wx.getStorageSync("address");
    // 获取缓存中购物车数据
    const cart = wx.getStorageSync("cart") || [];
    // 全选
    // 合并 优化代码
    // const allChecked =cart.length ? cart.every(v=>v.checked) : false;
    // 总价格 总数量
   this.setData({address});
   this.setCart(cart);
  },
  
 
    // 1.点击 收货地址
  async handleChooseAdress(){
      try {
      // 使用引入的 promise 写法
      // 2.1 获取权限状态
      const res1 = await getSetting();
      // 2.2 获取权限状态
      const scopeAddress = res1.authSetting["scope.address"];
      if(scopeAddress === false){
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      wx.setStorageSync('address',address);
    } catch (error) {
     console.log(error)
 }
},

  // 商品的选中
  handelItemChange(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // console.log(goods_id)
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked=!cart[index].checked;
    // 把购物车数据重新放置到data中，缓存中
    this.setCart(cart);
    

    
  },

  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买数量
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length!=0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart);
  },

  // 商品全选功能
  handleItemAllCheck(){
    // 1.获取data中的数据
    let {cart,allChecked} = this.data;
    // 2.修改值 取反
    allChecked=!allChecked;
    // 3.循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 4.把修改后得值填充回data或缓存中
    this.setCart(cart);
  },

  // 商品数量的编辑功能
  async handleItemNumEdit(e){
    // 获取传递过来的数据
    const {operation,id} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart}=this.data;
    // 找到需要修改的商品索引
    const index=cart.findIndex(v=>v.goods_id===id);
    // 判断是否需要执行删除
    if(cart[index].num===1 && operation===-1){
      const res = await showModal({content:'您是否要删除?'});
      if (res.confirm) {
        cart.splice(index,1),
        this.setCart(cart)
      }
    }else{
      // 进行商品数量修改
      cart[index].num += operation;
      this.setCart(cart);
  }
  },

  // 商品支付
  async handlePay(){
    // 判断有无收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:'您还没有添加收货地址'});
      return;
    }
    // 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:'您还没有选购商品'});
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})

  // 2.1 获取权限状态
    // wx.getSetting({
    //   success: (result) => {
    //     // 2.2 获取权限状态
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if(scopeAddress === true || scopeAddress === undefined){
    //       wx.chooseAddress({
    //         success:(result1)=>{
    //           console.log(result1);
    //         }
    //       })
    //     }else{
          // 2.3 用户以前拒绝过授予权限 诱导用户打开授权页面
    //       wx.openSetting({
    //         success:(result2) => {
    //           // console.log(result2)
    //           // 2.4 获取用户地址代码
    //           wx.chooseAddress({
    //              success:(result3)=>{
    //                console.log(result3)
    //              }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })