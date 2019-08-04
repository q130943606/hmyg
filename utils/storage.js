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