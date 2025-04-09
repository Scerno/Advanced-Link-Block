import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ToggleControl, Notice } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const LINK_TYPES = ['url', 'email', 'phone', 'file', 'raw'];

const LINK_OPTIONS = {
	type: {
		label: 'Link Type',
		options: [
			{ label: 'URL', value: 'url' },
			{ label: 'E-mail', value: 'email' },
			{ label: 'Phone', value: 'phone' },
			{ label: 'File', value: 'file' },
			{ label: 'Raw', value: 'raw' },
		],
	},
	target: {
		label: 'Target',
		options: [
			{ label: 'Not Set', value: '' },
			{ label: 'New Tab (_blank)', value: '_blank' },
			{ label: 'Same Tab (_self)', value: '_self' },
		],
	},
	rel: {
		label: 'Rel Attribute',
		options: [
			{ label: 'None', value: '' },
			{ label: 'noopener', value: 'noopener' },
			{ label: 'noreferrer', value: 'noreferrer' },
			{ label: 'nofollow', value: 'nofollow' },
		],
	},
};

export default function Edit({ attributes, setAttributes }) {
	const { linkType, url, target, rel, download } = attributes;

	const showWarning = linkType !== 'url' && download;

	const isDisabled = (option) => {
		if (linkType === 'email' && option === 'download') return true;
		if (linkType === 'phone' && option === 'download') return true;
		return false;
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Link Settings">
					<SelectControl
						label={LINK_OPTIONS.type.label}
						value={linkType}
						options={LINK_OPTIONS.type.options}
						onChange={(val) => setAttributes({ linkType: val })}
					/>

					<TextControl
						label="Link Value"
						value={url}
						onChange={(val) => setAttributes({ url: val })}
						placeholder={linkType === 'email' ? 'you@example.com' : linkType === 'phone' ? '+123456789' : 'https://example.com'}
					/>

					<SelectControl
						label={LINK_OPTIONS.target.label}
						value={target}
						options={LINK_OPTIONS.target.options}
						onChange={(val) => setAttributes({ target: val })}
					/>

					<SelectControl
						label={LINK_OPTIONS.rel.label}
						value={rel}
						options={LINK_OPTIONS.rel.options}
						onChange={(val) => setAttributes({ rel: val })}
					/>

					<ToggleControl
						label="Force Download"
						checked={download}
						disabled={isDisabled('download')}
						onChange={(val) => setAttributes({ download: val })}
					/>

					{showWarning && (
						<Notice status="warning" isDismissible={false}>
							Download is not typically valid for this link type.
						</Notice>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<InnerBlocks />
			</div>
		</Fragment>
	);
}
