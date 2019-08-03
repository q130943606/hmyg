// pages/goods_detail/index.js

import { request } from '../../request/ask.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据源
    goodsData: {}
  },
  goods_id: '',
  // 点击轮播图的图片，放大预览
  handlemMagnify(e) {
    // 构建预览图数组
    const urls = this.data.goodsData.pics.map((v => {
      return v.pics_big
    }))
    // 拿到点击图片的索引
    const { index } = e.currentTarget.dataset
    // 根据索引查看图片的放大图
    const current = urls[index]
    wx.previewImage({
      urls: urls,
      current: current
    })
  },
  // 获取数据源
  getDetail() {
    request({ url: '/goods/detail', data: { goods_id: this.goods_id } })
      .then((result) => {
        this.setData({
          goodsData: {
            goods_name: result.goods_name,
            goods_price: result.goods_price,
            goods_introduce: result.goods_introduce,
            pics: result.pics
          }
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.goods_id = goods_id
    this.getDetail()
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
    this.getDetail()
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