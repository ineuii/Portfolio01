let mouseDownState = false;
let x = 0;
let y = 0;
let currentFrame = 0;

const minDistance = 20;

function init() {
    frame = document.querySelector('.all_wrap');

    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);

    renderFrame();
}

function mouseUp() {
    mouseDownState = false;
    frame.classList.remove('grab');
}

function mouseDown(e) {
    x = e.offsetX;
    y = e.offsetY;

    frame.classList.add('grab');

    mouseDownState = true;
}

function mouseMove(e) {
    if (mouseDownState) {
        const xDistance = x - e.offsetX;
        if (isStep(xDistance)) {
            const direction = getDirection(xDistance);
            nextFrame(direction);
            renderFrame();

            x = e.offsetX;
            y = e.offsetY;
        }
    }
}

function isStep(distance) {
    return Math.abs(distance) > minDistance;
}

function getDirection(distance) {
    return (distance > 0) ? 1 : -1;
}

function nextFrame(direction) {
    currentFrame += direction;
    if (currentFrame >= 360) currentFrame = 0;
    if (currentFrame < 0) currentFrame = 360;
}

function renderFrame() {
    //frame.innerHTML = `${currentFrame}` ;
    //frame.style.background = `hsl(${currentFrame}deg 100% 50%)`;
    console.log(currentFrame)
    frame.style.transform = `rotate(${currentFrame}deg)`;
}

window.load = init();


// ------------------nav bar---------------

$('.gnb li a').mouseenter(function () {
    var bar = $(this).position().left;
    // positionleft란 뜻은 a태그의 왼쪽 띄워진 공간(margin)값을 계산해라는 뜻
    //console.log(bar)
    var widNum = $(this).width();
    console.log(widNum)
    $('.bar').animate({
        'left': bar + 'px',
        'width': widNum + 'px',
        'opacity': 1
    }, 300)
});

$('.gnb').mouseleave(function () {
    $('.bar').animate({
        'left': 0,
        'width': 0,
        'opacity': 1
    }, 10)
})

// ------------------scrolla---------------

$('.animate').scrolla({
    // default
    mobile: true, // 모바일버전시 활성화
    once: false, // 스크롤시 한번만 실행 or 영역이 보일때마다 실행
});




// ------------------poster image hover---------------
var Item = $('.items img')

Item.mouseenter(function () {
    $(this).css("transform", `scale(${1.2})`);
    $(this).css("border", "1px solid #06c");
});
Item.mouseleave(function () {
    $(this).css("transform", `scale(${1.0})`);
    $(this).css("border", "0px solid #06c")
});


$('.poster_item01 img').click(function () {

    $('.poster_bg.n01').fadeIn(2000);
});
$('.poster_bg n01 a').click(function () {
    $('.poster_bg.n01').hide();
});



// ------------------slick slider---------------

// $(document).ready(function () {
//     $('.slider').slick({
//         autoplay: true
//     });
// });


// ------------------swiper slider---------------

// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,

//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });


// ------------------화면전환---------------
$(function () {
    var headH = $(".header").height();
    var footerH = $(".footer").height();

    $(window).resize(function () {
        wHrezie();
    });

    var wHrezie = function () {
        var wH = $(window).height();
        $(".page").css("height", wH);
    }

    wHrezie();

    /* [S] 인디게이터 화면전환 */
    var idx = 0;
    var isMove = false;
    var pageNum = $(".page li").length - 1;

    $('.menu li a').click(function () {
        var menuNum = $('.menu li').length;
        var preIdx = idx;
        idx = $(this).parent().index();

        if (preIdx == idx) return false;

        if (preIdx > idx) { //UP
            if ($(".page li").is(":animated")) return false;
            $(".page li:gt(" + idx + ")").stop().animate({
                'top': '100%'
            }, 500); //idx보다 큰수
            $(".page li").eq(preIdx).stop().animate({
                "top": "100%"
            }, 500);
        } else { //DOWN
            if ($(".page li").is(":animated")) return false;
            $(".page li:lt(" + idx + ")").stop().animate({
                'top': '-100%'
            }, 500); //idx보다 작은수
            $(".page li").eq(preIdx).stop().animate({
                "top": "-100%"
            }, 500);
        }

        focusOn();
    });
    /* [E] 인디게이터 화면전환 */

    /* [S] 마우스휠 화면전환 */
    $(window).on('wheel', function (e) {
        if (e.originalEvent.wheelDelta > 0) {
            whellUp();
        } else {
            whellDown();
        }
    });
    /* [E] 마우스휠 화면전환 */

    var whellUp = function () {
        var preIdx = idx;

        if ($("#wrap, .page li").is(":animated")) return false;
        if (idx > 0) idx--;
        if (idx <= pageNum) $("#wrap").stop().animate({
            "margin-top": "0"
        }, 500); //footer

        $(".page li:gt(" + idx + ")").stop().animate({
            'top': '100%'
        }, 500); //idx보다 큰수
        $(".page li").eq(preIdx).stop().animate({
            "top": "100%"
        }, 500);
        $(".page li").eq(idx).stop().animate({
            "top": 0
        }, 500);

        focusOn();
    }

    var whellDown = function () {
        var preIdx = idx;

        if ($("#wrap, .page li").is(":animated")) return false;
        if (idx < pageNum) {
            idx++;
        } else {
            idx = pageNum + 1;
            $("#wrap").stop().animate({
                "margin-top": -footerH + "px"
            }, 500); //footer
            return false;
        }
        $(".page li:lt(" + idx + ")").stop().animate({
            'top': '-100%'
        }, 500); //idx보다 작은수
        $(".page li").eq(preIdx).stop().animate({
            "top": "-100%"
        }, 500);
        $(".page li").eq(idx).stop().animate({
            "top": 0
        }, 500);

        focusOn();
    }

    var focusOn = function () {
        $(".page li").removeClass("on");
        $(".page li").eq(idx).stop().animate({
            "top": 0
        }, 500).addClass("on");

        $('.menu li').removeClass("on");
        $('.menu li').eq(idx).addClass("on");
    }

});

// ---------parallax------------- 
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);


// ---------locomotive------------- 

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
})

// ------------------cardMenu open---------------
$('.cardMenu .open').click(function () {
    $('#poster').toggleClass("on1");
});





// ------------------bg_wrap 열고 닫기---------------
$('#poster .poster_item01 img').click(function () {
    $('.bg_wrap .bgOpen svg path').addClass('on2')
    $('.bg_wrap .bgOpen.poster_01').addClass('on2')
});
$('.bg_wrap .bgOpen .close').click(function () {
    $('.bg_wrap .bgOpen.poster_01').removeClass('on2')
});






$('#poster .poster_item02 img').click(function () {
    $('.bg_wrap .bgOpen svg path').addClass('on2')
    $('.bg_wrap .bgOpen.poster_02').addClass('on2')
});
$('.bg_wrap .bgOpen .close').click(function () {
    $('.bg_wrap .bgOpen.poster_02').removeClass('on2')
});