import $ from './lib/jquery-3.2.1.min'

// define(['jquery'], function($) {
  function Waterfall($container) {
    this.$ct = $container
    this.init()
    this.bind()
    // this.renderNews()
  }

  Waterfall.prototype.init = function() {
    this.index = 0

    this.nodeWidth = this.$ct.find('.item').outerWidth(true)
    this.column = parseInt(this.$ct.find('.newsPic-container').width() / this.nodeWidth)
    this.heightArr = []
    for (var i = 0; i < this.column; i++) {
      this.heightArr[i] = 0
    }

    this.isDone = true
  }

  Waterfall.prototype.bind = function() {
    var _this = this
    this.$loadMoreButton = this.$ct.find('#load-more-button')
    
    this.$loadMoreButton.on('click', function(event) {
      event.preventDefault()
      _this.$loadMoreButton.addClass('click')
      if (!_this.isDone) {
        return
      }
      if(_this.index >= _this.filmList.length){
        $(event.target).text('Finised').addClass('active')
      }
      _this.renderNews()
    })

    $.get('//oybg5lxuc.bkt.clouddn.com/1.json').then(function(response){
      _this.filmList = response
      _this.renderNews()
    })
  }

  Waterfall.prototype.renderNews = function(){
    var _this = this
    var films = this.filmList.slice(this.index,this.index+4);
    this.index += 4;

    $.each(films, function(index,ele){
      var $node = _this.generateNewsDOM(ele)
      console.log(ele)
      $node.find('img').on('load',function(e){
        var spanHeight = e.target.height/(e.target.width/_this.$ct.find('.item').width())
        var $span = $(e.target).parent().find('span')
        $span.css({'line-height':spanHeight+'px'})
        _this.$ct.find('.newsPic-container').append($node)
        _this.setNewsDOMPosition($node)
      })
    })
    this.$loadMoreButton.removeClass('click')
  }
  //1.Ajax获取影片信息
  Waterfall.prototype.getNewsViaAjax = function(callback) {
    var _this = this

    $.get('//oybg5lxuc.bkt.clouddn.com/1.json', {
      index: _this.index,
      length: 4
    }, function(workImgAndInfo) {
      callback(workImgAndInfo)
    }).fail(function() {
      console.log('error')
    }).done(function() {
      _this.isDone = true
      _this.$loadMoreButton.removeClass('click')//.text('加载更多')
      _this.index += 4
    })
    this.isDone = false
  }

  //2.生成DOM节点
  Waterfall.prototype.generateNewsDOM = function(ele) {
    var html = ''
    html = '<li class="item">' +
      '<a href="">'+
        '<img src="' + ele.imgUrl + '" alt="">' +
        '<span><i class="fa fa-plus fa-3x"></i></span>'+
      '</a>'+
      '<h4 class="work-name">' + ele.id + '</h4>' +
      '<p class="work-description">' + ele.year + '</p>' +
      '</li>';
    return $(html)
  }

  // //3.DOM节点添加到页面
    // Waterfall.prototype.renderNews = function() {
    //   var _this = this
    //   this.getNewsViaAjax(function(workImgAndInfo) {
    //     $.each(workImgAndInfo, function(index, ele) {
    //       var $node = _this.generateNewsDOM(ele)
    //       $node.find('img').on('load', function(e) {
    //         var spanHeight = e.target.height/(e.target.width/_this.$ct.find('.item').width())
    //         var $span = $(e.target).parent().find('span')
    //         //css88里面px可不加，结果<span>里面的<i>不能正确显示
    //         $span.css({'line-height':spanHeight+'px'})
    //         _this.$ct.find('.newsPic-container').append($node)
    //         _this.setNewsDOMPosition($node)
    //       })
    //     })
    //   })
    // }

  //4.设定DOM节点位置
  Waterfall.prototype.setNewsDOMPosition = function($newsNode) {
    var _this = this
    var minHeight = Math.min.apply(null, _this.heightArr)
    var index = this.heightArr.indexOf(minHeight)

    $newsNode.css({
      left: this.nodeWidth * index,
      top: this.heightArr[index],
    })

    this.heightArr[index] += $newsNode.outerHeight(true)
    this.$ct.find('.newsPic-container').height(Math.max.apply(null, _this.heightArr))
  }


  // return {
  //   init: function($ct) {
  //     $ct.each(function(index, element) {
  //       //element是DOM元素
  //       new Waterfall($(element))
  //     })
  //   }
  // }
  //new Waterfall($('.waterfall-wrap').eq(0))
// })

export default {
  init: function($ct) {
    $ct.each(function(index, element) {
      //element是DOM元素
      new Waterfall($(element))
    })
  }
}