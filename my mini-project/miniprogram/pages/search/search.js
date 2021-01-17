import { request } from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消按钮是否显示
    isFocus:false,
    //  输入框的值
    inpValue:""
  },

  TimeId:-1,

  // 输入框的值改变，就会触发事件
  handleInput(e){
    // console.log(e);
    // 获取注入框的值
    const {value} = e.detail;
    // 检验合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() =>{
      this.qsearch(value);
    },1000);
  },

  // 发送请求获取搜索建议 数据
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    // console.log(res);
    this.setData({
      goods:res
    })
  },

  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:'',
      isFocus:false,
      goods:[]
    })
  }
})