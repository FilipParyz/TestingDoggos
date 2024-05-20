"use strict";
document.addEventListener('DOMContentLoaded', (event) => {
    const okBtn = document.getElementById('okBtn');
    const closeBtn = document.getElementById('closeBtn');
    const popup = document.getElementById('popup');
    if (okBtn && popup) {
        okBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
});
