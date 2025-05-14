document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.wp-block-advanced-link-block-advanced-link').forEach(block => {
		const href = block.dataset.href;
		if (!href) return;

		block.style.cursor = block.style.cursor || 'pointer';

		block.addEventListener('click', (e) => {
			// Ignore clicks that happened inside already-linked elements (like buttons with their own href)
			if (e.target.closest('a') && e.target !== block) return;

			const isDownload = block.dataset.download !== undefined;
			const target = block.dataset.target || '_self';

			if (isDownload) {
				const link = document.createElement('a');
				link.href = href;
				link.download = '';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				window.open(href, target);
			}
		});
	});
});
