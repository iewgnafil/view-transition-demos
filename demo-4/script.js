import {
    getPageContent,
    onLinkNavigate,
    transitionHelper,
} from '../utils.js';

const demoPath = '/demo-4/';
const catsPath = `${demoPath}cats/`;

function getNavigationType(fromPath, toPath) {
    if (fromPath.startsWith(catsPath) && toPath === demoPath) {
        return 'cat-page-to-demo';
    }

    if (fromPath === demoPath && toPath.startsWith(catsPath)) {
        return 'demo-to-cat-page';
    }

    return 'other';
}

onLinkNavigate(async ({ fromPath, toPath }) => {
    const navigationType = getNavigationType(fromPath, toPath);
    const content = await getPageContent(toPath);
    let targetThumbnail;

    if (navigationType === 'demo-to-cat-page') {
        targetThumbnail = document.querySelector('img');
        targetThumbnail.style.viewTransitionName = 'banner-img';
    }

    const transition = transitionHelper({
        updateDOM() {
            document.body.innerHTML = content;
            if (navigationType === 'cat-page-to-demo') {
                targetThumbnail = document.querySelector('img');
                targetThumbnail.style.viewTransitionName = 'banner-img';
            }
        },
    });

    transition.finished.finally(() => {
        if (targetThumbnail) targetThumbnail.style.viewTransitionName = '';
    });
});
