import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, ToggleControl, Notice } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

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

// show unique behaviour message depending on chosen method
const BEHAVIOUR_MSG = {
	default: 'Default currently maps to Auto. More advanced logic coming soon.',
	auto   : 'Auto will analyse the block contents and pick the safest native mode.',
	js     : 'JS simulation works everywhere but middle / right click are only emulated.',
	wrap   : 'HTML Anchor Injection gives perfect native behaviour, but will fall back if nested <a> or <button> elements are detected.',
	float  : 'Floating anchor follows the mouse. Great native feel, minor performance cost; will fall back if interactive elements are found.',
};


export default function Edit({ attributes, setAttributes }) {
	const { linkType, url, target, rel, download, cursor, display, behaviour } = attributes;

	const showWarning = linkType !== 'url' && download;

	const isDisabled = (option) => {
		if (linkType === 'email' && option === 'download') return true;
		if (linkType === 'phone' && option === 'download') return true;
		return false;
	};
	
	const blockProps = useBlockProps({
		style: {
			cursor: cursor || 'pointer',
			display: display || 'block',
		},
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Behaviour" initialOpen={true}>
					<SelectControl
						label="Link Behaviour"
						value={behaviour}
						options={[
							{ label: 'Default (auto)', value: 'default' },
							{ label: 'Auto', value: 'auto' },
							{ label: 'JS Simulation', value: 'js' },
							{ label: 'HTML Anchor Injection', value: 'wrap' },
							{ label: 'Floating HTML Anchor', value: 'float' },
						]}
						onChange={(val) => setAttributes({ behaviour: val })}
					/>
					<Notice status="info" isDismissible={false}>
						{ BEHAVIOUR_MSG[ behaviour === 'default' ? 'default' : behaviour ] }
					</Notice>
				</PanelBody>
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
					
					{linkType === 'file' && (
						<PanelBody title="File Picker" initialOpen={true}>
							<MediaUpload
								onSelect={(media) => setAttributes({ url: media.url })}
								allowedTypes={['*']}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{attributes.url ? 'Replace File' : 'Select File'}
									</Button>
								)}
							/>
						</PanelBody>
					)}


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
				<PanelBody title="Style" initialOpen={false}>
					<SelectControl
						label="Display"
						value={display}
						options={[
							{ label: 'Block (default)', value: 'block' },
							{ label: 'Contents', value: 'contents' },
							{ label: 'Flex', value: 'flex' },
						]}
						onChange={(value) => setAttributes({ display: value })}
					/>
					<SelectControl
						label="Cursor"
						value={attributes.cursor}
						options={[
							{ label: 'Pointer (default)', value: 'pointer' },
							{ label: 'Crosshair', value: 'crosshair' },
							{ label: 'Grab', value: 'grab' },
							{ label: 'Default', value: 'default' },
							{ label: 'Text', value: 'text' },
							{ label: 'Wait', value: 'wait' },
						]}
						onChange={(value) => setAttributes({ cursor: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</Fragment>
	);
}
