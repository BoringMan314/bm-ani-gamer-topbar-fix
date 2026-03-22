(function () {
  "use strict";

  const REVEAL_CLASS = "ag-ani-theater-reveal-top";
  const HOOK_FLAG = "data-ag-theater-topbar";
  const OBS_FLAG = "data-ag-theater-dom";

  let rafId = 0;

  function isTheaterMode() {
    const vf = document.querySelector(".videoframe");
    return !!(vf && vf.classList.contains("vjs-fullwindow"));
  }

  function getVideo() {
    return (
      document.querySelector("#ani_video_html5_api") ||
      document.querySelector("video-js video") ||
      document.querySelector(".video-js video")
    );
  }

  function shouldRevealTopSky() {
    const topSky = document.querySelector(".top_sky");
    if (!topSky || !isTheaterMode()) return false;
    if (!topSky.classList.contains("fullwindow")) return false;

    const video = getVideo();
    if (!video) return false;

    return video.paused || video.ended;
  }

  function sync() {
    const topSky = document.querySelector(".top_sky");
    if (!topSky) return;
    topSky.classList.toggle(REVEAL_CLASS, shouldRevealTopSky());
  }

  function attachVideoListeners(video) {
    if (!video || video.getAttribute(HOOK_FLAG) === "1") return;
    video.setAttribute(HOOK_FLAG, "1");
    ["play", "playing", "pause", "ended", "emptied"].forEach((ev) => {
      video.addEventListener(ev, sync);
    });
  }

  function reconcile() {
    attachVideoListeners(getVideo());
    sync();
  }

  function scheduleReconcile() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      reconcile();
    });
  }

  function attachDomObservers() {
    if (document.documentElement.getAttribute(OBS_FLAG) === "1") return;
    document.documentElement.setAttribute(OBS_FLAG, "1");

    const mo = new MutationObserver(scheduleReconcile);
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  attachDomObservers();
  reconcile();
})();
