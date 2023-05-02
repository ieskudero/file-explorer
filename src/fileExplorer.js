import html from './UI/main.module.html';
import css from './UI/main.module.css';

import { ControlTemplate } from './UI/controlTemplate';
import { LeftSide } from './UI/leftPanel/leftSide';
import { RightSide } from './UI/rightPanel/rightSide';
import { Cache } from './cache';
import { Loading } from './UI/loading/loading';
import { ContextMenu } from './UI/contextMenu/contextMenu';
import { PathToolbar } from './UI/toolBar/pathToolbar';

export class FileExplorer extends ControlTemplate {

	constructor( api, containerId ) {
		super();
		this.api = api;
		this.containerId = containerId;
	}

	async init() {
		this.container = document.getElementById( this.containerId );

		if( !this.container ) throw new Error( 'Container not found' );

		this.container.innerHTML = '';

		//load styles
		this._addStyle( 'fileExplorer', css );

		//load html
		this._addHtml( this.container, html );

		//we get main folder with no folder parent
		Loading.show( 'Loading folders...' );

		this._mainFolder = await this.api.getFolderContent( '' );
		this._cache = new Cache( this._mainFolder );

		await this._initLeftSide();
		await this._initRightSide();

		await this._initToolbar();

		Loading.hide();
	}

	async _initLeftSide() {

		//we show left list  with this folders
		const containerId = 'leftExplorerSide';
		this._leftSide = new LeftSide( containerId, this._cache );
		this._leftSide.folderClicked = async ( folder ) => await this._leftFolderClicked( folder );
		this._leftSide.init( this._mainFolder );
	}

	async _initRightSide() {

		//we show left list  with this folders
		const containerId = 'rightExplorerSide';
		this._rightSide = new RightSide( containerId, this._cache );
		this._rightSide.folderClicked = async ( folder ) => await this._rightFolderClicked( folder );
		this._rightSide.fileClicked = async ( folder ) => await this._rightFileClicked( folder );

		//add ContextMenu
		this._initContextMenu( this._rightSide );
	}

	async _initContextMenu( panel ) {
		
		this._contextMenu = new ContextMenu( panel );

	}

	async _initToolbar() {
		this._toolBar = new PathToolbar( 'pathToolBar' );
		this._toolBar.pathClick = async ( path ) => await this._pathClicked( path );
	}

	async _pathClicked( path ) {
		
		Loading.show( 'Loading folders...' );

		const content = await this.api.getFolderContent( path );

		const f = this._cache.setContent( path, content );

		this._showFolderContent( f );
		
		Loading.hide();
	}

	async _leftFolderClicked( folder ) {
		
		Loading.show( 'Loading folders...' );

		const content = await this.api.getFolderContent( folder.path );
		if( !content ) return;
		
		const f = this._cache.setContent( folder.path, content );

		this._showFolderContent( f );

		Loading.hide();
	}

	_showFolderContent( folder ) {

		this.selected = folder;
		this._rightSide.init( folder );

		this._toolBar.show( folder.path );
	}

	async _rightFolderClicked( folder ) {
		
		Loading.show( 'Loading folders...' );

		const content = await this.api.getFolderContent( folder.path );
		if( !content ) return;
		
		folder.children = content;

		this._showFolderContent( folder );
		
		Loading.hide();
	}

	async _rightFileClicked( file ) {
		//TODO: download file
	}

}