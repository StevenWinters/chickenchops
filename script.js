window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
});

// Check for document to be ready before loading DOM elements

if (document.readyState == 'ready') {
    window.addEventListener('DOMContentLoaded', ready);
}

else {
    ready();
}

function ready() {
    // Click functions to open and close

    const hamburgerMenu = document.querySelector('.hamburger__menu');
    hamburgerMenu.addEventListener('click', hamburgerMenuClicked);

    const overlayClose = document.querySelector('.overlay__close');
    overlayClose.addEventListener('click', overlayCloseClicked);

    const menuBtns = document.querySelectorAll('.menu__btn');
    menuBtns.forEach(menuBtn => {
        menuBtn.addEventListener('click', menuBtnClicked);
        menuBtn.addEventListener('click', menuContentSwapToModal);
        menuBtn.addEventListener('click', getItemSize);
    });

    const about = document.querySelector('.about');
    about.addEventListener('click', overlayListsClicked);

    const cartIcon = document.querySelector('.cart--icon');
    cartIcon.addEventListener('click', cartIconClicked);

    const cartClose = document.querySelector('.cart__close');
    cartClose.addEventListener('click', cartCloseClicked);

    const menuDropdownTab = document.querySelector('.menu__dropdown-tab');
    menuDropdownTab.addEventListener('click', menuDropdownTabClicked);

    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', modalCloseClicked);

    // Close Overlay Alternatively
    window.addEventListener('keydown', overlayClosedAlter);

    // Click menu functions

    const modalPlus = document.querySelector('.modal__plus');
    modalPlus.addEventListener('click', modalPlusClicked);

    const modalMinus = document.querySelector('.modal__minus');
    modalMinus.addEventListener('click', modalMinusClicked);

    const modalBtn = document.querySelector('.modal__btn');
    modalBtn.addEventListener('click', addCartItem);

    // Click cart functions

    const cartContainer = document.querySelector('.cart__container');
    const cartBoxes = cartContainer.querySelectorAll('.cart__box');
    cartBoxes.forEach(cartBox => {
        const cartPlus = cartBox.querySelector('.card__plus');
        cartPlus.addEventListener('click', cartPlusClicked);
        const cartMinus = cartBox.querySelector('.card__minus');
        cartMinus.addEventListener('click', cartMinusClicked);
        const cartRemove = cartBox.querySelector('.cart__remove');
        cartRemove.addEventListener('click', deleteCartItem);
    });    

    const cartPurchase = document.querySelector('.cart__purchase');
    cartPurchase.addEventListener('click', cartPurchaseClicked);

    const alertClose = document.querySelector('.alert__close');
    alertClose.addEventListener('click', alertCloseClicked);
}

function hamburgerMenuClicked() {
    const navOverlay = document.querySelector('.nav__overlay');
    navOverlay.classList.toggle('active');
}

function overlayCloseClicked() {
    hamburgerMenuClicked();
}

function menuDropdownTabClicked() {
    const menuDropdown = document.querySelector('.menu__dropdown');
    const cartSelectionContainer = document.querySelector('.cart-selection__container');
    menuDropdown.classList.toggle('active');
    cartSelectionContainer.classList.toggle('active');
}

function menuBtnClicked() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
}

function overlayClosedAlter(event) {
    const overlay = document.querySelector('.overlay');
    const alertOverlay = document.querySelector('.alert__overlay');
    if (overlay.classList.contains('active')) {
        if (event.key === 'Escape') {
            overlay.classList.toggle('active');
        }
    }

    if (alertOverlay.classList.contains('active')) {
        if (event.key === 'Escape') {
            alertModalPop();
        }
    }
}

function modalCloseClicked() {
    menuBtnClicked();
}

function overlayListsClicked() {
    const overlayListUl = document.querySelector('.overlay__list ul');
    const overlayDropdown = document.querySelector('.overlay__dropdown');
    overlayListUl.classList.toggle('active');
    overlayDropdown.classList.toggle('active');
}

