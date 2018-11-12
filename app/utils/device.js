const ua = window.navigator.userAgent
const dpr = window.devicePixelRatio
const w = window.screen.width
const h = window.screen.height
// iPhone X、iPhone XS
const isIPhoneX = /iphone/gi.test(ua) && dpr && dpr === 3 && w === 375 && h === 812
// iPhone XS Max
const isIPhoneXSMax = /iphone/gi.test(ua) && dpr && dpr === 3 && w === 414 && h === 896
// iPhone XR
const isIPhoneXR = /iphone/gi.test(ua) && dpr && dpr === 2 && w === 414 && h === 896

const needSafe = isIPhoneX || isIPhoneXSMax || isIPhoneXR

export const safeHeight = needSafe ? 45 : 0

export const screenHeight = window.innerHeight - safeHeight

export const screenWidth = window.innerWidth
