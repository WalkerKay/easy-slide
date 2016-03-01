/**
 * Created by wangkai on 2015/11/17.
 * ����jQuery�ֲ�ͼƬ���ֲ����� ���
 * wangkai
 *
 *
 */
/*����ʾ��
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
            /*��ȡ����*/
            getOptions: function (arg) {
                /*������ʽ*/
                var i, options = {}, defaults = {
                    content: null, //������һ��id Ҳ������һ�� dom����
                    preId: null,//������һ��id Ҳ������һ�� dom����
                    nextId: null,//������һ��id Ҳ������һ�� dom����
                    lumpWidth: null, //ÿһ��Ŀ�ȣ�����ÿ���ƶ��Ŀ�ȣ�
                    contWidth: this.lumpWidth,
                    autoSlide: null,//�Զ�����ʱ�䣬�����������Զ�����
                    time: null,//����ʱ�� ��λ����
                    execFun: null  //����ִ�����Ļص�����
                };

                for (i in defaults) {
                    options[i] = arg[i] ? arg[i] : null
                }
                return options;
            },
            /* ������Ŀ������*/
            createBoxDiv: function (num, width) {
                var box = $("<div></div>");
                //���������Ŀ�ȣ�+100 ��Ϊ�˷�ֹborder
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
                //��ȡ����
                var cont = null;
                if (typeof  options.content == "string")
                    cont = $("#" + options.content);
                else
                    cont = $(options.content);

                var items = cont.children();
                var box = slide.createBoxDiv(items.length, options.lumpWidth ? options.lumpWidth : items.length > 0 ? items.eq(0).width() : '0');
                //��������������Ĭ����ʽ
                cont.css("overflow", "hidden");
                if (slide.contWidth) {
                    cont.css("width", slide.contWidth);
                }
                //����������Ĭ������
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

                //�����Զ�����
                if (options.autoSlide) {
                    var timer = null;
                    timer = setInterval(function () {
                        index++;
                        scorll();
                    }, options.autoSlide);

                    //����ƶ���dom �Զ���ͣ
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

                //����
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
