/**
 * Created by chaoqunshe on 4/12/17.
 */
//数据字典 面积
var air_c_area_dict = require('../entity/air_c_area_dict.js');
air_c_area_dict = air_c_area_dict.air_c_area_dict;
//匹数
var air_c_number_dict = require('../entity/air_c_number_dict.js');
air_c_number_dict = air_c_number_dict.air_c_number_dict;
//外机
var air_master_dict = require('../entity/air_master_dict.js');
air_master_dict = air_master_dict.air_master_dict;
// 混合 一拖一
var air_c_mix_dict = require('../entity/air_c_mix_dict.js');
air_c_mix_dict = air_c_mix_dict.air_c_mix_dict;


//传入内机 总匹数，计算出所需外机的具体数据（冷量，数量） 当 外机大于40kw 时 增加数量
function getAir_master(data_kw) {
  // var temp_data_kw = data_kw.substring(0,data_kw.length-2);

  var temp_array = [];
  if (data_kw > 52) {
    //todo 当外机大于52kw时的计算方式
    var b = data_kw / 2;
    for (var i = 0; i < air_master_dict.length; i++) {
      var a = air_master_dict[i].quantity_cold;
      a = a.substring(0, a.length - 2) * 1.3;
      if (b <= a) {
        temp_array.push(air_master_dict[i]);
        temp_array.push(air_master_dict[i]);
        return temp_array;
      }
    }

  } else {
    for (var i = 0; i < air_master_dict.length; i++) {
      var a = air_master_dict[i].quantity_cold;
      a = a.substring(0, a.length - 2) * 1.3;
      if (data_kw <= a) {
        temp_array.push(air_master_dict[i]);
        return temp_array;
      }
    }
  }


}

//将传入的面积配置单 添加价格信息
function getAir_c_area(dataList) {

  for (var i = 0; i < dataList.length; i++) {
    var a = dataList[i].room_type_id;
    var b = dataList[i].machin_type_id;
    var c = dataList[i].horses_number_id;
    var d = getAreaItem(a, b, c);
    if (d) {
      dataList[i].quantity_cold = d.quantity_cold;
      dataList[i].default_num = d.default_num;
      dataList[i].price = d.price;
    }
  }

  return dataList;
}



function getAreaItem(room_type_id, machin_type_id, horses_number_id) {
  for (var i = 0; i < air_c_area_dict.length; i++) {
    var a = air_c_area_dict[i].room_type_id;
    var b = air_c_area_dict[i].machin_type_id;
    var c = air_c_area_dict[i].horses_number_id;
    if (room_type_id == a && machin_type_id == b && horses_number_id == c) {
      return air_c_area_dict[i];
    }
  }
}

//将传入的匹数配置单 添加价格信息
function getAir_c_number(dataList) {
  for (var i = 0; i < dataList.length; i++) {
    var a = dataList[i].room_type_id;
    var b = dataList[i].machin_type_id;
    var c = dataList[i].horses_number_id;
    var d = getNumberItem(a, b, c);
    if (d) {
      dataList[i].quantity_cold = d.quantity_cold;
      dataList[i].default_num = d.default_num;
      dataList[i].price = d.price;
    }
  }

  return dataList;
}

function getNumberItem(room_type_id, machin_type_id, horses_number_id) {
  for (var i = 0; i < air_c_number_dict.length; i++) {
    var a = air_c_number_dict[i].room_type_id;
    var b = air_c_number_dict[i].machin_type_id;
    var c = air_c_number_dict[i].horses_number_id;
    if (room_type_id == a && machin_type_id == b && horses_number_id == c) {
      return air_c_number_dict[i];
    }
  }
}

//一拖一，选择前2项后获得匹数数据
function getHorseList(room_type_id, machin_type_id){
  var temp_array = [];
  for (var i = 0; i < air_c_mix_dict.length; i++) {
    var a = air_c_mix_dict[i].room_type_id;
    var b = air_c_mix_dict[i].machin_type_id;
    if (room_type_id == a && machin_type_id == b) {
      temp_array.push(air_c_mix_dict[i].horses_number);
    }
  }
  return temp_array;
}

//一拖一
function getAir_c_mix(dataList) {
  for (var i = 0; i < dataList.length; i++) {
    var a = dataList[i].room_type_id;
    var b = dataList[i].machin_type_id;
    var c = dataList[i].horses_number_id;
    var d = getMixItem(a, b, c);
    if (d) {
      dataList[i].quantity_cold = d.quantity_cold;
      dataList[i].default_num = 1;
      dataList[i].price = d.price;
    }
  }

  return dataList;
}
function getMixItem(room_type_id, machin_type_id, horses_number_id) {
  for (var i = 0; i < air_c_mix_dict.length; i++) {
    var a = air_c_mix_dict[i].room_type_id;
    var b = air_c_mix_dict[i].machin_type_id;
    var c = air_c_mix_dict[i].horses_number_id;
    if (room_type_id == a && machin_type_id == b && horses_number_id == c) {
      return air_c_mix_dict[i];
    }
  }
}

const hello = function (string) {
  console.log(string)
}
module.exports = {
  getAir_c_number: getAir_c_number,
  getAir_c_area: getAir_c_area,
  sayHello: hello,
  getAir_master: getAir_master,
  getHorseList: getHorseList,
  getAir_c_mix: getAir_c_mix
}

