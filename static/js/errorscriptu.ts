document.addEventListener('DOMContentLoaded', (event) => {
    const acceptBtn = document.getElementById('acceptBtn');
    const closeBtn = document.getElementById('closeBtn');
    const popup = document.getElementById('popup');

    if (acceptBtn && popup) {
        acceptBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
});
