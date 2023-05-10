import html from './contextMenu.module.html';
import css from './contextMenu.module.css';
import { ControlTemplate } from '../controlTemplate';
import { ContextMenuMethods } from './contextMenuMethods';

var eventsAdded = false;

export class ContextMenu extends ControlTemplate {

	constructor( panel ) {
		super();
		this.panel = panel;

		//assign context menu to panel
		this.panel.contextMenu = this;

		this.isOpen = false;
		this.container = document.getElementById( panel.containerId );
		
		if( !this.container ) throw new Error( 'Container not found' );

		this._addStyle( 'contextMenu', css );
		
		this.container.addEventListener( 'contextmenu', ( e ) => this._show( e ) );

		this._methods = new ContextMenuMethods( this );
	}

	_show( e ) {
		e.preventDefault();
		e.stopPropagation();

		if( !this.panel.container ) return;

		//hide previous context menu
		if( this._contextMenuHtml ) this._hide();

		//manage selection if no selected element
		this.panel._manageSelection( e );

		//show context menu
		this._contextMenuHtml = this._addHtml( this.container, html );

		//remove options
		if( this.container === e.target ) {
			const cut = this._contextMenuHtml.querySelector( '[data-action="cut"]' );
			const copy = this._contextMenuHtml.querySelector( '[data-action="copy"]' );
			const paste = this._contextMenuHtml.querySelector( '[data-action="paste"]' );
			const dlt = this._contextMenuHtml.querySelector( '[data-action="delete"]' );
			const rename = this._contextMenuHtml.querySelector( '[data-action="rename"]' );
			const download = this._contextMenuHtml.querySelector( '[data-action="download"]' );
			const hbars = this._contextMenuHtml.querySelectorAll( '.hl' );
			cut.remove();
			copy.remove();
			paste.remove();
			dlt.remove();
			rename.remove();
			download.remove();
			hbars.forEach( hbar => hbar.remove() );		
		} else {
			const newFolder = this._contextMenuHtml.querySelector( '[data-action="newFolder"]' );
			const hbar1 = this._contextMenuHtml.querySelector( '#hbar1' );
			newFolder.remove();
			hbar1.remove();
		}

		this._moveToAttachPos( this._contextMenuHtml, e );

		this._addEvents();

		this.isOpen = true;
	}

	_moveToAttachPos( element, e ) {
		
		element.style.left = `${ e.clientX }px`;
		element.style.top = `${ e.clientY }px`;
	}

	_getElementAbsolutePos( element ) {
		var res = new Object();
		res.x = 0; res.y = 0;
		if ( element !== null && element.getBoundingClientRect ) {
			var viewportElement = document.documentElement;  
			var box = element.getBoundingClientRect();
			var scrollLeft = viewportElement.scrollLeft;
			var scrollTop = viewportElement.scrollTop;

			res.x = box.right + scrollLeft;
			res.y = box.bottom + scrollTop;
		}
		return res;
	}

	_addEvents() {
		if( !eventsAdded ) {
			//close context menu if user press escape key or when user clicks outside context menu
			document.addEventListener( 'keydown', ( e ) => {
				if( e.key === 'Escape' ) this._hide();
			} );
			document.addEventListener( 'click', ( e ) => {
				if( e.target !== this._contextMenuHtml ) this._hide();
			} );
			eventsAdded = true;
		}

		//add events to context menu
		const items = this._contextMenuHtml.querySelectorAll( '.contextMenuItem' );
		items.forEach( item => {
			item.addEventListener( 'click', async ( e ) => {
				this._hide();
				await this._itemClicked( e );
			} );
		} );
	}

	_hide() {
		if( this._contextMenuHtml ) {
			this._contextMenuHtml.remove();
			this._contextMenuHtml = null;
		}

		this.isOpen = false;
	}

	async _itemClicked( e ) {
		e.stopPropagation();
		const action = e.currentTarget.dataset.action;
		switch ( action ) {
			case 'newFolder': await this._methods.newFolder( e ); break;
			case 'cut': await this._methods.cut( e ); break;
			case 'copy': await this._methods.copy( e ); break;
			case 'paste': await this._methods.paste( e ); break;
			case 'delete': await this._methods.delete( e ); break;
			case 'rename': await this._methods.rename( e ); break;
			case 'download': await this._methods.download( e ); break;
			case 'upload': await this._methods.upload( e ); break;
			default: break;
		}
	}
}