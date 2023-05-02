import { ControlTemplate } from '../controlTemplate';
import css from './loading.module.css';

export class Loading {


	static _alreadyLoading = false;

	static show( str = '' ) {
		if ( Loading._alreadyLoading ) return;
        
		//append css
		Loading._alreadyLoading = true;
		Loading._addStyle( 'loading', css );
        
		//append html
		const container = document.createElement( 'div' );
		container.id = 'loadingContainer';
		
		const subcontainer = document.createElement( 'div' );
		subcontainer.classList.add( 'loading' );
		subcontainer.appendChild( document.createElement( 'div' ) );
		subcontainer.appendChild( document.createElement( 'div' ) );
		subcontainer.appendChild( document.createElement( 'div' ) );
		subcontainer.appendChild( document.createElement( 'div' ) );
		container.appendChild( subcontainer );

		if ( str ) {
			const text = document.createElement( 'div' );
			text.classList.add( 'loadingText' );
			text.innerText = str;
			container.appendChild( text );
		}

		document.body.prepend( container );
	}

	static hide() {

		if ( !Loading._alreadyLoading ) return;

		//remove style
		this._removeStyle( 'loading' );

		//remove html
		document.querySelector( '#loadingContainer' ).remove();
        
		Loading._alreadyLoading = false;
	}

	static _addStyle( id, css ) {
        
		let text = css instanceof Array ? css[0][3].sourcesContent[0] : css;

		//remove other same style
		this._removeStyle( id );
        
		//add new
		let styleSheet = document.createElement( 'style' );
		styleSheet.id = id;
		styleSheet.type = 'text/css';
		styleSheet.innerText = text;

		document.head.appendChild( styleSheet );
	}

	static _removeStyle( id ) {
		let old = document.head.querySelector( '#' + id );
		if( old ) old.parentNode.removeChild( old );
	}
}