/** 
 * @module folder-explorer
 * @description Folder Explorer with User Interface. To use it some methods must be implemented to load files and to get folder content.
*/

import { FolderExplorer } from './src/folderExplorer';
import { API } from './src/api';

/**
 * @property {class} FolderExplorer Main object
 * @property {class} API API class to be extended
 */
export {
	FolderExplorer,
	API
};