
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', documentActions);

    function documentActions(e) {
        const targetEl = e.target;
        if(window.innerWidth > 768 && isMobile.any()){
            if(targetEl.classList.contains('menu__arrow')){
                targetEl.closest('.menu__item').classList.toggle('_hover');
            }
            if(!targetEl.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0){
                _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
            }
        }
        if(targetEl.closest('.search-form__icon')){
            document.querySelector('.search-form').classList.toggle('_active');
        }else if(!targetEl.closest('.search-form') && document.querySelector('.search-form._active')){
            document.querySelector('.search-form').classList.remove('_active');
        }
    }

    if(document.querySelector('.slider-main__body'))
    let mainSlider = new Swiper('.slider-main__body', {
        /*
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 32,
        watchOverflow: true,
        speed: 800,
        loop: true,
        loopAdditionalSlides: 5,
        preloadImages: false,
        parallax: true,

        // Dotts
        pagination: {
        	el: '.controls-slider-main__dotts',
        	clickable: true,
        },
        // Arrows
        navigation: {
            nextEl: '.slider-main .slider-arrow__next',
            prevEl: '.slider-main .slider-arrow__prev',
        },
        /*
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1268: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        */
        on: {
            lazyImageReady: function () {
                ibg();
            },
        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });
}); // end