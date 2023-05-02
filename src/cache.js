export class Cache {
	constructor( folder ) {
		this._folder = folder;
	}

	setContent( path, content ) {
		const folder = this.getFolder( path );
		
		if( !folder ) return null;
		folder.children = content; 

		return folder;
	}

	getFolder( path, folder = this._folder ) {

		let result = null;

		if( !folder || typeof( folder ) !== 'object' ) return result;
		
		Object.keys( folder ).forEach( key => {
			
			if( result ) return;

			const value = folder[key];

			if( typeof value === 'object' ) {
				if( value.path === path ) result = value;
				else if( value.children ) {
					result = this.getFolder( path, value.children );
				}
			}
			
		} );

		return result;
	}

}