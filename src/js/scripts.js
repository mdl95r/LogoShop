"use strict"

document.addEventListener('DOMContentLoaded', () => {

    const ASIDE_ITEMS = {
        ASIDE_BURGER: '.js-burger-aside',
        ASIDE_BURGER_SHOW: 'burger-btn--active',
        ASIDE_NAV: '.aside__nav',
        ASIDE_LIST: '.aside__list',
        ASIDE_LINK: 'aside__link',
        ASIDE_LIST_SHOW: 'aside__list--show',
        ITEM: '.aside__item',
        ITEM_SUBMENU: 'aside__item--submenu',
        ITEM_SUBMENU_HOVERED: 'aside__item--submenu-hovered',
        SUBMENU_ITEM: '.submenu-item',
        SUBMENU_ITEM_ACTIVE: 'submenu-item--active',
        MOBILE_SUBMENU: '.mobile-submenu',
        MOBILE_SUBMENU_ACTIVE: 'mobile-submenu--active',
    }

    const SEARCH_BTN = {
        SEARCH: document.querySelector('.js-search-title'),
        DROPDOWN: document.querySelector('.search__dropdown'),
        DROPDOWN_ITEMS: document.querySelectorAll('.search-dropdown__link'),
        DROPDOWN_SHOW_STATE: 'search__dropdown_show',
        DROPDOWN_LINK_STATE: 'search-dropdown__link_active',
    }

    function checkHeightSubmenu() {
        const navAsideheight = document.querySelector(ASIDE_ITEMS.ASIDE_NAV).offsetHeight
        const submenuitem = document.querySelectorAll(ASIDE_ITEMS.SUBMENU_ITEM);
        submenuitem.forEach((item) => {
            item.style.height = `${navAsideheight}px`
        })
    };

    const burgerBtn = document.querySelector('.js-burger-btn');
    const mobMenu = document.querySelector('.js-mob-menu');
    const body = document.querySelector('body');
    burgerBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('burger-btn--active');
        if (burgerBtn.classList.contains('burger-btn--active')) {
            mobMenu.classList.add('mob-menu--active');
            body.classList.add('no-scroll');
        } else {
            mobMenu.classList.remove('mob-menu--active');
            body.classList.remove('no-scroll');
        }
    })

    document.querySelector(ASIDE_ITEMS.ASIDE_BURGER).onclick = function () {
        this.classList.toggle(ASIDE_ITEMS.ASIDE_BURGER_SHOW);
        const parentNav = this.closest(ASIDE_ITEMS.ASIDE_NAV);
        parentNav.querySelector(ASIDE_ITEMS.ASIDE_LIST)
            .classList.toggle(ASIDE_ITEMS.ASIDE_LIST_SHOW);
    };

    (SEARCH_BTN.SEARCH).onclick = function (e) {
        e.preventDefault();
        (SEARCH_BTN.DROPDOWN).classList.toggle(SEARCH_BTN.DROPDOWN_SHOW_STATE);
    };

    (SEARCH_BTN.DROPDOWN_ITEMS).forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle(SEARCH_BTN.DROPDOWN_LINK_STATE);
            const searchItemsActiveCount = document.querySelectorAll(`.${SEARCH_BTN.DROPDOWN_LINK_STATE}`).length;
            if (searchItemsActiveCount < SEARCH_BTN.DROPDOWN_ITEMS.length) {
                (SEARCH_BTN.SEARCH).innerText = `${(SEARCH_BTN.SEARCH)
                    .getAttribute('data-text-rus')} ${searchItemsActiveCount}`;
            } else {
                (SEARCH_BTN.SEARCH).innerText = `${(SEARCH_BTN.SEARCH).getAttribute('data-text-default-rus')}`;
            }
        })
    })

    const searchBtn = document.querySelector('.js-search-btn');
    // функция для обработки нажатых категорий и отправка их на бэкенд
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const itemsSearchArr = [];
        const dropdownActiveItems = document.querySelectorAll('.search-dropdown__link_active');
        if (dropdownActiveItems.length > 0) {
            dropdownActiveItems.forEach((item) => {
                const dropdownActiveItem = item.getAttribute('data-id-category');
                itemsSearchArr.push(dropdownActiveItem);
            })
            // sendArrData(itemsSearchArr); это пример, как можно передать массив дальше
        }
    })

    const ITEMS = document.querySelectorAll(ASIDE_ITEMS.ITEM);
    const submenuItems = document.querySelectorAll(`.${ASIDE_ITEMS.ITEM_SUBMENU}`);

    ITEMS.forEach((item) => {
        item.addEventListener('click', (e) => {
            const trg = e.target;
            const currentItem = trg.closest(ASIDE_ITEMS.ITEM);
            if (currentItem.classList.contains(ASIDE_ITEMS.ITEM_SUBMENU) && trg.classList.contains(ASIDE_ITEMS.ASIDE_LINK)) {
                e.preventDefault();
            }
        })
        item.addEventListener('click', (e) => {
            const trg = e.target;
            const currentItem = trg.closest(ASIDE_ITEMS.ITEM);

            checkHeightSubmenu();

            if (currentItem.classList.contains(ASIDE_ITEMS.ITEM_SUBMENU)) {
                const submenuItem = currentItem.querySelector(ASIDE_ITEMS.SUBMENU_ITEM);

                submenuItems.forEach((item) => {
                    item.classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                    const currentSubitem = item.querySelector(ASIDE_ITEMS.SUBMENU_ITEM);
                    currentSubitem.classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
                })
                currentItem.classList.add(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                submenuItem.classList.add(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);

                if (window.matchMedia("(max-width: 1100px)").matches) {
                    submenuItems.forEach((item) => {
                        item.classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                        item.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU).classList.remove(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
                    })
                    currentItem.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU).classList.add(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
                    currentItem.classList.add(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                }
            }
            if (!currentItem.classList.contains(ASIDE_ITEMS.ITEM_SUBMENU)) {
                if (currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`)) {

                    currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`)
                        .classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                    currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE}`)
                        .classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
                }
            }
        })
    });

    document.addEventListener('click', (e) => {
        const trg = e.target;
        const submenuHovered = document.querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`);
        if (window.matchMedia("(min-width: 1100px)").matches) {
            if (submenuHovered) {
                if (!trg.classList.contains(ASIDE_ITEMS.ASIDE_LINK) && !trg.closest(ASIDE_ITEMS.SUBMENU_ITEM)) {
                    submenuHovered.classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                    document.querySelector(`.${ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE}`)
                        .classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
                }
            }
        }
    })

    const banner = document.querySelector('.main-content__banner.swiper-container');
    if (banner) {
        new Swiper('.main-content__banner', {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            speed: 800,
            autoHeight: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.banner-dots',
                clickable: true,
            },
        })
    }

    const slideImages = document.querySelectorAll('.banner-list__item img');
    const mainSliderDots = document.querySelectorAll('.swiper-pagination-bullet');

    for (let index = 0; index < slideImages.length; index++) {
        const slideImg = slideImages[index].getAttribute('src');
        mainSliderDots[index].style.background = `url(${slideImg})`;
    };
    const cards = document.querySelector('.cards__container');
    if (cards) {
        new Swiper('.cards__container', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            speed: 800,
            lazy: true,
            pagination: {
                el: '.slider-control__counter',
                type: 'fraction',
            },
            navigation: {
                prevEl: '.js-cards-prev',
                nextEl: '.js-cards-next',
            },
        })
    }

    const swiperBrands = document.querySelector('.brands');
    if (swiperBrands) {
        new Swiper('.brands__container', {
            loop: true,
            slidesPerView: 5,
            slidesPerGroup: 1,
            spaceBetween: 30,
            breakpoints: {
                992: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                },
                768: {
                    slidesPerView: 4,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
            },
            navigation: {
                prevEl: '.js-brands-arrow-left',
                nextEl: '.js-brands-arrow-right',
            },
        })
    }
})