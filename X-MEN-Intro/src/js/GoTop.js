import $ from './lib/jquery-3.2.1.min'

// define(['jquery'],function ($) {
  function GoTop(){
      this.ct = $('html,body')
      this.createNode()
      this.target = $('.go-top')
      this.bindEvent()
    }

  GoTop.prototype = {
    createNode: function(){
      var goTopHtml = '<div class="go-top"><i class="fa fa-angle-up"></i></div>'
      this.ct.append(goTopHtml)
    }, 
    bindEvent: function(){
      var ct = this.ct
      //注意this
      this.target.click(function(){
        ct.animate({scrollTop: 0});
      })
    }
  }
  // return GoTop
// })

//函数直接输出就好了，如果加了{GoTop}，调用时就是obj.GoTop了
export default GoTop