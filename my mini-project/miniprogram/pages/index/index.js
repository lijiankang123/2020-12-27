//index.js
const app = getApp()
import { request } from '../../request/index'

Page({
  data: {
    navigation:[]
  },

  onLoad: function(options) {
    let db = wx.cloud.database();
    let coll = db.collection('index_floor');
    // console.log(coll);
    coll.get({
      success:res=>{
        this.setData({
          floor:res.data[0].message
        })
        // console.log(res.data[0].message);
      }
    })
  },

})
