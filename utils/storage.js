// 获取本地存储中购物车的数据
export const getStorageCart = () => {
    return wx.getStorageSync('cart') || {}
}

// 设置购物车到本地存储、
export const setStorageCart = (obj) => {
    wx.setStorageSync('cart', obj);
}


// 获取本地存储中的分类页面商品数据
export const getStorageCate = () => {
    return wx.getStorageSync('categoryData')
}
// 设置分类页面商品数据到本地存储
export const setStorageCate = (obj) => {
    wx.setStorageSync('categoryData', obj)
}
// 设置购物车收货地址到本地存储
export const setStorageAddress = (obj) => {
    wx.setStorageSync('categoryAddress', obj)
}
// 从本地存储获取购物车收货地址
export const getStorageAddress = () => {
    return wx.getStorageSync('categoryAddress')
}