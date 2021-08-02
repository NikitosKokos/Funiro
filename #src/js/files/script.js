
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
        if(targetEl.classList.contains('products__more')){
            getProducts(targetEl);
            e.preventDefault();
        }
    }

    // load more products
    async function getProducts(button) {
        if(!button.classList.contains('_hold')){
            button.classList.add('_hold');
            const file = 'json/products.json';
            let response = await fetch(file, {
                method: 'GET'
            });
            if(response.ok){
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            }else{
                alert('Error')
            }
        }
    }

    function loadProducts(data) {
        const productsItems = document.querySelector('.products__items');

        data.products.forEach(item => {
            const productId = item.id;
            const productUrl = item.url;
            const productImage = item.image;
            const productTitle = item.title;
            const productText = item.text;
            const productPrice = item.price;
            const productOldPrice = item.priceOld;
            const productShareUrl = item.shareUrl;
            const productLikeUrl = item.likeUrl;
            const productLabels = item.labels;
            
            let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
                <a href="${productUrl}" class="item-product__image _ibg">
                    <img src="img/products/${productImage}" alt="${productTitle}">
                </a>
            `;

                    let productTemplateBodyStart = `<div class="item-product__body">`;
                    let productTemplateBodyEnd = `</div>`;

                    let productTemplateContent = `
                <div class="item-product__content">
                    <h3 class="item-product__title">${productTitle}</h3>
                    <div class="item-product__text">${productText}</div>
                </div>
            `;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
                <div class="item-product__actions actions-product">
                    <div class="actions-product__body">
                        <a href="" class="actions-product__button btn btn_white">Add to cart</a>
                        <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
                        <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
                    </div>
                </div>
            `;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

            productsItems.insertAdjacentHTML('beforeend', productTemplate);
            ibg();
        });
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