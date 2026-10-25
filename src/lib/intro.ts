export const INTRO_SESSION_KEY = "ec:intro:v3";

// Run before the first paint so returning visits never flash the intro overlay.
export const introBootstrap = `(()=>{try{const skip=location.hash||matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem(${JSON.stringify(INTRO_SESSION_KEY)})==='seen';document.documentElement.dataset.brandIntro=skip?'skip':'play'}catch{document.documentElement.dataset.brandIntro='skip'}})();`;
