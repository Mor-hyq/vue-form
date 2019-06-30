module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function (req, res) {
                    res.json({
                        list: [{
                                id: 1,
                                text: '百万年薪架构师',
                                price: 1000
                            },
                            {
                                id: 2,
                                text: 'web全栈架构师',
                                price: 2000
                            },
                            {
                                id: 3,
                                text: 'python爬虫',
                                price: 3000
                            },
                            {
                                id: 4,
                                text: 'java架构师',
                                price: 4000
                            },

                        ]
                    })
                })
            }
        }
    }
}

// module.exports = {
//     configureWebpack: {
//         devServer: {
//             before(app) {
//                app.get('/api/goods', function(req,res){
//                     res.json({
//                         code:0,
//                         list: [
//                             { id: 1, text: "Web全栈架构师", price: 1000 },
//                             { id: 2, text: "Python架构师", price: 1000 }
//                         ]
//                     })
//                }) 
//             }
//         }
//     }
// }