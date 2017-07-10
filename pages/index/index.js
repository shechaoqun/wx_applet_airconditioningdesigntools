//index.js
var imgUrls=require('../../constant/constant.js');
// var air_c_data_util = require('../../utils/airconditioner_data.js');


//获取应用实例
var app = getApp()
Page({
  data: {
    indexImgUrl:imgUrls.indexImgUrl,
    motto: 'Hello World ti',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
   //根据面积设计
  btn_according_to_area_design: function(e) {
    // console.log(thisimgUrls.getImgUrls.indexImgUrl, e)

     wx.navigateTo({
      url: '../design_area/area'
    })
  },
  //根据匹数设计
  btn_according_to_the_number_of_design: function(e) {
     wx.navigateTo({
      url: '../design_number/number'
    })
  },
  //风管机简介
  btn_according_to_the_air_introduction: function (e) {
    wx.navigateTo({
      url: '../introduction/introduction'
    })
  },
  //综合设计
  btn_according_to_the_new_design: function (e) {
    wx.navigateTo({
      url: '../design_mix/design_mix'
    })
  },
  //实景欣赏
  btn_according_to_the_enjoy: function (e) {
    wx.navigateTo({
      url: '../real_appreciate/real_appreciate'
    })
  },
  //我的配置中心
  btn_my_configuration_center: function(e) {
     wx.navigateTo({
      url: '../configuration_center/center'
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
