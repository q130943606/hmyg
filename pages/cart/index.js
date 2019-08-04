// pages/cart/index.js
import { setStorageAddress, getStorageAddress, getStorageCart } from "../../utils/storage.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    addressData: {},
    // 购物车数据
    cartData: {}
  },
  handleAddress() {
    // 调用获取用户对小程序的授权接口，判断返回值scope对应的权限信息
    // scope: undefined  用户从来没点击收货地址按钮，直接获取用户的收货地址
    // scopr: true       用户曾经给过应用权限，直接获取地址
    // scope: false      用户曾经点过取消授权，先打开授权页面，让用户重新授权，再去获取地址信息
    wx.getSetting({
      success: (result) => {
        // 获取用户是否授权了地址
        const scoprAddress = result.authSetting["scope.address"]
        // 判断用户授权状态
        if (scoprAddress === true || scoprAddress === undefined) {
          // 获取用户收货地址
          wx.chooseAddress({
            success: (res1) => {
              // 拼接下详细地址信息
              const addressAll = res1.provinceName + res1.cityName + res1.countyName + res1.detailInfo
              res1["addressAll"] = addressAll
              // 收货地址信息存储到本地存储
              setStorageAddress(res1)
            },
          });

        } else {
          // 打开授权页面
          wx.openSetting({
            success: (res2) => {
              // 获取收货地址
              wx.chooseAddress({
                success: (res3) => {
                  // 拼接下详细地址信息
                  const addressAll = res3.provinceName + res3.cityName + res3.countyName + res3.detailInfo
                  res3["addressAll"] = addressAll
                  // 收货地址信息存储到本地存储
                  setStorageAddress(res3)
                },
              });
            },
          });
        }
      },
    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //  获取地址信息和商品信息
    this.setData({
      addressData: getStorageAddress() || {},
      cartData: getStorageCart() || {}
    })
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