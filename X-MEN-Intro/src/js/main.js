import '../css/index.css'
import '../css/carousel.css'
import '../css/goTop.css'
import '../css/waterfall.css'
import '../css/font-awesome-4.7.0/css/font-awesome.min.css'

import '../../index.html'

import $ from './lib/jquery-3.2.1.min'
import Carousel from './Carousel'
import GoTop from './GoTop'
import Waterfall from './Waterfall'
import ScrollChangeColor from './ScrollChangeColor'

Carousel.init($('.carousel'))
new GoTop()
Waterfall.init($('.waterfall-wrap'))
new ScrollChangeColor()