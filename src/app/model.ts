export class Image_360 {
    base64: string; 
    name?: string; 
    lastModified?: string; 
	size?: number;
	id: string;
}


export class Hotspot {
	/*
	 * type de la variable
	 */

	// image de départ
	origin: string;

	// image vers laquelle on doit aller
	to: string;

	// positionnement du spot de direction dans l'image par des coordonnées (x, y, z) 
	coords: string;
}

export class Infospot {
	/*
	 * formatage des infospots
	 */

	// image sur laquelle le hotspot doit être posé
	img: string;

	// positionnement de l'infospot par des coordonnées (x, y, z) 
	coords: string;

	// texte à afficher
    info: string;
    
    // type de l'infospot: 0 pour texte et 1 pour html
    txt_or_html?: number = 0;
}