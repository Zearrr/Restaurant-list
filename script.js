function showMenu(category) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    document.getElementById(category).classList.add('active');
    
    document.querySelectorAll('.category').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="showMenu('${category}')"]`).classList.add('active');
}

function increment(btn) {
    const quantitySpan = btn.previousElementSibling;
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
}

function decrement(btn) {
    const quantitySpan = btn.nextElementSibling;
    const currentValue = parseInt(quantitySpan.textContent);
    if (currentValue > 1) quantitySpan.textContent = currentValue - 1;
}
