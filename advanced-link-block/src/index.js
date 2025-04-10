import Edit from './edit';
import save from './save';
import './editor.scss';
import './style.scss';

import { registerBlockType } from '@wordpress/blocks';
import metadata from '../blocks/advanced-link/block.json';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save,
});