function cartIconClicked() {
    const cartMenu = document.querySelector('.cart-menu');
    cartMenu.classList.toggle('active');
}

function cartCloseClicked() {
    cartIconClicked();
}

function alertCloseClicked() {
    const alertOverlay = document.querySelector('.alert__overlay');
    alertOverlay.classList.toggle('active');
}

// Menu Functions

function menuContentSwapToModal(event) {
    let menuBtn = event.target
    const overlay = document.querySelector('.overlay');
    if (overlay.classList.contains('active')) {
        const menuProduct = menuBtn.parentElement.parentElement.parentElement;
        const menuImage = menuProduct.querySelector('.menu__image img').src;
        const menuText = menuProduct.querySelector('.menu__text').innerText;
        const menuTitle = menuProduct.querySelector('.menu__title').innerText;
        const menuPrice = menuProduct.querySelector('.menu__price').innerText;
        const modalTitle = document.querySelector('.modal__title');
        const modalImage = document.querySelector('.modal__image');
        const modalText = document.querySelector('.modal__text');
        const modalPrice = document.querySelector('.modal__price');
        modalTitle.innerText = menuTitle;
        modalImage.innerHTML = 
        `
            <img src="${menuImage}" alt="" />
        `;
        modalText.innerText = menuText;
        modalPrice.innerText = menuPrice;
    }
}

function modalPlusClicked() {
    const modalQuantity = document.querySelector('.modal__number');
    let quantityValue = parseInt(modalQuantity.innerText) + 1;
    modalQuantity.innerText = quantityValue;
    modalQuantityError();
    updateModalTotal();
}

function modalMinusClicked() {
    const modalQuantity = document.querySelector('.modal__number');
    let quantityValue = parseInt(modalQuantity.innerText) - 1;
    modalQuantity.innerText = quantityValue;
    modalQuantityError();
}

function modalQuantityError() {
    const modalQuantity = document.querySelector('.modal__number');
    if (modalQuantity.innerText === '0' || modalQuantity.innerText === '101' || isNaN(modalQuantity.innerText))
        modalQuantity.innerText = 1;
}

