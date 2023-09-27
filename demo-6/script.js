import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

// 保存最后一次点击事件
let lastClick;
addEventListener('click', (event) => (lastClick = event));

onLinkNavigate(async ({ toPath }) => {
    // 为不支持此 API 的浏览器提供回退方案：
    if (!document.startViewTransition) {
        updateTheDOMSomehow(data);
        return;
    }
    const content = await getPageContent(toPath);

    // 获取点击位置，或者回退到屏幕中间
    const x = lastClick?.clientX ?? innerWidth / 2;
    const y = lastClick?.clientY ?? innerHeight / 2;
    // 获取到最远角的距离
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );
    // 开始一次视图过渡：
    const transition = transitionHelper({
        updateDOM() {
            document.body.innerHTML = content;
        },
    });
    // 等待伪元素创建完成：
    transition.ready.then(() => {
        // 新视图的根元素动画
        document.documentElement.animate(
            [
                { clipPath: `circle(0 at ${x}px ${y}px)` },
                { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
            ],
            {
                duration: 500,
                easing: 'ease-in',
                // 指定要附加动画的伪元素
                pseudoElement: '::view-transition-new(root)',
            },
        );
    });
});
