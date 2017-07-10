// design_mix.js
var air_c_data_util = require('../../utils/airconditioner_data.js');


var area_item = {
  id: "",
  room_type: "",
  machin_type: "",
  horses_number: "",
  room_type_id: -1,
  machin_type_id: -1,
  horses_number_id: -1
}

var area_array = [area_item]; //循环几行控件    以及将会生成的配置的数据
area_item.id = 1;
var temp_room_type_id = -1;
var temp_machin_type_id = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area_array: area_array,
    room_type: ['书|卧', '客|餐厅'],
    machin_type: ['风管机', '单面嵌（进口）', '360度圆形天花机（进口）'],
    horses_number: [],
    itemid: ""
  },

  //----------------1------------------//
  getId: function (e) {
    console.log('picker初始化，携带id', e.currentTarget.dataset.itemid)
    this.data.itemid = e.currentTarget.dataset.itemid
  },
  
  bindPickerChange_1_1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('picker发送选择改变，携带值为', e)
    var temp = this.data.room_type[e.detail.value]
    temp_room_type_id = e.detail.value;
    console.log(temp)
    area_array[this.data.itemid - 1].room_type = temp;
    area_array[this.data.itemid - 1].room_type_id = e.detail.value;
    this.btn_refresh_view();
    this.refresh_horses_number();
  },
  bindPickerChange_1_2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var temp = this.data.machin_type[e.detail.value]
    temp_machin_type_id = e.detail.value;
    area_array[this.data.itemid - 1].machin_type = temp;
    area_array[this.data.itemid - 1].machin_type_id = e.detail.value;
    this.btn_refresh_view();
    this.refresh_horses_number();
  },
  bindPickerChange_1_3: function (e) {
    var temp = this.data.horses_number[e.detail.value]
    area_array[this.data.itemid - 1].horses_number = temp;
    area_array[this.data.itemid - 1].horses_number_id = e.detail.value;
    this.btn_refresh_view();
  },

  btn_refresh_view: function (e) {
    this.setData({
      area_array: area_array,
    })
  },
  //刷新匹数选择项
  refresh_horses_number:function(){
    var temp_horses_number =[];
    if (temp_room_type_id >= 0 && temp_room_type_id <= 1 && temp_machin_type_id >= 0 && temp_machin_type_id <= 2){
      temp_horses_number = air_c_data_util.getHorseList(temp_room_type_id, temp_machin_type_id)
    } else{
      console.log('没有选择房型,或者没有选择类型')
    }
    this.setData({
      horses_number: temp_horses_number,
    })
  },
  //
  btn_add: function (e) {
    //增加一个 内容为空的 item
    area_array[area_array.length] = new Object();
    //为刚才增加的 这个数组 的item  设置 id
    area_array[area_array.length - 1].id = area_array.length;
    area_array[area_array.length - 1].room_type_id = -1;
    area_array[area_array.length - 1].machin_type_id = -1;
    area_array[area_array.length - 1].horses_number_id = -1;
    // area_array;
    this.btn_refresh_view();
  },

  btn_build: function (e) {

    wx.navigateTo({
      url: '../design_mix_center/design_mix_center?area_array=' + JSON.stringify(area_array)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})


