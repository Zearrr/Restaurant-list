// เก็บข้อมูลสินค้าที่ถูกเลือกในตะกร้า
const cart = [];

// ฟังก์ชันแสดงเมนูตามหมวดหมู่
function showMenu(category) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    document.getElementById(category).classList.add('active');
    
    document.querySelectorAll('.category').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="showMenu('${category}')"]`).classList.add('active');
}

// ฟังก์ชันเพิ่มจำนวน
function increment(btn) {
    const quantitySpan = btn.previousElementSibling;
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
}

// ฟังก์ชันลดจำนวน
function decrement(btn) {
    const quantitySpan = btn.nextElementSibling;
    const currentValue = parseInt(quantitySpan.textContent);
    if (currentValue > 1) quantitySpan.textContent = currentValue - 1;
}

// ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
function addToCart(btn) {
    const menuItem = btn.closest('.menu-item');
    const itemName = menuItem.querySelector('h3').textContent;
    const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('฿', '').trim());
    const itemQuantity = parseInt(menuItem.querySelector('.quantity').textContent);

    // ตรวจสอบว่าในตระกร้ามีสินค้านี้อยู่แล้วหรือไม่
    let itemInCart = cart.find(item => item.name === itemName);

    if (itemInCart) {
        itemInCart.quantity += itemQuantity; // เพิ่มจำนวนถ้ามีสินค้าในตะกร้าอยู่แล้ว
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
    }

    // อัปเดตหน้าตระกร้า
    updateCart();
}

// ฟังก์ชันอัปเดตตะกร้า
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // เคลียร์รายการสินค้าในตะกร้า
    
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ฿${(item.price * item.quantity).toFixed(2)} (${item.quantity} ชิ้น)`;
        cartItemsContainer.appendChild(listItem);
        total += item.price * item.quantity;
    });

    // อัปเดตยอดรวม
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}
