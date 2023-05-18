import { ApiTest } from './apiTest.js';
import { FolderExplorer } from '../src/folderExplorer.js';

class Example {
	constructor() {
		this.api = new ApiTest();
		this.FolderExplorer = new FolderExplorer( this.api, 'folderExplorerContainer' );
	}

	async init() {
		await this.FolderExplorer.init();
	}
}

const example = new Example();
example.init();
  






