import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { linkType, url, target, rel, download } = attributes;

	let finalHref = url;
	if (linkType === 'email') finalHref = `mailto:${url}`;
	else if (linkType === 'phone') finalHref = `tel:${url}`;

	const props = {
		href: finalHref,
		target: target || undefined,
		rel: rel || undefined,
		download: download || undefined,
	};

	return (
		<a {...useBlockProps.save()} {...props}>
			<InnerBlocks.Content />
		</a>
	);
}
