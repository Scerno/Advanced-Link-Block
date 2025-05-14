import Edit from './edit';
import save from './save';
import './editor.scss';
import './style.scss';

import { registerBlockType } from '@wordpress/blocks';
import metadata from '../blocks/advanced-link/block.json';

/* src/index.js (top of file) */
import schemaUrl from './config/albSchema.json?url';

/* mark it as “used” so Webpack keeps the asset */
export const __albSchemaAsset = schemaUrl;

/* optional – proves it’s a string like `/build/albSchema.json` */
console.info('ALB schema emitted at:', schemaUrl);

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save,
});
