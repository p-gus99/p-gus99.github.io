const bubbles = document.querySelectorAll('.bubble');
const steps = document.querySelectorAll('.form-step');
const container = document.querySelector('.steps-container');
const stepForm = document.querySelector('.step-form');

const animateContainer = (xOffset) => {
    container.style.transition = '';
    const sign = xOffset < 0 ? '-' : '';
    container.style.left = `calc(${sign}100% + ${xOffset}px)`;

    setTimeout(() => {
        container.style.transition = 'left .5s ease';
        container.style.left = '50%';
    }, 100);
}

const getStepDirection = (from, to) => {
    const diff = parseInt(to.getAttribute('data-step')) - parseInt(from.getAttribute('data-step'));
    return diff != 0 ? diff / Math.abs(diff) : diff;
}

const slide = (from, to) => {
    animateContainer(getStepDirection(from, to) * window.innerWidth);
    [...steps].forEach(step => step.classList.remove('active'));
    to.classList.toggle('active', true);
    [...bubbles].forEach(bubble => bubble.classList.remove('active'));
    document.querySelector(`[data-target-step="${to.getAttribute('data-step')}"]`).classList.toggle('active', true);
}

const stepMove = (offset) => {
    const from = document.querySelector('.form-step.active');
    const to = document.querySelector(`[data-step="${parseInt(from.getAttribute('data-step')) + offset}"]`);
    slide(from, to);
}

stepForm.addEventListener('submit', (e) => {
    if(document.querySelector('.form-step.active').getAttribute('data-action') !== 'submit') {
        e.preventDefault();
    }
});

stepForm.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 && document.querySelector('.form-step.active').getAttribute('data-action') !== 'submit')
        stepMove(1);
});

[...bubbles].forEach(bubble => {
    bubble.addEventListener('click', (e) => {
        const from = document.querySelector('.form-step.active');
        const to = document.querySelector(`[data-step="${e.target.getAttribute('data-target-step')}"]`);
        slide(from, to);
    })
});

[...document.querySelectorAll('.next-step-btn')].forEach(btn => btn.addEventListener('click', () => stepMove(1)));
[...document.querySelectorAll('.prev-step-btn')].forEach(btn => btn.addEventListener('click', () => stepMove(-1)));