(function () {
  "use strict";

  const REVEAL_CLASS = "ag-ani-theater-reveal-top";
  const HOOK_FLAG = "data-ag-theater-topbar";
  const OBS_FLAG = "data-ag-theater-dom";
  /** 播畢時由本腳本移除 `fullwindow-unlock`，離開 ended 後須還原 */
  const ENDED_STRIP_UNLOCK_FLAG = "data-ag-ended-strip-unlock";
  /** 暫停時：游標 Y ≤ 此值視為「靠上」，才顯示頂欄（與 CSS 頂欄高度約略對齊） */
  const TOP_REVEAL_PX = 110;

  let rafId = 0;
  let mouseNearTop = false;
  let pointerHooksAttached = false;

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

    if (video.ended) return false;
    if (video.paused) return mouseNearTop;
    return false;
  }

  /**
   * 播畢：拿掉 `fullwindow-unlock`，頂欄回到與未開播時相同的排版（接在播放器上方），
   * 而非靠 translate 覆蓋在播放器上。非 ended 或離開劇院時還原 class。
   */
  function syncEndedFullwindowUnlock(topSky, video) {
    if (!topSky) return;

    if (
      !isTheaterMode() ||
      !topSky.classList.contains("fullwindow")
    ) {
      if (topSky.getAttribute(ENDED_STRIP_UNLOCK_FLAG) === "1") {
        topSky.classList.add("fullwindow-unlock");
        topSky.removeAttribute(ENDED_STRIP_UNLOCK_FLAG);
      }
      return;
    }

    if (video && video.ended) {
      if (topSky.classList.contains("fullwindow-unlock")) {
        topSky.classList.remove("fullwindow-unlock");
        topSky.setAttribute(ENDED_STRIP_UNLOCK_FLAG, "1");
      }
      return;
    }

    if (topSky.getAttribute(ENDED_STRIP_UNLOCK_FLAG) === "1") {
      topSky.classList.add("fullwindow-unlock");
      topSky.removeAttribute(ENDED_STRIP_UNLOCK_FLAG);
    }
  }

  function sync() {
    const topSky = document.querySelector(".top_sky");
    const video = getVideo();

    syncEndedFullwindowUnlock(topSky, video);

    if (video && !video.paused && !video.ended) {
      mouseNearTop = false;
    }
    if (
      !topSky ||
      !isTheaterMode() ||
      !topSky.classList.contains("fullwindow")
    ) {
      mouseNearTop = false;
    }

    if (!topSky) return;
    topSky.classList.toggle(REVEAL_CLASS, shouldRevealTopSky());
  }

  function onDocumentMouseMove(e) {
    const topSky = document.querySelector(".top_sky");
    if (!topSky || !isTheaterMode()) return;
    if (!topSky.classList.contains("fullwindow")) return;

    const video = getVideo();
    if (!video || video.ended || !video.paused) return;

    const near = e.clientY <= TOP_REVEAL_PX;
    if (near !== mouseNearTop) {
      mouseNearTop = near;
      sync();
    }
  }

  function onDocumentMouseLeave() {
    if (!mouseNearTop) return;
    mouseNearTop = false;
    sync();
  }

  function attachPointerListeners() {
    if (pointerHooksAttached) return;
    pointerHooksAttached = true;
    document.addEventListener("mousemove", onDocumentMouseMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "mouseleave",
      onDocumentMouseLeave
    );
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

  attachPointerListeners();
  attachDomObservers();
  reconcile();
})();
