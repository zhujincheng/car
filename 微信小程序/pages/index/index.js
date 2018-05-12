//index.js
//获取应用实例
const app = getApp()
var name=[]
var chexi=[]

for(var i=0;i<10;i++){
  name.push(i)
}
var appid ='c2bdc29f7a314973b29e60d855358b34'
var url = 'http://apis.haoservice.com/lifeservice/car/GetSeries?key='+appid
console.log('url',url)

Page({
  
  data: {
    flang:true,
    name:name,
    value:[0,0,0] ,   

  },
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
  bindChange:function(e){
    const val = e.detail.value
    console.log(val)
    //当前拿到所有数据对象{I: 276, N: "ALPINA", L: "A", List: Array(1)}
    var data=this.data.result[val[0]]
    //拿到车系
    var chexi=data.List
    // 拿到车型号
   try{
    var typecar=chexi[val[1]].List//系类中对应的所有车辆
    var chexione= chexi[val[1]]
    console.log('chexitrue')
   }catch(e){
     var typecar = chexi[0].List//如果报错那么就改了品牌默认系列中第一个系列所有车辆
     var chexione = chexi[0]
     console.log('chexifalse')
   }
   try{
     var carname = typecar[val[2]]//这里得到的是undefined
     if(carname.N){
     }
   }catch (e) {
     var carname = typecar[0]
   }
    this.setData({
      typecar:typecar,
      chexi:chexi,
      carname: carname.N,
    
    })
    try {
      console.log('value', data.N,chexione.N,carname.N) 
      //console.log('value', data.I, chexidata.I, typecardata.I) 
     
    } catch (e) {
      // Do something when catch error
    }
    
  },
  
  onLoad: function () {
    console.log(this.data)
    wx.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('数据是', res.data)
        console.log('数据是', res.data.reason)
        
        that.setData({
          status: res.data.reason,
          result:res.data.result,
          value:that.data.value
        })
      }
    })
    var that = this
  }
})
