import { API } from '../src/api';
import { TYPES } from '../src/types';

export class ApiTest extends API {
	constructor() {
		super();
	}

	async getFolderContent( folder ) {
		switch ( folder ) {
			case '': return this._mainFolders();
			case 'materials': return this._materialFolder();
			case 'materials/submaterials': return this._subMaterialFolder();
			case 'documents': return this._documentFolder();
			case 'generated': return this._generatedFolder();
			case 'images': return this._imageFolder();
			case 'models': return this._modelFolder();
			case 'products': return this._productFolder();
			case 'rules': return this._ruleFolder();
			default: return {};
		}
	}

	async getFile( file ) {
		if( !file ) return;
		if( file.type !== TYPES.FILE ) return;

		//return Blob
		return new Blob( [ file.path ], { type: 'text/plain' } );
	}

	_mainFolders() {
		return {
			'materials': {
				type: TYPES.FOLDER,
				path: 'materials'
			},
			'documents': {
				type: TYPES.FOLDER,
				path: 'documents'
			},
			'generated': {
				type: TYPES.FOLDER,
				path: 'generated'
			},
			'images': {
				type: TYPES.FOLDER,
				path: 'images'
			},
			'models': {
				type: TYPES.FOLDER,
				path: 'models'
			},
			'products': {
				type: TYPES.FOLDER,
				path: 'products'
			},
			'rules': {
				type: TYPES.FOLDER,
				path: 'rules'
			}
		};
	}

	_materialFolder() {
		return {
			'submaterials': {
				type: TYPES.FOLDER,
				path: 'materials/submaterials'
			},
			'material1': {
				type: TYPES.FILE,
				path: 'materials/material1.txt'
			},
			'material2': {
				type: TYPES.FOLDER,
				path: 'materials/material2'
			}
		};
	}

	_subMaterialFolder() {
		return {
			'submaterial1': {
				type: TYPES.FILE,
				path: 'materials/submaterials/submaterial1.txt'
			},
			'submaterial2': {
				type: TYPES.FILE,
				path: 'materials/submaterials/submaterial2.txt'
			}
		};
	}

	_documentFolder() {
		return {
			'document1': {
				type: TYPES.FILE,
				path: 'documents/document1.txt'
			},
			'document2': {
				type: TYPES.FILE,
				path: 'documents/document2.txt'
			}
		};
	}

	_generatedFolder() {
		return {
			'generated1': {
				type: TYPES.FILE,
				path: 'generated/generated1.txt'
			},
			'generated2': {
				type: TYPES.FILE,
				path: 'generated/generated2.txt'
			}
		};
	}

	_imageFolder() {
		return {
			'image1': {
				type: TYPES.FILE,
				path: 'images/image1.txt'
			},
			'image2': {
				type: TYPES.FILE,
				path: 'images/image2.txt'
			}
		};
	}

	_modelFolder() {
		return {
			'model1': {
				type: TYPES.FILE,
				path: 'models/model1.txt'
			},
			'model2': {
				type: TYPES.FILE,
				path: 'models/model2.txt'
			}
		};
	}

	_productFolder() {
		return {
			'product1': {
				type: TYPES.FILE,
				path: 'products/product1.txt'
			},
			'product2': {
				type: TYPES.FILE,
				path: 'products/product2.txt'
			}
		};
	}

	_ruleFolder() {
		return {
			'rule1': {
				type: TYPES.FILE,
				path: 'rules/rule1.txt'
			},
			'rule2': {
				type: TYPES.FILE,
				path: 'rules/rule2.txt'
			}
		};
	}
}