export class ContextMenuMethods {
	constructor( contextMenu ) {
		this._contextMenu = contextMenu;
	}
	
	async newFolder( /* e */ ) { new Error( 'Method not implemented' ); }
	async cut( /* e */ ) { new Error( 'Method not implemented' ); }
	async copy( /* e */ ) { new Error( 'Method not implemented' ); }
	async paste( /* e */ ) { new Error( 'Method not implemented' ); }
	async delete( /* e */ ) { new Error( 'Method not implemented' ); }
	async rename( /* e */ ) { new Error( 'Method not implemented' ); }
	async download( /* e */ ) {
		
		const selected = this._contextMenu.panel.selected;
		if( selected.length === 0 ) return;

		console.log( selected );

	}
	async upload( /* e */ ) { new Error( 'Method not implemented' ); }
}