/**
 * Created by Administrator on 2016/6/28.
 */
$(function () {

    //href="http://pre.im/BossApp1"
    $(".download").attr("href","BossApp.apk?v="+new Date().getTime());

    var topMargin=0;
    window.onscroll= function (e) {
        //console.log(e.target.body.scrollTop);
        if(e.target.body.scrollTop>=1400 && e.target.body.scrollTop<=1900){
            //alert("1400")
            if(!$('#progressBar').hasClass('active')){
                $('#progressBar').animate({
                    width:160
                },800, function () {
                    $('#progressBar').addClass('active')
                });
            }
        }
        if(e.target.body.scrollTop<=800){
            if($('#progressBar').hasClass('active')){
                $('#progressBar').removeClass('active');
                $('#progressBar').css({
                    width:2+'px'
                })
            }
        }
        if(e.target.body.scrollTop>2700){
            if($('#progressBar').hasClass('active')){
                $('#progressBar').removeClass('active');
                $('#progressBar').css({
                    width:2+'px'
                })
            }
        }
        //控制几个圆圈的动画
        if(e.target.body.scrollTop>=3300 && e.target.body.scrollTop<=3800){
            if(!$('#circles').hasClass('active')){
                $('#circles').css('display','block');
                $('#circle1').addClass('circleTransition');
                setTimeout(function () {
                    $('#circle2').addClass('circleTransition');
                },300);
                setTimeout(function () {
                    $('#circle3').delay(900).addClass('circleTransition');
                },600);
                $('#circles').addClass('active')
            }
        }
        if(e.target.body.scrollTop<=2400){
            if($('#circles').hasClass('active')){
                $('#circles').removeClass('active');
                $('#circles').css('display','none');
                $('#circle1').css('opacity','0');
                $('#circle2').css('display','0');
                $('#circle3').css('display','0');
                $('#circle1').removeClass('circleTransition');
                $('#circle2').removeClass('circleTransition');
                $('#circle3').removeClass('circleTransition');
            }
        }
        if(e.target.body.scrollTop>=4300){
            if($('#circles').hasClass('active')){
                $('#circles').removeClass('active');
                $('#circles').css('display','none');
                $('#circle1').css('opacity','0');
                $('#circle2').css('display','0');
                $('#circle3').css('display','0');
                $('#circle1').removeClass('circleTransition');
                $('#circle2').removeClass('circleTransition');
                $('#circle3').removeClass('circleTransition');
            }
        }
        //控制聊天消息的动画
        if(e.target.body.scrollTop>=4900 && e.target.body.scrollTop<=5400){
            if(!$('#newsImg').hasClass('active')){
                $('#newsImg').animate({
                    opacity:1,
                    top:'411px'
                },500);
                $('#newsImg').addClass('active')
            }
        }
        if(e.target.body.scrollTop<=3900){
            if($('#newsImg').hasClass('active')){
                $('#newsImg').removeClass('active');
                $('#newsImg').css({
                    opacity:0,
                    top:'589px'
                });
            }
        }
        topMargin=-(e.target.body.scrollTop/50);
        $('.bigBg2').css({
            backgroundPosition:"center "+topMargin+"px"
        });
        $('.bigBg3').css({
            backgroundPosition:"center "+topMargin+"px"
        });
        $('.bigBg4').css({
            backgroundPosition:"center "+topMargin+"px"
        });
    };
});