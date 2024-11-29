// 四大功能，文本复制排除 pre 标签，单独可以复制
(function () {
    function isPreTag(element) {
        while (element) {
            if (element.tagName && element.tagName.toUpperCase() === "PRE") {
                return true; // 存在祖先是 pre 标签
            }
            element = element.parentElement; // 检查父节点
        }
        return false; // 不在 pre 标签内
    }

    // 禁用右键菜单
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // 禁用文本选择
    document.addEventListener('selectstart', (event) => {
        if (!isPreTag(event.target)) {
            const target = event.target;
            if (
                target.tagName.toUpperCase() !== 'INPUT' &&
                target.tagName.toUpperCase() !== 'TEXTAREA' &&
                target.tagName.toUpperCase() !== 'PASSWORD' &&
                target.tagName.toUpperCase() !== 'SELECT'
            ) {
                event.preventDefault();
            }
        }
    });

    // 针对旧版 Firefox 禁用文本选择
    document.addEventListener('mousedown', (event) => {
        if (!isPreTag(event.target)) {
            const target = event.target;
            if (
                target.tagName.toUpperCase() !== 'INPUT' &&
                target.tagName.toUpperCase() !== 'TEXTAREA' &&
                target.tagName.toUpperCase() !== 'PASSWORD' &&
                target.tagName.toUpperCase() !== 'SELECT'
            ) {
                event.preventDefault();
            }
        }
    });

    // 禁用 iframe 嵌套
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // 禁用拖拽操作
    document.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
})();
