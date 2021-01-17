// 发送异步请求的次数
let ajaxTimes = 0
export const request=(params)=>{
  ajaxTimes++;
  // 显示页面加载效果
  wx.showLoading({
    title: '加载中',
    mask:true,
  })
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url : baseURL + params.url,
      success:(result)=>{
        resolve(result.data.message)
      },
      fail:(err)=>{
        reject(err);
      },
      // 不管成功还是失败，都会触发的回调函数
      complete: () => {
        // 确保所有异步请求全部返回之后才结束加载效果
        ajaxTimes--;
        if(ajaxTimes===0){
        // 结束页面加载效果
        wx.hideLoading();
        }
      }
    });
  })
}