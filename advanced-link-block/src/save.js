import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { linkType, url, target, rel, download, cursor, display } = attributes;

	const blockProps = useBlockProps.save({
		style: {
			cursor: cursor || 'pointer',
			display: display || 'block',
		},
		// You can also add a data-href here for fallback support
		'data-href': url,
		'data-download': download || undefined,
		'data-target': target || undefined,
		'data-rel': rel || undefined,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