function getItemSize(event) {
    const menuBtn = event.target;
    const menuContent = menuBtn.parentElement.parentElement;
    const menuTitle = menuContent.querySelector('.menu__title');
    if (menuTitle.innerText === 'Fries') {
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.innerText = 'Medium Fries';
        const modalWrapper = document.querySelector('.modal__wrapper');
        modalWrapper.innerHTML = `
            <h5 class="modal__choose">Choose a size (Choose 1 only)</h5>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="small" />
              <label class="modal__label" for="modal__radio">Small</label>
            </div>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="medium" checked />
              <label class="modal__label" for="modal__radio">Medium</label>
            </div>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="large" />
              <label class="modal__label" for="modal__radio">Large</label>
            </div>
        `;

        const modalSizes = document.querySelectorAll('.modal__size');
        modalSizes.forEach(modalSize => {
            const modalRadio = modalSize.querySelector('.modal__radio');
            modalRadio.addEventListener('change', () => {
                if (modalRadio.value === 'small') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-fries-s.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = 'Small Fries';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱35.99';
                }

                if (modalRadio.value === 'medium') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-fries-m.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = 'Medium Fries';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱55.99';
                }
                
                if (modalRadio.value === 'large') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-fries-l.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = 'Large Fries';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱74.99';
                }
            });
            
        });
    }
    
    else if (menuTitle.innerText === 'Shots') {
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.innerText = 'Regular Shots';
        const modalWrapper = document.querySelector('.modal__wrapper');
        modalWrapper.innerHTML = `
            <h5 class="modal__choose">Choose a size (Choose 1 only)</h5>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="regular" checked />
              <label class="modal__label" for="modal__radio">Regular</label>
            </div>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="large" />
              <label class="modal__label" for="modal__radio">Large</label>
            </div>
        `;

        const modalSizes = document.querySelectorAll('.modal__size');
        modalSizes.forEach(modalSize => {
            const modalRadio = modalSize.querySelector('.modal__radio');
            modalRadio.addEventListener('change', () => {
                if (modalRadio.value === 'regular') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-shots-r.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = 'Regular Shots';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱82.99';
                }

                if (modalRadio.value === 'large') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-shots-l.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = 'Large Shots';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱129.99';
                }
            });            
        });
    }

    else if (menuTitle.innerText === 'Chicken Chops Bucket') {
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.innerText = '8 pcs. Chicken Chops Bucket';
        const modalWrapper = document.querySelector('.modal__wrapper');
        modalWrapper.innerHTML = `
            <h5 class="modal__choose">Choose a size (Choose 1 only)</h5>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="four" />
              <label class="modal__label" for="modal__radio">4 pcs. Chicken</label>
            </div>
            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="six" />
              <label class="modal__label" for="modal__radio">6 pcs. Chicken</label>
            </div>

            <div class="modal__size">
              <input class="modal__radio" type="radio" name="item-size" value="eight" checked />
              <label class="modal__label" for="modal__radio">8 pcs. Chicken</label>
            </div>
        `;

        const modalSizes = document.querySelectorAll('.modal__size');
        modalSizes.forEach(modalSize => {
            const modalRadio = modalSize.querySelector('.modal__radio');
            modalRadio.addEventListener('change', () => {
                if (modalRadio.value === 'four') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-chicken-s.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = '4 pcs. Chicken Chops Bucket';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱240';
                }

                if (modalRadio.value === 'six') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-chicken-m.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = '6 pcs. Chicken Chops Bucket';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱361.99';
                }

                if (modalRadio.value === 'eight') {
                    const modalImage = document.querySelector('.modal__image');
                    modalImage.innerHTML = 
                    `
                        <img src="images/Photoshop Images/Combos/menu-chicken-l.jpg" alt="" />
                    `;
                    const modalTitle = document.querySelector('.modal__title');
                    modalTitle.innerText = '8 pcs. Chicken Chops Bucket';
                    const modalPrice = document.querySelector('.modal__price');
                    modalPrice.innerText = '₱482.99';
                }
            });            
        });
    }

    else {
        const modalWrapper = document.querySelector('.modal__wrapper');
        if (modalWrapper.hasChildNodes()) {
            const modalSizes = document.querySelectorAll('.modal__size');
            const modalChoose = document.querySelector('.modal__choose');
            modalChoose.remove();
            modalSizes.forEach(modalSize => {
                const modalRadio = modalSize.querySelector('.modal__radio');
                const modalLabel = modalSize.querySelector('.modal__label');
                modalRadio.remove();
                modalLabel.remove();
                console.log(modalRadio, modalLabel);
            });
        }
    }
}

