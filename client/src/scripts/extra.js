
const animations = ['bounceIn','bounceInLeft','bounceInRight','bounceInUp']

function getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const randomAnimation = () => {
    return animations[getRandom(0,animations.length-1)]
}

export const ToBottom = () => {
    let container = document.getElementById('msgs');
    container.scrollTo(0, container.scrollHeight-container.offsetHeight);
}