// pages/goods_list/index.js
// 引入封装好的ask
import { request } from "../../request/ask.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标题数据
    title: [
      {
        id: 0,
        name: '综合',
        isActive: true
      },
      {
        id: 1,
        name: '销量',
        isActive: false
      },
      {
        id: 2,
        name: '价格',
        isActive: false
      },
    ],
    // 页面渲染数据源
    goods_Data: {}
  },
  // 存储请求所需要的参数数据
  goods_list: {
    // 搜索关键字
    query: '',
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10,
    // 分类id
    cid: ''
  },
  // 总页数
  totalPages: '',

  // 获取数据源
  getGoodsList() {
    request({ url: '/goods/search', data: this.goods_list })
      .then(result => {
        // 计算总页数
        this.totalPages = Math.ceil(result.total / this.goods_list.pagesize)
        this.setData({
          // 把data里面的旧数据和新数据拼接
          goods_Data: [...this.data.goods_Data, ...result.goods]
        })
        // 关闭页面下拉刷新效果
        wx.stopPullDownRefresh()
      })
  },
  handItemChange(e) {
    // 获取传递过来的索引
    let { index } = e.detail
    // 获取title数组
    let { title } = this.data
    //  循环修改title数组
    title.forEach((e, i) => { i === index ? e.isActive = true : e.isActive = false })
    this.setData({ title })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goods_list.cid = options.cid
    // 请求数据
    this.getGoodsList()
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
    // 重置页码
    this.goods_list.pagenum = 1
    // 重置数据源
    this.setData({
      goods_Data: []
    })
    this.getGoodsList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否有下一页数据
    if (this.goods_list.pagenum >= this.totalPages) {
      wx.showToast({ title: '没有下页数据了', mask: true, icon: 'none' })
    } else {
      this.goods_list.pagenum++;
      // 然后重新发请求
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})