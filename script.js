let cart = [];

// ฟังก์ชันแสดงเมนูตามหมวดหมู่
function showMenu(category) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    document.getElementById(category).classList.add('active');
    
    document.querySelectorAll('.category').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="showMenu('${category}')"]`).classList.add('active');
}

// ฟังก์ชันเพิ่มจำนวน
function increment(button) {
    const quantityElement = button.previousElementSibling;
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
}

// ฟังก์ชันลดจำนวน
function decrement(button) {
    const quantityElement = button.nextElementSibling;
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    }
}

// ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
function addToCart(button) {
    const menuItem = button.closest('.menu-item');
    const name = menuItem.querySelector('h3').textContent.trim();
    const price = parseFloat(menuItem.querySelector('.price').textContent.replace('฿', '').trim());
    const quantity = parseInt(menuItem.querySelector('.quantity').textContent);
    const image = menuItem.querySelector('img').src; // ดึง URL ของรูปภาพ

    // ตรวจสอบว่ามีสินค้าในตะกร้าอยู่แล้วหรือไม่
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity; // ถ้ามีอยู่แล้วเพิ่มจำนวน
    } else {
        cart.push({ name, price, quantity, image }); // ถ้ายังไม่มีให้เพิ่มเข้าไป
    }

    updateCart();
}

// ฟังก์ชันอัปเดตตะกร้า
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // ล้างข้อมูลเดิมก่อนแสดงผลใหม่
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"> <!-- รูปภาพสินค้า -->
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>฿${item.price} x ${item.quantity} = ฿${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})">ลบ</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById("cart-total").textContent = `฿${total.toFixed(2)}`;
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1); // ลบสินค้าตามตำแหน่งในอาร์เรย์
    updateCart(); // อัปเดตตะกร้าใหม่
}

// ฟังก์ชันล้างตะกร้าสินค้า
function clearCart() {
    cart = [];
    updateCart();
}

// ฟังก์ชันชำระเงิน
function checkout() {
    if (cart.length === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
    } else {
        alert("ชำระเงินเรียบร้อยแล้ว!");
        clearCart();
    }
}

// ฟังก์ชันเปิด/ปิดหน้าตะกร้า
function toggleCart() {
    const cartWindow = document.getElementById("cart-window");
    cartWindow.style.display = cartWindow.style.display === "block" ? "none" : "block";
}
