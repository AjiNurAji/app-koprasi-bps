const html = document.querySelector("html").classList;

setTimeout(() => {
    html.remove("nprogress-busy");
}, 500);
