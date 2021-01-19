// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    // 自定义组件图片
    chooseImages:[],
    // 文本域的内容
    textVal:''
  },

  // 外网图片的路径数组
  UpLoadImgs:[],

  // 标题单击事件 从子组件传递过来的
  handleTabsItemChange(e){
    // console.log(e);
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index ? v.isActive=true : v.isActive=false);
    this.setData({
      tabs
    })
  },

  // 点击加号 选择图片
  handleChooseImg(){
    // 调用小程序内置的api
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res)=>{
        this.setData({
          chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
        })
      },
    })
  },

  // 点击自定义图片组件
  handleRemoveImage(e){
    // console.log(e);
    // 获取被点击图片的索引
    const {index} = e.currentTarget.dataset;
    // console.log(index);
    // 获取data中的图片中数组
    let {chooseImages} = this.data;
    // 删除元素
    chooseImages.splice(index,1);
    this.setData({
      chooseImages
    })
  },

  // 文本域的输入事件
  handleTextInput(e){
    // console.log(e);
    this.setData({
      textVal:e.detail.value
    })
  },

  // 提交按钮事件
  handleFormSubmit(){
    // 获取输入的值
    const {textVal,chooseImages} = this.data;
    // 判断是否合法
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask:true
      });
      return;
    }

    // 显示加载图标
    wx.showLoading({
      title:'正在上传中',
      mask:true
    })

    if(chooseImages.length !=0 ){
    chooseImages.forEach((v,i)=>{
    //上传图片 到指定的图片服务器
    wx.uploadFile({
      // 图片要传到哪里
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      // 被上传的图片路径
      filePath: v,
      // 上传的文件的名称 后台来获取文件
      name:'file',
      // 顺带的文本信息
      formData: {}, // HTTP 请求中其他额外的 form data
      success: (res)=>{
        // console.log(res)
        let url = JSON.parse(res.data);
        this.UpLoadImgs.push(url);

        // 所有的图片都上传完毕才触发
        if(i===chooseImages.length-1){
          // 关闭加载图标
          wx.hideLoading();
          // 重置页面
          this.setData({
            textVal:'',
            chooseImages:[]
          })
          // 返回上一个页面
          wx.navigateBack({
            delta: 1, 
          })
        }
      },
    });
  })
}else{
  wx.hideLoading();
  // console.log(1)
  wx.navigateBack({
    delta: 1, 
  })
}
  },
    
})