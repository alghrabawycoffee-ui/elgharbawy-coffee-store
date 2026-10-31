// جلب السلة من ذاكرة المتصفح
function getCart() {
    let cart = localStorage.getItem('elgharbawy_cart');
    return cart ? JSON.parse(cart) : [];
}

// حفظ السلة
function saveCart(cart) {
    localStorage.setItem('elgharbawy_cart', JSON.stringify(cart));
    updateCartIcon();
}

// إضافة منتج للسلة
function addToCart(id, name, price, image, qty = 1) {
    let cart = getCart();
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += qty;
    } else {
        cart.push({ id, name, price: Number(price), image, quantity: qty });
    }
    
    saveCart(cart);
    showToast(`تم إضافة ${name} إلى السلة بنجاح!`);
}

// تحديث العداد اللي فوق أيقونة السلة
function updateCartIcon() {
    let cart = getCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartIcon = document.getElementById('cart-icon');
    
    if (cartIcon) {
        if (totalItems > 0) {
            cartIcon.setAttribute('data-count', totalItems);
        } else {
            cartIcon.removeAttribute('data-count');
        }
    }
}

// إظهار إشعار الإضافة
function showToast(message) {
    let toast = document.getElementById('toast');
    let toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.innerText = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}

// حذف منتج من السلة
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    if (typeof renderCartPage === "function") renderCartPage();
}

// تغيير الكمية في صفحة السلة
function changeQty(id, change) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart(cart);
        if (typeof renderCartPage === "function") renderCartPage();
    }
}

// تشغيل العداد أول ما أي صفحة تفتح
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});
