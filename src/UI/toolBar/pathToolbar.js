export class PathToolbar {

	constructor( containerId ) {
		this._container = document.getElementById( containerId );

		//OVERRIDE EVENT
		this.pathClick = async () => new Error( 'PathToolbar: pathClick event not implemented' );
	}

	show( path ) {
		if ( !this._container ) return;

		this._container.innerHTML = '';

		const paths = path.replaceAll( '\\','/' ).split( '/' );
		let temp = '';
		for ( let i = 0; i < paths.length; i++ ) {
			const element = paths[i];			
			temp += element;

			const pathElement = document.createElement( 'div' );
			pathElement.innerText = element;
			pathElement.dataset.path = temp;
			pathElement.style.cursor = 'pointer';
			pathElement.addEventListener( 'click', async ( e ) => await this.pathClick( e.target.dataset.path ) );
			this._container.appendChild( pathElement );

			if( i < paths.length - 1 ) {
				const separator = document.createElement( 'div' );
				separator.innerText = '>';
				separator.style.marginLeft = '5px';
				separator.style.marginRight = '5px';
				this._container.appendChild( separator );
				temp += '/';
			}
		}
	}
}