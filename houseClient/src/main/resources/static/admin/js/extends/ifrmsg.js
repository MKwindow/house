layui.define(function (exports) {
    let isDOM = (typeof HTMLElement === 'object') ?
        function (obj) {
            return obj instanceof HTMLElement;
        } :
        function (obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };
    let obj = {
        parent_put: function (id, msg) {
            let iFrame;
            if (typeof id !== 'string') {
                iFrame = id;
            } else {
                iFrame = document.getElementById(id);
            }
            iFrame.onload = function () {
                iFrame.contentWindow.postMessage(msg, '*');
            }
        },
        parent_get: function (callback) {
            if (typeof callback === "function") {
                function receiveMessageFromIndex(event) {
                    callback(event.data);
                }
            }
            window.addEventListener("message", receiveMessageFromIndex, false);

        },
        child_get: function (callback) {
            if (typeof callback === "function") {
                function receiveMessageFromIndex(event) {
                    callback(event.data);
                }
            }
            window.addEventListener("message", receiveMessageFromIndex, false);
        },
        child_put: function (msgdata) {
            parent.postMessage({msg: msgdata}, '*');
        }
    };
    exports('ifrmsg', obj);
});