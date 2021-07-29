
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
    });
    // header
    const header = document.querySelector('.header');

    const callback = function (entries, observer){
        if(entries[0].isIntersecting){
            header.classList.remove('_scroll');
        }else{
            header.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(header);

}); // end