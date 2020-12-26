export const request=(params)=>{
  return newPromise((resolve,reject)=>{
    wx.request({
      ...params,
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err);
      }
    });
  })
}