
const animations = ['bounceIn','bounceInLeft','bounceInRight','bounceInUp','flipInX','flipInY','lightSpeedIn']

function getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const randomAnimation = () => {
    return animations[getRandom(0,animations.length-1)]
}