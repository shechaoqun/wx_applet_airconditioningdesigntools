var air_c_area_dict = require('../entity/air_c_area_dict.js');
air_c_area_dict = air_c_area_dict.air_c_area_dict;


// step 1: 返回 房型  数组，有几种房型  
function getRoomType() {
  var result_array = [];
  var temp_array = [];
  for (var i = 0; i < air_c_area_dict.length; i++) {
    temp_array.push(air_c_area_dict[i].room_type);
  }
  var json = {};
  for (var i = 0; i < temp_array.length; i++) {
    if (!json[temp_array[i]]) {
      result_array.push(temp_array[i]);
      json[temp_array[i]] = 1;
    }
  }
  return result_array;
}

// step 2: 依据传入的房型，判断返回 类型 数组，有几种类型  （风管机？单面嵌？360？）
function getMachinType(roomType){
  var result_array = [];
  var temp_array = [];

  for (var i = 0; i < air_c_area_dict.length; i++) {
    var temp_roomType = air_c_area_dict[i].room_type;
    if (roomType == temp_roomType) {
      temp_array.push(air_c_area_dict[i].machin_type);
    }
  }
  var json = {};
  for (var i = 0; i < temp_array.length; i++) {
    if (!json[temp_array[i]]) {
      result_array.push(temp_array[i]);
      json[temp_array[i]] = 1;
    }
  }
  return result_array;
}

  

// step 3: 依据传入的房型，类型，判断返回的 匹数，数组。  horses_number
function getHorsesNumber(roomType,machinType) {
  var result_array = [];
  var temp_array = [];

  for (var i = 0; i < air_c_area_dict.length; i++) {
    var temp_roomType = air_c_area_dict[i].room_type;
    var temp_machinType = air_c_area_dict[i].machin_type;
    if (roomType == temp_roomType && machinType == temp_machinType) {
      temp_array.push(air_c_area_dict[i].horses_number);
    }
  }
  var json = {};
  for (var i = 0; i < temp_array.length; i++) {
    if (!json[temp_array[i]]) {
      result_array.push(temp_array[i]);
      json[temp_array[i]] = 1;
    }
  }
  return result_array;
}

//依据页面选择的项目数据，给数据添加完整的价格信息
function getDataList(dataList) {
  var temp_dataList  = [];
  for (var i = 0; i < dataList.length; i++){
    var temp = getData(dataList[i]);
    if(temp) {
      temp_dataList.push(temp);
    } else {
      //donothing
    }
  }
  //给id重新赋值排序
  for (var i = 0; i < temp_dataList.length; i++) {
    temp_dataList[i].id = i + 1;
  }

  return temp_dataList;
}

//内部方法，不向外提供
function getData(data){
  if (data.room_type == "" || data.room_type == null) {
    return;
  }
  if (data.machin_type == "" || data.machin_type == null) {
    return;
  }
  if (data.horses_number == "" || data.horses_number == null) {
    return;
  }
  for (var i = 0; i < air_c_area_dict.length; i++) {
    var room_type = air_c_area_dict[i].room_type;
    var machin_type = air_c_area_dict[i].machin_type;
    var horses_number = air_c_area_dict[i].horses_number;
    if (data.room_type == room_type && data.machin_type == machin_type && data.horses_number == horses_number) {
      data.quantity_cold = air_c_area_dict[i].quantity_cold;
      data.default_num = air_c_area_dict[i].default_num;
      data.price = air_c_area_dict[i].price;
      return data;
    }
  }
  
}


  module.exports = {
    getRoomType: getRoomType,
    getMachinType: getMachinType,
    getHorsesNumber: getHorsesNumber,
    getDataList: getDataList
  }