let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');



closeCart.addEventListener('click', function () {
    cart.classList.remove('active');
});

cartIcon.addEventListener('click', function () {
    cart.classList.add('active');
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', showAddedProductsLS);
} else {
    ready();
}
ready();

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove')

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        button = addCart[i];

        button.addEventListener('click', function addCartClicked(event) {
            var button = event.target;
            var shopProduct = button.parentElement;
            var title = shopProduct.getElementsByClassName('feature-info')[0].innerText;
            var price = shopProduct.getElementsByClassName('price-home')[0].innerText;
            var productImage = shopProduct.getElementsByClassName('feature-img')[0].src;




            let items = [];
            const product = {
                id: event.target.getAttribute("data-id"),
                name: title,
                price: price,
                image: productImage,
                quantity: 1
            };
            // if(typeof(Storage) !== 'undefined'){
            //     let item ={

            //         name:title,
            //         price:price,
            //         image:productImage,
            //         quantity:1
            //     };
            //     if(JSON.parse(localStorage.getItem(items)) === null){
            //         items.push(item);
            //         localStorage.setItem("items",JSON.stringify(item));
            //     }else{
            //         const localItems = JSON.parse(localStorage.getItem("items"));
            //         items.push(item);
            //     }}


            addToLS(product)

            updateTotal();


        });
    }

}
// function addCartClicked(event){
//     var button = event.target;
//     var shopProduct = button.parentElement;
//     if(typeof(Storage) !== 'undefined'){
//         let item ={
//             id:i+1,
//             name:title,
//             price:price,
//             no:1
//         };
//         if(JSON.parse(localStorage.getItem(items)) === null){
//             localStorage.setItem("items",JSON.stringify(item));
//         }else{
//             alert('item is present');
//         }
//     var title = shopProduct.getElementsByClassName('feature-info')[0].innerText;
//     var price = shopProduct.getElementsByClassName('price-home')[0].innerText;
//     var productImage = shopProduct.getElementsByClassName('feature-img')[0].src;

//     }
//     addProductToCart(title,price,productImage);
//     updateTotal();
//     console.log(title);

// }

function addToLS(product) {
    addProductToCart(product);
    const products = getProductsFromLS();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

function getProductsFromLS() {
    const products = [];
    // console.log(JSON.parse(localStorage.getItem("products")));
    if (localStorage.getItem("products") !== null) {
        return JSON.parse(localStorage.getItem("products"));
    }

    return products;
}
function showAddedProductsLS() {
    const products = getProductsFromLS();
    products.forEach(product => {
        addProductToCart(product);
    });
}
function addProductToCart(product) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');




    var cartBoxContent = `
    <img src="${product.image}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${product.name}</div>
        <div class="cart-price">${product.price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove" ></i>`;
    cartShopBox.setAttribute("data-id", product.id);
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('click', quantityChanged);
}
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    const pid = buttonClicked.parentElement.getAttribute("data-id");
    const products = getProductsFromLS();
    products.forEach((element, i) => {
        if (pid === element.id) {
            console.log("Removed! Pid:".pid);
            buttonClicked.parentElement.remove();
            removeFromLS(pid);
        }
    });

    updateTotal()
}
function removeFromLS(pid) {
    const products = getProductsFromLS();
    const newProducts = [];
    products.forEach(product => {
        if (product.id !== pid) {
            newProducts.push(product);
        }
    });
    localStorage.setItem("products", JSON.stringify(newProducts));
}
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        total = total + (price * quantity);
        total = Math.round((total * 100) / 100)
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}