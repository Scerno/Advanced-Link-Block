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
/**
 * Advanced Link Block – front‑end behaviour controller
 *
 * Supports five behaviour modes stored on the wrapper element:
 *  default → alias of auto
 *  auto    → heuristically choose wrap ▸ float ▸ js
 *  js      → JS simulation only
 *  wrap    → inject real <a> wrapper (if safe)
 *  float   → tiny anchor following cursor (if safe)
 *
 * Fallback is always JS simulation.
 */
document.addEventListener('DOMContentLoaded', () => {
	const WRAPPER_SEL = '.wp-block-advanced-link-block-advanced-link';

	document.querySelectorAll(WRAPPER_SEL).forEach(block => {
		/* ------------------------------------------------------------------
		   Common data and helpers
		------------------------------------------------------------------ */
		const href      = block.dataset.href || '#';
		const target    = block.dataset.target || '';
		const rel       = block.dataset.rel || '';
		const isDownload = block.dataset.download !== undefined;
		const rawMode   = block.dataset.behaviour || 'default';
		const behaviour = rawMode === 'default' ? 'auto' : rawMode;
		
		/* Quick checker for nested anchors and buttons */
		const hasAnchorOrButton = !!block.querySelector(
			'a, button'
		);
		
		/* Quick checker for nested interactive stuff */
		const hasInteractive = !!block.querySelector(
			'a, button, input, select, textarea, canvas, [role="button"]'
		);

		/* ------------------------------------------------------------------
		   Mode helpers
		------------------------------------------------------------------ */

		/* 1)  JS Simulation (always bound as fallback) */
		function attachJSSim() {
			block.style.cursor = block.style.cursor || 'pointer';

			block.addEventListener('mousedown', (e) => {
				/* Bypass if inside native <a> or interactive input */
				if ((e.target.closest('a') && e.target !== block) ||
					e.target.closest('input,textarea,select')) return;

				/* Middle‑click opens background tab */
				if (e.button === 1) {
					window.open(href, '_blank');
					return;
				}

				/* Left‑click */
				if (e.button !== 0) return;
				if (isDownload) {
					const a = document.createElement('a');
					a.href = href; a.download = '';
					document.body.appendChild(a);
					a.click(); a.remove();
				} else {
					window.open(href, target || '_self');
				}
			});
		}

		/* 2)  Wrapper‑anchor injection  */
		function tryWrapAnchor() {
			if (hasAnchorOrButton) return false;              // skip if unsafe

			const a       = document.createElement('a');
			a.href        = href;
			if (target)   a.target = target;
			if (rel)      a.rel    = rel;
			if (isDownload) a.download = '';

			/* Preserve layout by copying display style */
			a.style.display = getComputedStyle(block).display;

			block.parentNode.replaceChild(a, block);
			a.appendChild(block);
			return true;
		}

		/* 3)  Floating tiny anchor under cursor */
		function tryFloatingAnchor() {
			if (hasInteractive) return false;   // avoid stealing clicks on inputs

			const hoverA = document.createElement('a');
			hoverA.href = href;
			if (target)   hoverA.target = target;
			if (rel)      hoverA.rel    = rel;
			if (isDownload) hoverA.download = '';
			Object.assign(hoverA.style,{
				position:'fixed',width:'1px',height:'1px',opacity:'0',
				pointerEvents:'auto',zIndex:9999
			});

			let active = false;
			const move = (e)=>{hoverA.style.left=e.clientX+'px';hoverA.style.top=e.clientY+'px';};

			function enter() {
				if (active) return;
				document.body.appendChild(hoverA);
				document.addEventListener('mousemove',move,{passive:true});
				active = true;
			}
			function leave() {
				if (!active) return;
				document.removeEventListener('mousemove',move);
				hoverA.remove();
				active = false;
			}
			block.addEventListener('mouseenter',enter);
			block.addEventListener('mouseleave',leave);
			return true;
		}

		/* ------------------------------------------------------------------
		   Mode selection
		------------------------------------------------------------------ */

		// Always attach JS simulation as last‑ditch fallback
		attachJSSim();

		switch (behaviour) {
			case 'wrap':
				if (!tryWrapAnchor()) {
					// invalid -> JS sim already present
				}
				break;

			case 'float':
				if (!tryFloatingAnchor()) {
					// invalid -> JS sim already present
				}
				break;

			case 'auto':
				if (tryWrapAnchor()) break;
				if (tryFloatingAnchor()) break;
				// else JS sim stays
				break;

			case 'js':
			default:
				// JS sim already active
				break;
		}
	});
});
