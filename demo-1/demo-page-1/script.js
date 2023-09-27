import { getPageContent, onLinkNavigate } from '../../utils.js';

onLinkNavigate(async ({ toPath }) => {
    const content = await getPageContent(toPath);

    startViewTransition(() => {
        document.body.innerHTML = content;
    });
});

function startViewTransition(callback) {
    if (!document.startViewTransition) {
        callback();
        return;
    }

    document.startViewTransition(callback);
}
