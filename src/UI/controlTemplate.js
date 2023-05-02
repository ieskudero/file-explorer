export class ControlTemplate {
	constructor() {	}

	_addStyle( id, css ) {
        
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

	_removeStyle( id ) {
		let old = document.head.querySelector( '#' + id );
		if( old ) old.parentNode.removeChild( old );
	}

	_addHtml( container, html ) {
       
		const element = this._strToHTML( html );
		//template
		container.appendChild( element );

		return element;
	}

	_strToHTML( str ) {
		var template = document.createElement( 'template' );
		str = str.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = str;
		return template.content.firstChild;
	}
}