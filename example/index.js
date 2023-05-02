import { ApiTest } from './apiTest.js';
import { FileExplorer } from '../src/fileExplorer.js';

class Example {
	constructor() {
		this.api = new ApiTest();
		this.fileExplorer = new FileExplorer( this.api, 'fileExplorerContainer' );
	}

	async init() {
		await this.fileExplorer.init();
	}
}

const example = new Example();
example.init();
  






