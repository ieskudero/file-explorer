export class API {
	constructor() {
	}
	
	async getFolderContent( folder ) {
		throw new Error( `Not implemented. Can't acces to ${ folder }` );
	}

	async getFile( file ) {
		throw new Error( `Not implemented. can't retrieve ${ file }` );
	}
}