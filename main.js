/** 
 * @module file-explorer
 * @description File Explorer with User Interface. To use it some methods must be implemented to load files and to get the file content.
*/

import { FileExplorer } from './src/fileExplorer';
import { API } from './src/api';

/**
 * @property {class} FileExplorer Main object
 * @property {class} API API class to be extended
 */
export {
	FileExplorer,
	API
};