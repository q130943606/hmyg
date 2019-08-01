// pages/category/index.js
// 引入封装的函数
import { request } from "../../request/ask.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据源
    categoryList: [],
    // 选中的菜单
    current: 0,
    // 滚动条距离顶部位置
    scrollTap: 0
  },
  // 左侧菜单点击事件
  handleclk(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      current: index,
      scrollTap: 0
    })

  },
  // 左侧菜单，切换选中
  getLeftList() {
    request({ url: "/categories" })
      .then(result => {
        this.setData({
          categoryList: result
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLeftList();
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