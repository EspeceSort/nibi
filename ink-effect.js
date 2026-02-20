export function playInkEffect(element) {
    const rect = element.getBoundingClientRect();
    const drop = document.createElement('div');

    drop.className = 'ink-drop';
    drop.style.left = `${rect.left + rect.width / 2}px`;
    drop.style.top = `${rect.top + rect.height / 2}px`;

    document.body.appendChild(drop);

    setTimeout(() => {
        drop.remove();
    }, 900);
}
