// 发送的请求数
let ajxsTime = 0
export const request = (params) => {
    // 当有请求发送出去时，请求数+1
    ajxsTime++
    // 基准路径
    const baseUrl = 'https://api.zbztb.cn/api/public/v1'
    return new Promise((resolve, reject) => {
        // 设置加载中的效果
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajxsTime--
                // 最后一个请求回来了，然后关闭
                if (ajxsTime === 0) {
                    // 关闭加载中图标
                    wx.hideLoading()
                }
            }
        });
    })
}