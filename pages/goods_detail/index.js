// pages/goods_detail/index.js

import { request } from '../../request/ask.js'
import { setStorageCart, getStorageCart } from '../../utils/storage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据源
    goodsData: {}
  },
  // 商品信息对象
  goods_list: {},
  goods_id: '',
  // 加入购物车
  handleAddCart() {
    // 从本地存储获取商品信息
    let cart = getStorageCart() || {};
    // 判断本地存储是否有商品id
    if (cart[this.goods_list.goods_id]) {
      // 如果已经存在，那么让其商品数量+1
      cart[this.goods_list.goods_id].num++

    } else {
      // 如果不存在，那么把商品信息设置到本地存储里面 
      cart[this.goods_list.goods_id] = this.goods_list
      cart[this.goods_list.goods_id].num = 1;
    }
    //  把数据存入到本地存储
    setStorageCart(cart)
    // 弹出成功的提示
    wx.showToast({ title: '加入成功', mask: true, icon: 'sussess' })

  },
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
            goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
            pics: result.pics
          }
        })
        this.goods_list = result
        console.log(this.goods_list.goods_id)
        wx.stopPullDownRefresh()
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