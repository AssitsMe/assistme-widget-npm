(function() {
    "use strict";
    const l = "responsiveIframe",
        i = "100vw",
        n = "800px",
        u = "800px",
        h = "800px";


    function m() {
        for (var s = document.getElementsByTagName("script"), o = null, r = 0; r < s.length; r++)
            if (s[r].src.includes("embedded.js")) {
                o = s[r];
                break
            } if (!o) {
            console.error("Current script not found.");
            return
        }
        var d = o.getAttribute("data-agent-url");
        if (!d) {
            console.error('Data attribute "data-agent-url" not found in the script tag.');
            return
        }
        var e = document.createElement("iframe");
        e.id = l, e.src = d, e.style.position = "fixed", e.style.zIndex = "100", e.style.overflow = "hidden", e.style.bottom = "0", e.style.right = "0", e.style.border = "none", e.style.borderRadius = "10px", e.style.width = i, e.style.height = n, e.setAttribute("allow", "microphone"), document.body.appendChild(e);

        function c(a) {
            var t = document.getElementById(l);
            t && a.data.type === "chatbotStateChange" && (a.data.isClosed ? setTimeout(() => {
                t.style.width = i, t.style.height = n
            }, 300) : window.innerWidth < 1e3 ? (t.style.width = i, t.style.height = n) : (t.style.width = u, t.style.height = h))
        }
        return window.addEventListener("message", c),
            function() {
                window.removeEventListener("message", c), document.body.removeChild(e)
            }
    }
    m()
})();