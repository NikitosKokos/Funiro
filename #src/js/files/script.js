
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
    }

}); // end