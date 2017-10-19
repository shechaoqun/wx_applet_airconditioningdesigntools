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
            var number_array = options.number_array;
            if (area_array) {
                area_array = JSON.parse(area_array);
                data_all_array = area_array;
                this.btn_refsh_view();
                data_out_array = getTowingRate(area_array);
                air_machine_number = getInMaNumber(area_array);
                installation_cost = air_machine_number * 1500;
                total_cost = getTotalCost(area_array);
                this.btn_refsh_out();
                this.view_installation_cost();
                this.view_total_cost();
            }
            if (number_array) {
                number_array = JSON.parse(number_array);
                data_all_array = number_array;
                this.btn_refsh_view();
                data_out_array = getTowingRate(number_array);
                air_machine_number = getInMaNumber(number_array);
                installation_cost = air_machine_number * 1500;
                total_cost = getTotalCost(number_array);
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

//计算内机总冷量
function getInMaCold(dataList) {
    var temp = 0;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].default_num > 0) {
        var a = dataList[i].quantity_cold;
        var b = dataList[i].default_num;
        a = a.substring(0, a.length - 2);
        a = Number(a)*b;
        if (a) {
          // a = a.substring(0, a.length - 2);
          temp = temp + Number(a);
        }
      }else {
        var a = dataList[i].quantity_cold;
        if (a) {
          a = a.substring(0, a.length - 2);
          temp = temp + Number(a);
        }
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
    var alloutmachine = air_c_data_util.getAir_master(getInMaCold(dataList));
    for (var j = 0; j < alloutmachine.length; j++) {
        var a = alloutmachine[j].price;
        if (a) {
            temp = temp + Number(a);
        }
    }

    temp = temp + installation_cost;

    return temp;
}

//计算拖带率 重新封装data_out_array  内机冷量和/外机冷量 *100%
function getTowingRate(dataList) {

  var temp =[]
  temp = air_c_data_util.getAir_master(getInMaCold(dataList));

  for (var i = 0; i < temp.length; i++) {
    var a = temp[i].quantity_cold;
    a = a.substring(0, a.length - 2);
    a = Number(a);
    if (a) {
      var num = getInMaCold(dataList) / a;
      num = Number(num);
      num = (num * 100).toFixed(0);
      temp[i].towing_rate = num + "%";

      
    }
  }
  return temp;

}
