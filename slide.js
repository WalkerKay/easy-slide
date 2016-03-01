/**
 * Created by wangkai on 2015/11/17.
 * 基于jQuery轮播图片，轮播区域 插件
 * wangkai
 *
 *
 */
/*调用示例
 $(function () {
    var slide = easySlide();
    slide.init({
        content: "slide",
        preId: "preBtn",
        nextId: "nextBtn",
        lumpWidth: "910px",
        execFun: function (i) {
        }
    });
});
*/


(function (win, $) {
    var easySlide = function () {
        var easySlide = function () {
        };
        easySlide.prototype = {
            /*获取参数*/
            getOptions: function (arg) {
                /*参数格式*/
                var i, options = {}, defaults = {
                    content: null, //可以是一个id 也可以是一个 dom对象
                    preId: null,//可以是一个id 也可以是一个 dom对象
                    nextId: null,//可以是一个id 也可以是一个 dom对象
                    lumpWidth: null, //每一块的宽度（等于每次移动的宽度）
                    contWidth: this.lumpWidth,
                    autoSlide: null,//自动滑动时间，不传不设置自动滑动
                    time: null,//动画时间 单位毫秒
                    execFun: null  //设置执行完后的回调函数
                };

                for (i in defaults) {
                    options[i] = arg[i] ? arg[i] : null
                }
                return options;
            },
            /* 创建项目容器箱*/
            createBoxDiv: function (num, width) {
                var box = $("<div></div>");
                //计算容器的宽度，+100 是为了防止border
                box.css("width", ((num * parseInt(width)) + 100) + "px");
                return box;
            }
        };

        var extend = {
            go: null,
            init: function () {
                var index = 0;
                var slide = new easySlide(), options = slide.getOptions(arguments[0]);
                this.options = options;
                //获取容器
                var cont = null;
                if (typeof  options.content == "string")
                    cont = $("#" + options.content);
                else
                    cont = $(options.content);

                var items = cont.children();
                var box = slide.createBoxDiv(items.length, options.lumpWidth ? options.lumpWidth : items.length > 0 ? items.eq(0).width() : '0');
                //设置内容容器的默认样式
                cont.css("overflow", "hidden");
                if (slide.contWidth) {
                    cont.css("width", slide.contWidth);
                }
                //设置内容项默认属性
                items.css("float", "left");
                items.appendTo(box);
                cont.append(box);


                var preBtn = typeof options.preId == "string" ? $("#" + options.preId) : $(options.preId);
                var nextBtn = typeof options.preId == "string" ? $("#" + options.nextId) : $(options.nextId);

                preBtn.bind("click", function () {
                    index--;
                    scorll();
                });
                nextBtn.bind("click", function () {
                    index++;
                    scorll();
                });

                //设置自动滑动
                if (options.autoSlide) {
                    var timer = null;
                    timer = setInterval(function () {
                        index++;
                        scorll();
                    }, options.autoSlide);

                    //鼠标移动到dom 自动暂停
                    items.bind("mouseover", function () {
                        clearInterval(timer);
                    });
                    items.bind("mouseout", function () {
                        timer = setInterval(function () {
                            index++;
                            scorll();
                        }, options.autoSlide);
                    });
                }

                //滑动
                function scorll(i) {
                    if (i != undefined) {
                        index = i;
                    }

                    if (index == items.length) {
                        index = 0;
                    }
                    if (index < 0) {
                        index = items.length - 1;
                    }
                    var leftScroll = index * parseInt(options.lumpWidth);

                    cont.animate({
                        scrollLeft: leftScroll + "px"
                    }, options.time);

                    if (options.execFun) {
                        options.execFun(index);
                    }
                }

                this.go = scorll;
            }
        };

        return extend;
    }
    window.easySlide = easySlide;

})(window, $);
