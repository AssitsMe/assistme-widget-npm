(function() {
    "use strict";
    const l = "responsiveIframe",
        i = "450px",
        n = "720px",
        u = "135px",
        h = "145px";

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

        let iframeId = document.getElementById('responsiveIframe');

        if (iframeId) return null;

        var e = document.createElement("iframe");
        e.id = l, e.src = d, e.style.position = "fixed", e.style.zIndex = "100", e.style.overflow = "hidden", e.style.bottom = "0", e.style.right = "0", e.style.border = "none", e.style.borderRadius = "10px", e.style.width = u, e.style.height = h, e.setAttribute("allow", "microphone"), document.body.appendChild(e);

        function handleMessage(event) {
            if(event.data && event.data.type === "toggleWidget") {
                if (event.data.payload) {
                    e.style.width = i;
                    e.style.height = n;
                }
            }

            if (event.data && event.data.type === "chatbotStateChange") {
                if (event.data.isClosed) {
                    e.style.width = u;
                    e.style.height = h;
                } else {
                    e.style.width = i;
                    e.style.height = n;
                }
            }
        }

        window.addEventListener("message", handleMessage);


        return function() {
            window.removeEventListener("message", handleMessage);
            setTimeout(() => document.body.removeChild(e))
        }
    }
    m()
})();