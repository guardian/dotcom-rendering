const body = document.querySelector("body");
const userAgent = navigator.userAgent || navigator.vendor;

if (/android/i.test(userAgent)) {
    body?.classList.add("android");
    body?.classList.remove("ios");
}