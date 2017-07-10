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

Page({
    data: {
        area_array: area_array,
        room_type: ['书|卧', '客|餐厅'],
        machin_type: ['风管机', '单面嵌'],
        horses_number: ['小 1匹', '正1匹', '1.5匹', '小2匹', '正2匹', '3匹'],
        itemid:""
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
        console.log('picker发送选择改变，携带值为', e)
        var temp = this.data.room_type[e.detail.value]
        console.log(temp)
        area_array[this.data.itemid-1].room_type = temp;
        area_array[this.data.itemid-1].room_type_id= e.detail.value;
        this.btn_refresh_view();
    },
    bindPickerChange_1_2: function (e) {
        var temp = this.data.machin_type[e.detail.value]
        area_array[this.data.itemid-1].machin_type = temp;
        area_array[this.data.itemid-1].machin_type_id = e.detail.value;
        this.btn_refresh_view();
    },
    bindPickerChange_1_3: function (e) {
        var temp = this.data.horses_number[e.detail.value]
        area_array[this.data.itemid-1].horses_number = temp;
        area_array[this.data.itemid-1].horses_number_id = e.detail.value;
        this.btn_refresh_view();
    },

    btn_refresh_view: function (e) {
        this.setData({
            area_array: area_array
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
            url: '../configuration_center/center?number_array='+JSON.stringify(area_array)
        })
    },

    onLoad: function () {
    }

})

