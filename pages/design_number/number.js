var area_item = {
    id: "",
    room_type: "",
    machin_type: "",
    horses_number: ""
}


var air_c_number_dict_dao = require("../../dao/air_c_number_dict_dao.js");
var room_type = air_c_number_dict_dao.getRoomType();
var machin_type = ['请先选择房型，然后在选择类型'];
var horses_number = ['请将房型跟类型选择完毕，然后在选择面积'];
var temp_room_type = "";
var area_array = [area_item]; //循环几行控件    以及将会生成的配置的数据
area_item.id = 1;

Page({
    data: {
      area_array: area_array,
      room_type: room_type,
      machin_type: machin_type,
      horses_number: horses_number,
      itemid: ""
    },

    upper: function (e) {
        console.log(e)
    },
    lower: function (e) {
        console.log(e)
    },
    scroll: function (e) {
        console.log(e)
    },

    //----------------1------------------//
    getId:function (e) {
        console.log('picker初始化，携带id', e.currentTarget.dataset.itemid)
        this.data.itemid =  e.currentTarget.dataset.itemid
    },
    bindPickerChange_1_1: function (e) {
        var temp = this.data.room_type[e.detail.value]
        area_array[this.data.itemid-1].room_type = temp;
        machin_type = air_c_number_dict_dao.getMachinType(temp);
        this.btn_refresh_view();
        this.refresh_machin_type();
    },
    bindPickerChange_1_2: function (e) {
      var temp = this.data.machin_type[e.detail.value]
      area_array[this.data.itemid - 1].machin_type = temp;
      horses_number = air_c_number_dict_dao.getHorsesNumber(area_array[this.data.itemid - 1].room_type, temp);
      this.btn_refresh_view();
      this.refresh_horses_number();
    },
    bindPickerChange_1_3: function (e) {
        var temp = this.data.horses_number[e.detail.value]
        area_array[this.data.itemid-1].horses_number = temp;
        this.btn_refresh_view();
    },


    btn_refresh_view: function (e) {
        this.setData({
            area_array: area_array
        })
    },
    refresh_machin_type: function (e) {
      this.setData({
        machin_type: machin_type
      })
    },
    refresh_horses_number: function (e) {
      this.setData({
        horses_number: horses_number
      })
    },
    //
    btn_add: function (e) {

        //增加一个 内容为空的 item
        area_array[area_array.length] = new Object();
        //为刚才增加的 这个数组 的item  设置 id
        area_array[area_array.length - 1].id = area_array.length;
        // area_array;

        machin_type = ['请先选择房型，然后在选择类型'];
        horses_number = ['请将房型跟类型选择完毕，然后在选择面积'];
        this.btn_refresh_view();
        this.refresh_machin_type();
        this.refresh_horses_number();
    },

    btn_build: function (e) {
      area_array = air_c_number_dict_dao.getDataList(area_array);
      this.btn_refresh_view();
        wx.navigateTo({
            url: '../configuration_center/center?number_array='+JSON.stringify(area_array)
        })
    },

    onLoad: function () {
    }

})



