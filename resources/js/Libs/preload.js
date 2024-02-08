const html = document.querySelector("html").classList;

setTimeout(() => {
    html.remove("nprogress-busy");
}, 500);

setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.remove();
}, 1000);
