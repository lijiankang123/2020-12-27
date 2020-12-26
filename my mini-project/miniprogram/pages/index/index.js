//index.js
const app = getApp()
import { request } from '../../request/index'

Page({
  data: {
    navigation:[]
  },

  onLoad: function(options) {
    let db = wx.cloud.database();
    let coll = db.collection('navigation');
    coll.field({
      image:true,
      name:true,
      _id:false
    }).get({
      success:res=>{
        this.setData({
          navigation:res.data
        })
      }
    })
  },

})
