// 尝试查找页面中是否存在 .codecopy_tooltip 元素
var codecopy_tooltip = document.querySelector('.codecopy_tooltip');

// 如果页面中没有该元素，则动态创建一个
if (!codecopy_tooltip) {
    codecopy_tooltip = document.createElement('div');
    codecopy_tooltip.className = 'codecopy_tooltip'; // 设置类名
    codecopy_tooltip.style.position = 'absolute';   // 设置位置为绝对定位
    codecopy_tooltip.style.backgroundColor = '#000'; // 设置背景颜色
    codecopy_tooltip.style.color = '#fff';           // 设置文本颜色
    codecopy_tooltip.style.padding = '2px 6px';     // 设置内边距
    codecopy_tooltip.style.borderRadius = '3px';     // 设置圆角
    codecopy_tooltip.style.zIndex = '9999';          // 设置较高的层级，确保不会被遮挡
    codecopy_tooltip.style.display = 'none';          // 初始时隐藏
    codecopy_tooltip.style.fontSize = '0.9rem';        // 设置字体大小
    document.body.appendChild(codecopy_tooltip);     // 将其添加到页面中
}

// 获取元素的位置信息
function codecopy_get_element_position(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop - 30, left: rect.left + scrollLeft };
}

function codecopy_apply(element) {
    let isMouseDown = false;
    let startX, startY;

    // 鼠标按下时记录起始位置
    element.addEventListener("mousedown", function (event) {
        isMouseDown = true;
        startX = event.pageX;
        startY = event.pageY;
    });

    // 鼠标松开时执行复制逻辑
    element.addEventListener("mouseup", function (event) {
        let endX = event.pageX;
        let endY = event.pageY;

        let selection = window.getSelection().toString();

        // 如果是点击（没有选中任何文本），执行复制
        if (isMouseDown && (startX === endX && startY === endY)) {
            const textToCopy = selection.length > 0 ? selection : element.textContent;

            // 创建textarea并执行复制
            const el = document.createElement('textarea');
            el.value = textToCopy;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            codecopy_tooltip.innerHTML = '已复制';  // 提示复制成功
        }
        isMouseDown = false;
    });

    // 鼠标移入时显示tooltip
    element.addEventListener("mouseover", function (event) {
        var position = codecopy_get_element_position(element);
        codecopy_tooltip.innerHTML = '点击复制';  // 鼠标移入时的提示
        codecopy_tooltip.style.display = 'inline-block'; // 显示tooltip
        codecopy_tooltip.style.top = position.top + 'px'; // 设置tooltip的top位置
        codecopy_tooltip.style.left = position.left + 'px'; // 设置tooltip的left位置
    });

    // 鼠标移出时隐藏tooltip
    element.addEventListener("mouseout", function (event) {
        codecopy_tooltip.style.display = 'none'; // 鼠标移出时隐藏tooltip
    });
}

// 仅处理code标签
document.querySelectorAll("code").forEach(function (element) {
    codecopy_apply(element);
});