function addCartItem() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
    const modalTitle = document.querySelector('.modal__title');
    const modalImg = document.querySelector('.modal__image img').src;
    const modalPrice = document.querySelector('.modal__price').innerText;
    const modalNumber = document.querySelector('.modal__number').innerText;
    let cartBox = document.createElement('div');
    cartBox.classList.add('cart__box');
    const cartTitles = document.querySelectorAll('.cart__title');
    for (i = 0; i < cartTitles.length; i++) {
        if (cartTitles[i].innerText === modalTitle.innerText) {
            alertModalPop();
            const alertImage = document.querySelector('.alert__image');
            const alertText = document.querySelector('.alert__text');
            alertImage.innerHTML = `<i class="fa-regular fa-circle-xmark alert__x"></i>`;
            alertText.innerText = 'You have already added this item.';
            return;
        }
    };
    
    let cartBoxContent = `
        <h3 class="cart__title">${modalTitle.innerText}</h3>
        <div class="cart__image">
          <img src="${modalImg}" alt="" />
        </div>
        <div class="cart__content">
          <div class="cart__price">
            <h3>${modalPrice}</h3>
          </div>
          <div class="cart__quantity">
            <button class="btn btn--plus cart__btn card__minus">-</button>
            <h5 class="cart__number">${modalNumber}</h5>
            <button class="btn btn--plus cart__btn card__plus">+</button>
          </div>
          <div class="cart__remove"><i class="fa-solid fa-trash"></i></div>
        </div>
    `;

    cartBox.innerHTML = cartBoxContent;
    const cartContainer = document.querySelector('.cart__container');
    cartContainer.append(cartBox);
    updateCartTotal();
    
    // Resetting click functions due to ready DOM element
    const cartBoxes = cartContainer.querySelectorAll('.cart__box');
    cartBoxes.forEach(cartBox => {
        const cartPlus = cartBox.querySelector('.card__plus');
        cartPlus.addEventListener('click', cartPlusClicked);
        const cartMinus = cartBox.querySelector('.card__minus');
        cartMinus.addEventListener('click', cartMinusClicked);
        const cartRemove = cartBox.querySelector('.cart__remove');
        cartRemove.addEventListener('click', deleteCartItem);
    });    
}

// Cart functions

function updateCartTotal() {
    const cartContainer = document.querySelector('.cart__container');
    const cartBoxes = cartContainer.querySelectorAll('.cart__box');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const cartPriceElement = cartBox.querySelector('.cart__price');
        const cartQuantityElement = cartBox.querySelector('.cart__number');
        const cartPrice = parseFloat(cartPriceElement.innerText.replace('₱', ''));
        const cartQuantity = cartQuantityElement.innerText;
        total = total + (cartPrice * cartQuantity);
    });
    total = total.toFixed(2);
    document.querySelector('.cart__value').innerText = total;
}

function cartQuantityError() {
    const cartQuantity = document.querySelector('.cart__number');
    if (cartQuantity.innerText === '0' || cartQuantity.innerText === '101' || isNaN(cartQuantity.innerText))
        cartQuantity.innerText = 1;
}

function cartPlusClicked(event) {
    let cartPlus = event.target;
    const cartQuantity = cartPlus.parentElement;
    const cartNumber = cartQuantity.querySelector('.cart__number');
    let quantityValue = parseInt(cartNumber.innerText) + 1;
    cartNumber.innerText = quantityValue;
    cartQuantityError();
    updateCartTotal();
}

function cartMinusClicked(event) {
    let cartPlus = event.target;
    const cartQuantity = cartPlus.parentElement;
    const cartNumber = cartQuantity.querySelector('.cart__number');
    let quantityValue = parseInt(cartNumber.innerText) - 1;
    cartNumber.innerText = quantityValue;
    cartQuantityError();
    updateCartTotal();
}

function deleteCartItem(event) {
    const trash = event.target;
    const cartBox = trash.parentElement.parentElement.parentElement;
    cartBox.remove();
    updateCartTotal();
}

function cartPurchaseClicked() {
    const cartContainer = document.querySelector('.cart__container');
    if (cartContainer.hasChildNodes()) {
        while (cartContainer.hasChildNodes()) {
            cartContainer.removeChild(cartContainer.firstChild);
        }
        updateCartTotal();
        alertModalPop();
        const alertImage = document.querySelector('.alert__image');
        const alertText = document.querySelector('.alert__text');
        alertImage.innerHTML = `<i class="fa-regular fa-circle-check alert__check"></i>`;
        alertText.innerText = 'Succesfully Ordered.';
    }

    else {
        alertModalPop();
        const alertImage = document.querySelector('.alert__image');
        const alertText = document.querySelector('.alert__text');
        alertImage.innerHTML = `<i class="fa-regular fa-circle-xmark alert__x"></i>`;
        alertText.innerText = 'You have not added any items yet.';
    }   
}

function alertModalPop() {
    const alertOverlay = document.querySelector('.alert__overlay');
    alertOverlay.classList.toggle('active');
}
