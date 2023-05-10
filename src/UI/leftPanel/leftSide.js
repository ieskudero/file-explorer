import { ControlTemplate } from '../controlTemplate';
import html from './folder.module.html';
import css from './folder.module.css';

export class LeftSide extends ControlTemplate {

	constructor( containerId, cache ) {
		super();
		this.containerId = containerId;
		this._cache = cache;

		//OVERRIDE EVENTS. THIS METHODS ARE CALLBACKS THAT NEEEDS TO BE IMPLEMENTED
		this.folderClicked = async ( /* folder */ ) => { throw new Error( 'folderClicked not implemented' ); };
	}

	init( folder ) {
		this.container = document.getElementById( this.containerId );

		if( !this.container ) throw new Error( 'Container not found' );

		this.container.innerHTML = '';

		this._mainFolder = folder;

		//add folder css
		this._addStyle( 'leftFolderExplorer', css );

		this._addFolder( this.container, this._mainFolder );
	}

	_addFolder( parent, folder ) {

		Object.keys( folder ).forEach( name => {
			
			const f = folder[name];

			//add html per folder
			const element = this._strToHTML( html );
			parent.appendChild( element );

			//set name
			element.children[1].innerText = name;
			
			//set path
			element.dataset.path = f.path;
			
			//add click event
			element.addEventListener( 'click', async ( e ) => await this._folderClick( e ) );

			if( f.children ) this._addFolder( element, f.children );
		} );
	}

	async _folderClick( e ) {
		
		const folderHtml = e.currentTarget;

		this._toggleFolder( folderHtml );

		const path = folderHtml.dataset.path;
		const folder = this._cache.getFolder( path );

		await this.folderClicked( folder );
	}

	_toggleFolder( folderHtml ) {

		const folders = document.querySelectorAll( '.leftFolderExplorer' );
		
		//open-close icon
		folders.forEach( f => f.children[0].style.backgroundImage = 'url("/resources/icons/folder_close.svg")' );
		folderHtml.children[0].style.backgroundImage = 'url("/resources/icons/folder_open.svg")';

		//selected
		folders.forEach( f => f.classList.remove( 'leftSelected' ) );
		folderHtml.classList.add( 'leftSelected' );
	}
}