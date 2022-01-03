"use strict"

document.addEventListener('DOMContentLoaded', () => {

    const ASIDE_ITEMS = {
        ASIDE_BURGER: '.js-burger-aside',
        ASIDE_BURGER_SHOW: 'burger-btn--active',
        ASIDE_NAV: '.aside__nav',
        ASIDE_LIST: '.js-aside-menu-list',
        ASIDE_LINK: 'aside__link',
        ASIDE_LIST_SHOW: 'aside__menu-list--show',
        ITEM: '.aside__item',
        ITEM_SUBMENU: 'aside__item--submenu',
        ITEM_SUBMENU_HOVERED: 'aside__item--submenu-hovered',
        SUBMENU_ITEM: '.submenu-item',
        SUBMENU_ITEM_ACTIVE: 'submenu-item--active',
        MOBILE_SUBMENU: '.mobile-submenu',
        MOBILE_SUBMENU_ACTIVE: 'mobile-submenu--active',
    }

    const SEARCH_BTN = {
        SEARCH: '.js-search-title',
        DROPDOWN: '.js-search-dropdown',
        DROPDOWN_ITEMS: '.search-dropdown__link',
        DROPDOWN_SHOW_STATE: 'search__dropdown_show',
        DROPDOWN_LINK_STATE: 'search-dropdown__link_active',
    }

    function resetSubmenu() {
        const submenuItemActive = document.querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU}.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`);
        if (submenuItemActive) {
            submenuItemActive.classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
            submenuItemActive.querySelector(ASIDE_ITEMS.SUBMENU_ITEM).classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
            const mobileSubmenu = submenuItemActive.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU)
            mobileSubmenu.classList.remove(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
            mobileSubmenu.style.maxHeight = '0';
        }
    };

    const burgerBtn = document.querySelector('.js-burger-btn');
    const mobMenu = document.querySelector('.js-mob-menu');
    const body = document.querySelector('body');

    burgerBtn.addEventListener('click', (e) => {
        burgerBtn.classList.toggle('burger-btn--active');
        if (burgerBtn.classList.contains('burger-btn--active')) {
            mobMenu.classList.add('mob-menu--active');
            body.classList.add('no-scroll');
        } else {
            mobMenu.classList.remove('mob-menu--active');
            body.classList.remove('no-scroll');
        }
    })

    window.addEventListener('resize', () => {
        mobMenu.classList.remove('mob-menu--active');
        body.classList.remove('no-scroll');
        burgerBtn.classList.remove('burger-btn--active');

        resetSubmenu();
    })


    const asideBurger = document.querySelector(ASIDE_ITEMS.ASIDE_BURGER);

    asideBurger.addEventListener('click', function() {
        this.classList.toggle(ASIDE_ITEMS.ASIDE_BURGER_SHOW);
        const listItems = document.querySelector(ASIDE_ITEMS.ASIDE_LIST);
        
        if (listItems.classList.contains('aside__menu-list--show')) {
            resetSubmenu();

            listItems.style.height = '0px';
        } else {
            const heightAllItems = document.querySelectorAll('.aside__item');
            const heightOneItem = document.querySelector('.aside__item').offsetHeight;
            const menuListHeight = heightAllItems.length * heightOneItem;

            listItems.style.height = `${menuListHeight}px`
        }

        const parentNav = this.closest(ASIDE_ITEMS.ASIDE_NAV);
        parentNav.querySelector(ASIDE_ITEMS.ASIDE_LIST)
            .classList.toggle(ASIDE_ITEMS.ASIDE_LIST_SHOW);
    })
    
    const search = document.querySelector(SEARCH_BTN.SEARCH);
    const searchDropDown = document.querySelector(SEARCH_BTN.DROPDOWN);

    search.addEventListener('click', function(e) {
        e.preventDefault();
        searchDropDown.classList.toggle(SEARCH_BTN.DROPDOWN_SHOW_STATE);
    })

    searchDropDown.addEventListener('click', (e) => {
        const dropdownItems = document.querySelectorAll(SEARCH_BTN.DROPDOWN_ITEMS);
        const trg = e.target;
        e.preventDefault();
        if (trg.classList.contains('search-dropdown__link')) {
            trg.classList.toggle(SEARCH_BTN.DROPDOWN_LINK_STATE);
            const searchItemsActiveCount = document.querySelectorAll(`.${SEARCH_BTN.DROPDOWN_LINK_STATE}`).length;

            searchItemsActiveCount < dropdownItems.length ? search.innerText = `${search.getAttribute('data-text-rus')} ${searchItemsActiveCount}` : search.innerText = search.getAttribute('data-text-default-rus');
        }
    })

    const searchBtn = document.querySelector('.js-search-btn');
    // функция для обработки нажатых категорий и отправка их на бэкенд
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const itemsSearchArr = [];
        const dropdownActiveItems = document.querySelectorAll('.search-dropdown__link_active');
        if (dropdownActiveItems.length > 0) {
            dropdownActiveItems.forEach((item) => {
                const getDataId = item.dataset.idCategory
                itemsSearchArr.push({
                    id: getDataId
                });
            })
        }
        console.log(JSON.stringify(itemsSearchArr));
    })

    const submenuItems = document.querySelectorAll(`.${ASIDE_ITEMS.ITEM_SUBMENU}`);
    const menuList = document.querySelector(ASIDE_ITEMS.ASIDE_LIST);

    menuList.addEventListener('click', (e) => {
        const trg = e.target;
        const currentItem = trg.closest(ASIDE_ITEMS.ITEM);
        
        if (currentItem.classList.contains(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED)) {
            e.preventDefault();

            const submenuItem = currentItem.querySelector(ASIDE_ITEMS.SUBMENU_ITEM);
            const mobileSubmenu = currentItem.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU);

            currentItem.classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
            submenuItem.classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
            mobileSubmenu.classList.remove(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
            mobileSubmenu.style.maxHeight = '0';
            return
        }

        if (currentItem.classList.contains(ASIDE_ITEMS.ITEM_SUBMENU)) {
            e.preventDefault();
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
                    const mobileSubmenu = item.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU)

                    mobileSubmenu.classList.remove(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
                    mobileSubmenu.style.maxHeight = '0';
                })
                const mobileSubmenu = currentItem.querySelector(ASIDE_ITEMS.MOBILE_SUBMENU);
                const mobileSubmenuList = mobileSubmenu.querySelector('.submenu-item__menu-list');

                mobileSubmenu.style.maxHeight = `${mobileSubmenuList.offsetHeight}px`
                mobileSubmenu.classList.add(ASIDE_ITEMS.MOBILE_SUBMENU_ACTIVE);
                menuList.style.height = 'auto';
                currentItem.classList.add(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
            }
        } else {
            if (currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`)) {

                currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.ITEM_SUBMENU_HOVERED}`)
                    .classList.remove(ASIDE_ITEMS.ITEM_SUBMENU_HOVERED);
                currentItem.closest(ASIDE_ITEMS.ASIDE_LIST).querySelector(`.${ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE}`)
                    .classList.remove(ASIDE_ITEMS.SUBMENU_ITEM_ACTIVE);
            }
        }
    })

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
        if (!trg.closest('.main-content__search')) {
            searchDropDown.classList.remove(SEARCH_BTN.DROPDOWN_SHOW_STATE);
        }
    })

    const banner = document.querySelector('.main-content__hero.swiper');
    if (banner) {
        new Swiper('.main-content__hero', {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            speed: 800,
            autoHeight: true,
            autoplay: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.hero-dots',
                clickable: true,
            },
        })
    }

    const slideImages = document.querySelectorAll('.hero-list__item img');
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
            autoplay: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            speed: 1500,
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
            autoplay: true,
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