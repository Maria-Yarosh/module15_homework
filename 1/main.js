const btn = document.querySelector('.btn-change');
const iconPlace = document.querySelectorAll('.btn-icon');

btn.addEventListener('click', () => {
    iconPlace.forEach(iconPlace => {                   
       iconPlace.classList.toggle('inactive')
    })
})