// design_mix_center.js

var air_c_data_util = require('../../utils/airconditioner_data.js');
var data_all_array = [];
var data_out_array = [];

//内机数量
var air_machine_number;
//安装费用
var installation_cost;
//总费用
var total_cost;

Page({

  //刷新内机list内容
  btn_refsh_view: function (e) {
    this.setData({
      data_all_array: data_all_array
    })
  },

  //刷新外机list内容
  btn_refsh_out: function () {
    this.setData({
      data_out_array: data_out_array
    })
  },
  //
  view_installation_cost: function () {
    this.setData({
      air_machine_number: air_machine_number,
      installation_cost: installation_cost
    })
  },
  view_total_cost: function () {
    this.setData({
      total_cost: total_cost
    })
  },


  onLoad: function (options) {
    if (options) {
      var area_array = options.area_array;
      if (area_array) {
        area_array = JSON.parse(area_array);
        for (var i = 0, flag = true, len = area_array.length; i < len; flag ? i++ : i) {
          if (area_array[i]) {
            var a = area_array[i].room_type_id;
            var b = area_array[i].machin_type_id;
            var c = area_array[i].horses_number_id;
            if (!a || !b || !c || a == -1 || b == -1 || c == -1) {
              area_array.splice(i, 1);
              flag = false;
            } else {
              flag = true;
            }
          } else {
            flag = true;
          }
        }
        area_array = air_c_data_util.getAir_c_mix(area_array);
        // console.log(options);
        console.log(area_array);
        data_all_array = area_array;
        this.btn_refsh_view();
  
        air_machine_number = getInMaNumber(area_array);
        installation_cost = air_machine_number * 1500;
        total_cost = getTotalCost(area_array);
        this.btn_refsh_out();
        this.view_installation_cost();
        this.view_total_cost();
      }

    }
  }
})

//计算内机总数量
function getInMaNumber(dataList) {
  var temp = 0;
  for (var i = 0; i < dataList.length; i++) {
    var a = dataList[i].default_num;
    if (a) {
      temp = temp + Number(a);
    }
  }
  return temp;
}


//计算总费用
function getTotalCost(dataList) {
  var temp = 0;
  for (var i = 0; i < dataList.length; i++) {
    var a = dataList[i].price;
    if (a) {
      temp = temp + Number(a);
    }
  }
  temp = temp + installation_cost;

  return temp;
}
