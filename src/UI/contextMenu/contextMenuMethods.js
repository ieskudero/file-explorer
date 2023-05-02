export class ContextMenuMethods {
	constructor( contextMenu ) {
		this._contextMenu = contextMenu;
	}
	
	async newFile( /* e */ ) { new Error( 'Method not implemented' ); }
	async newFolder( /* e */ ) { new Error( 'Method not implemented' ); }
	async cut( /* e */ ) { new Error( 'Method not implemented' ); }
	async copy( /* e */ ) { new Error( 'Method not implemented' ); }
	async paste( /* e */ ) { new Error( 'Method not implemented' ); }
	async delete( /* e */ ) { new Error( 'Method not implemented' ); }
	async rename( /* e */ ) { new Error( 'Method not implemented' ); }
	async download( e ) {
		const path = e.target.dataset.path;
		console.log( e );
	}
	async upload( /* e */ ) { new Error( 'Method not implemented' ); }
}