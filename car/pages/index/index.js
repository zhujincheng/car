//index.js
//获取应用实例
const url = 'http://192.168.2.226:8800/getcarinf/'
let mark=null
let mark1 = null
Page({
  data: {
    flang:true,
    value:[0,0,0] , 

  },
  //选择触发hidden show
  bindpiker:function(){
    if(this.data.flang){
        this.data.flang=false
    }else{
      this.data.flang=true
    }
    
    this.setData({
      flang:this.data.flang  
    })
  },
  //滑动改变时触发
  bindChange:function(e){
    const val = e.detail.value
    if (mark != e.detail.value[0]) {
      mark=val[0]
      val[1]=0
      val[2]=0
      this.setData({
        value:[val[0],0,0]
      })
    }
    console.log(val)
    if (mark1 != e.detail.value[1]) {
      mark1 = val[1]//1

      val[2] = 0
      this.setData({
        value: [val[0], val[1], 0]
      })
    }
    //当前拿到所有数据对象{I: 276, N: "ALPINA", L: "A", List: Array(1)}
    var data=this.data.result[val[0]]
    //拿到车系
    var chexi=data.List
    // 拿到车型号
    var typecar=chexi[val[1]].List//系类中对应的所有车辆
    var chexione= chexi[val[1]]
     var carname = typecar[val[2]]//这里得到的是undefined如果数组长度不够时
    this.setData({
      typecar:typecar,
      chexi:chexi,
      carname: carname.N,
    })
    console.log('value', data.N, chexione.N, carname.N) 
  },

  onLoad: function () {
    //console.log(this.data)
    wx.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('res',res)
        //console.log('数据是', res.data)
        //console.log('数据是', res.data.reason)
        that.setData({
          status: res.data.reason,
          result:res.data.result,
        })
      }
    })
    var that=this
 
  }
})

