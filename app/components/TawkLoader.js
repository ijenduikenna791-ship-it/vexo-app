"use client";
import { useEffect } from "react";

export default function TawkLoader() {
  useEffect(() => {
    let loaded = false;
    let timeoutId;

    function loadTawk() {
      if (loaded) return;
      loaded = true;
      cleanup();

      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      window.Tawk_API.onLoad = function () {
        window.Tawk_API.hideWidget();
      };

      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6ab64ed6e5015e344450a0af/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    }

    function cleanup() {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", loadTawk);
      window.removeEventListener("mousemove", loadTawk);
      window.removeEventListener("touchstart", loadTawk);
      window.removeEventListener("keydown", loadTawk);
      window.removeEventListener("click", loadTawk);
    }

    timeoutId = setTimeout(loadTawk, 3000);
    window.addEventListener("scroll", loadTawk, { once: true, passive: true });
    window.addEventListener("mousemove", loadTawk, { once: true });
    window.addEventListener("touchstart", loadTawk, { once: true, passive: true });
    window.addEventListener("keydown", loadTawk, { once: true });
    window.addEventListener("click", loadTawk, { once: true });

    return cleanup;
  }, []);

  return null;
}