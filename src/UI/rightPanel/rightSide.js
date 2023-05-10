import { ControlTemplate } from '../controlTemplate';
import html from './file.module.html';
import css from './file.module.css';
import { TYPES } from '../../types';

export class RightSide extends ControlTemplate {

	constructor( containerId, cache ) {
		super();
		this.containerId = containerId;
		this._cache = cache;
		this.selected = [];

		//OVERRIDE EVENTS. THIS METHODS ARE CALLBACKS THAT NEEEDS TO BE IMPLEMENTED
		this.folderDblClicked = async ( /* folder */ ) => { throw new Error( 'folderDblClicked not implemented' ); };
		this.fileDblClicked = async ( /* folder */ ) => { throw new Error( 'fileDblClicked not implemented' ); };
		
		//add folder css
		this._addStyle( 'rightFolderExplorer', css );
	}

	init( folder ) {
		if( !this.container ) {
			this.container = document.getElementById( this.containerId );

			if( !this.container ) throw new Error( 'Container not found' );

			this.container.addEventListener( 'click', async ( e ) => {
				if ( document.elementFromPoint( e.clientX, e.clientY ) === this.container )
					await this._elementClick( e );
			} );
		}

		//clean previous container content
		this._clearContent();

		this._mainFolder = folder;

		this._init( this.container, this._mainFolder );
	}

	_init( parent, folder ) {

		const content = folder.children;

		if( !content ) return;

		//add .. file
		if( folder.path.includes( '/' ) ) {
			const element = this._strToHTML( html );
			parent.appendChild( element );
			element.children[0].style.backgroundImage = 'url("/resources/icons/back.svg")';
			element.children[1].innerText =  ' .. ';
			element.dataset.path = folder.path.split( '/' ).slice( 0, -1 ).join( '/' );
			element.title = 'back';
			element.addEventListener( 'dblclick', async ( e ) => await this._elementDblClick( e ) );
		}

		//add files & folders
		Object.keys( content ).forEach( name => {
			
			const f = content[name];

			//add html per folder
			const element = this._strToHTML( html );
			parent.appendChild( element );

			//set icon
			const icon = f.type ===  TYPES.FOLDER ? 'folder_close.svg' : 'file.svg';
			element.children[0].style.backgroundImage = `url("/resources/icons/${ icon }")`;
			
			//set name
			element.children[1].innerText =  name;
			
			//set path
			element.dataset.path = f.path;

			//set seletable
			element.dataset.selectable = true;

			//set title
			element.title = name;
			
			//add click event
			element.addEventListener( 'click', async ( e ) => await this._elementClick( e ) );
			element.addEventListener( 'dblclick', async ( e ) => await this._elementDblClick( e ) );

			if( f.children ) this._init( element, f.children );
		} );
	}

	async _elementClick( e ) {
		this._manageSelection( e );
	}

	_manageSelection( e ) {
		
		if( !this.container || e.target === this.container ) {
			if( !this.contextMenu || !this.contextMenu.isOpen ) this._clearSelection();
			return;
		}

		//check if ctrl is pressed. If it is not, remove all selected files
		if( !e.ctrlKey ) this._clearSelection();

		//select file
		const fileHtml = this._getFirstSelectable( e.target );
		fileHtml.classList.add( 'selected' );

		//add to selected
		const selected = this._cache.getFolder( fileHtml.dataset.path );
		if( selected ) this.selected.push( selected );
	}

	_getFirstSelectable( element ) {
		if( !element ) return null;
		if( element.dataset.selectable === 'true' ) return element;
		else return this._getFirstSelectable( element.parentElement );
	}

	async _elementDblClick( e ) {
		
		const fileHtml = e.currentTarget;
		const path = fileHtml.dataset.path;
		const element = this._cache.getFolder( path );

		if( element.type === TYPES.FOLDER ) await this.folderDblClicked( element );
		else await this.fileDblClicked( element );
	}

	_clearContent() {
		this.container.innerHTML = '';
		this.selected.length = 0;
	}

	_clearSelection() {
		const files = document.querySelectorAll( '.rightFileExplorer' );
		files.forEach( f => f.classList.remove( 'selected' ) );
		this.selected.length = 0;
	}
}