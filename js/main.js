"use strict";
/**dropdown menu */
/* (function() {
    const subMenu = document.querySelectorAll('.header__item');
    console.log(subMenu);
    for(let i=0; i < subMenu.length; i++) {
        subMenu[i].addEventListener('mouseenter', showSub, false);
        subMenu[i].addEventListener('mouseleave', hideSub, false);
    }
    function showSub() {
        
        if(this.children.length > 1) {
            console.log(this.children[1]);
            this.children[1].classList.add('active-sub');
        } else {
            return false;
        }
    }

    function hideSub() {
        if(this.children.length > 1) {
            this.children[1].classList.remove('active-sub');
        } else {
            return false;
        }
    }


})(); */
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
let body = document.querySelector('body');
if(isMobile.any()) {
    body.classList.add('touch');
    let plusButton = document.querySelectorAll('.plus');
    
for(let i=0; i<plusButton.length; i++) {
    let submenu = plusButton[i].nextElementSibling;
    
    let thisPlusButton = plusButton[i];
    let thisLink = plusButton[i].previousElementSibling;
    thisLink.classList.add('parent');
    plusButton[i].addEventListener('click', ()=> {
        submenu.classList.toggle('open');
        thisPlusButton.classList.toggle('active');
    });
}
} else {
    body.classList.add('mouse');
}



(function() {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if(window.pageYOffset > 10) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    }

}());
(function() {
    const burger = document.querySelector('.header_burger');
    const nav = document.querySelector('.header__nav');
    burger.addEventListener('click', ()=> {
        burger.classList.toggle('burger_active');
        nav.classList.toggle('header__nav_active');
    })

}());
(function(){
function trackScroll() {
    let scroll = window.pageYOffset;
    let coords = document.documentElement.clientHeight;
    if (scroll > coords) {
        goTopBtn.classList.add('show');
      }
      if (scroll < coords) {
        goTopBtn.classList.remove('show');
      }
}
function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ 
            top: 0,
            behavior: 'smooth'
            });
      
    }
  }
  let goTopBtn = document.querySelector('#back2Top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
}());

/* const mainSlider = new SliderCarousel({
    main: '.reviews__carousel',
    wrapper: '.reviews__carousel-wrapper',
    slidesToShow: 3,
    responsive:  [{
        breakpoint: 1024,
        slideToShow: 3
    },
    {
        breakpoint: 768,
        slideToShow:2
    },
    {breakpoint: 576,
    slideToShow: 1}
],

});
mainSlider.init();
const Slider = new SliderCarousel({
    general: '.shop-slider',
    main: '.slider',
    wrapper: '.shop-slider__wrapper',
    slidesToShow: 1,
    dots: true,
});
Slider.init(); */
const swiper = new Swiper('.slider', {
    // Optional parameters
    loop: true,
   
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    
  }, 
  autoplay: {
    delay: 4000,
  },
  
  });
  const carousel = new Swiper('.reviews__carousel', {
    loop: true,
    autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.pagination',
        clickable: true,
      }, 
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        
        768: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        
        640: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
  });