//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
