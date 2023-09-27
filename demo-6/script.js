import { getPageContent, onLinkNavigate, transitionHelper } from '../utils.js';

let lastClick;
addEventListener('click', (event) => (lastClick = event));

onLinkNavigate(async ({ toPath }) => {
    const content = await getPageContent(toPath);

    const x = lastClick?.clientX ?? innerWidth / 2;
    const y = lastClick?.clientY ?? innerHeight / 2;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );

    const transition = transitionHelper({
        updateDOM() {
            document.body.innerHTML = content;
        },
    });

    transition.ready.then(() => {
        document.documentElement.animate(
            [
                { clipPath: `circle(0 at ${x}px ${y}px)` },
                { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
            ],
            {
                duration: 500,
                easing: 'ease-in',
                pseudoElement: '::view-transition-new(root)',
            },
        );
    });
});
