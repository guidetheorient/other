import $ from './lib/jquery-3.2.1.min'

// define(['jquery'],function($){
  // Carousels = (function(){
    function Carousel($ct){
      this.$ct = $ct
      this.init()
      this.createRect(5)
      this.bind()
      this.autoPlay()
    }

    Carousel.prototype.init = function () {
      this.$preArrow = this.$ct.find('.pre-arrow')
      this.$nextArrow = this.$ct.find('.next-arrow')
      var $imgCt = this.$imgCt = this.$ct.find('.img-ct')
      this.$rectIcon = this.$ct.find('.rect-icon')


      //容器宽度为可视区域宽度
      this.$ct.width($(window).width())
      
      //使图片宽高为浏览器可视区域的宽高，适应屏幕
      var windowWidth = $(window).width()
      $imgCt.find('img').each(function (index,ele) {
        $(ele).width(windowWidth)
      })

      //使图片水平排列
      var imgWidth = this.imgWidth = windowWidth
      var imgQuanity = this.imgQuanity = $imgCt.find('img').length
      $imgCt.find('img').height($(window).height())
      $imgCt.width((imgQuanity+2)*imgWidth)

      //复制首尾元素
      var $imgCtChildren = $imgCt.children()
      $imgCt.append($imgCtChildren.first().clone())
      $imgCt.prepend($imgCtChildren.last().clone())

      this.index = 0;  

      //初始化imgCt的left值
      $imgCt.css({'left': -imgWidth+'px'})
    }

    Carousel.prototype.bind = function () {
      var _this = this
      this.$preArrow.on('click',function(){
        _this.showBefore()
      })
      
      this.$nextArrow.on('click',function(){
        _this.showAfter()
      })
      this.$rectIcon.on('click','.rect',function(){
        var interval = $(this).index() - _this.index
        if(interval < 0){
          _this.showBefore(-interval)
        }else if($(this).index() > _this.index){
          _this.showAfter(interval)
        }
      })
    }

    Carousel.prototype.showBefore = function (interval) {
      var _this = this
      if(interval == undefined){interval=1}
      this.$imgCt.finish().animate({
        left : '+='+_this.imgWidth*interval,    //引号
      },function(){ //回调函数必须写在animate中，如果在外面的话，动画没有执行完就会执行
        _this.index-=interval
        if(_this.index < 0){
          _this.$imgCt.css({'left':-_this.imgWidth*_this.imgQuanity+'px'})
          _this.index = _this.imgQuanity-1
        }
        _this.setRect()
      })
    }

    Carousel.prototype.showAfter = function(interval) {
      var _this = this
      if(interval == undefined){interval=1}
      this.$imgCt.finish().animate({
        left : '-='+this.imgWidth*interval,
      },function(){
        _this.index+=interval
        if(_this.index === _this.imgQuanity){
          _this.$imgCt.css({'left':-_this.imgWidth+'px'})
          _this.index = 0
        }
        _this.setRect()
      })
    }

    Carousel.prototype.setRect = function () {
      this.$rectIcon.children().removeClass('active').eq(this.index).addClass('active')
    }

    Carousel.prototype.createRect = function (rectIndex) {
      var html = ''
      for(var i = 0; i<rectIndex-1;i++){
        html+='<li class="rect"></li>'
      }
      this.$rectIcon.append(html)
    }

    Carousel.prototype.autoPlay = function () {
      var _this = this
      this.clock = setInterval(function(){_this.showAfter()},4000)
      
      //多个选择器绑定可以$()用逗号隔开
      //多个对象绑定同一事件可以用add()
      this.$preArrow.add(_this.$nextArrow).add(_this.$rectIcon).on('click',function(){
        clearInterval(_this.clock)
        _this.clock = setInterval(function(){_this.showAfter()},4000)
      })
    }
    //在用户点击的情况下，重新计时,未调用
    //这个怎么传出去？
    Carousel.prototype.stopPlay = function () {
      clearInterval(this.clock)
    }
    // var carousel0 = new Carousel($('.carousel').eq(0))
    // var carousel1 = new Carousel($('.carousel').eq(1))
    // return {
    //   init: function ($ct) {
    //     $ct.each(function (index,element) {
    //       //element是DOM元素
    //       new Carousel($(element))
    //     })
    //   }
    // }
  // })()

    // Carousels.init($('.carousel'))
// })
export default {
  init: function ($ct) {
    $ct.each(function (index,element) {
      //element是DOM元素
      new Carousel($(element))
    })
  }
}