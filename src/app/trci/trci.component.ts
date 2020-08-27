import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as three from 'three';
import * as panolens from 'panolens';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-trci',
	templateUrl: './trci.component.html',
	styleUrls: ['./trci.component.scss']
})

/*
ng serve --ssl true --ssl-key /node_modules/browser-sync/lib/server/certs/server.key --ssl-cert /node_modules/browser-sync/lib/server/certs/server.crt --host 0.0.0.0 --port 3000 -o
configuratio de viewer: https://pchen66.github.io/Panolens/docs/index.html
https://github.com/pchen66/panolens.js/issues/160
*/

export class TrciComponent implements OnInit {
	linkTo: Hotspot[] = [];
	panoImg: string[] = [];
	infospot: Ispot[] = [];
	inputInfospot: string = 'super infospot';
	selecteur_coord_3d = 'body > div.panolens-container > div:nth-child(4)';
	div_coord_3d: string = '';
	p: panolens.ImagePanorama[] = [];
	id: number;

	constructor(private router: Router, private activateRoute: ActivatedRoute,) { }

	ngOnInit() {
		this.linkTo = [
			{ from: 0, to: 1, coords: '4586.40, -464.95, 1918.13'},
			{ from: 1, to: 2, coords: '-4145.88, -394.22, -2755.04'},
			{ from: 2, to: 3, coords: '4620.70, 52.62, -1889.93'},
			{ from: 3, to: 4, coords: '9.06, -243.76, 4989.95'},
			{ from: 4, to: 5, coords: '4666.98, 578.39, 1670.79'},
			{ from: 5, to: 6, coords: '-4005.98, -716.61, -2900.51'},
			{ from: 6, to: 7, coords: '3907.93, -202.77, -3095.65'},
			{ from: 7, to: 8, coords: '4934.28, 92.55, 741.43'},
			{ from: 8, to: 9, coords: '2050.18, -32.90, 4557.87'},
			{ from: 9, to: 10, coords: '3164.68, 486.69, 3828.11'},
			{ from: 10, to: 11, coords: '3164.68, 486.69, 3828.11'},
			{ from: 11, to: 12, coords: '3999.33, -170.95, -2984.77'},
			{ from: 12, to: 13, coords: '-4877.01, -587.18, 880.59'},
			{ from: 13, to: 14, coords: '3164.68, 486.69, 3828.11'},
			{ from: 14, to: 15, coords: '-4966.29, -122.13, 531.94'},
			{ from: 15, to: 16, coords: '4677.58, -771.56, -1579.47'},
			{ from: 16, to: 0, coords: '-4928.71, -600.25, -544.27'},
			{ from: 1, to: 0, coords: '-4586.40, -464.95, 1918.13'},
			{ from: 2, to: 1, coords: '4145.88, -394.22, -2755.04'},
			{ from: 3, to: 2, coords: '-4620.70, 52.62, -1889.93'},
			{ from: 4, to: 3, coords: '-9.06, -243.76, 4989.95'},
			{ from: 5, to: 4, coords: '-4666.98, 578.39, 1670.79'},
			{ from: 6, to: 5, coords: '4005.98, -716.61, -2900.51'},
			{ from: 7, to: 6, coords: '-3907.93, -202.77, -3095.65'},
			{ from: 8, to: 7, coords: '-4934.28, 92.55, 741.43'},
			{ from: 9, to: 8, coords: '-2050.18, -32.90, 4557.87'},
			{ from: 10, to: 9, coords: '-3164.68, 486.69, 3828.11'},
			{ from: 11, to: 10, coords: '-3164.68, 486.69, 3828.11'},
			{ from: 12, to: 11, coords: '-3999.33, -170.95, -2984.77'},
			{ from: 13, to: 12, coords: '4877.01, -587.18, 880.59'},
			{ from: 14, to: 13, coords: '-3164.68, 486.69, 3828.11'},
			{ from: 15, to: 14, coords: '4966.29, -122.13, 531.94'},
			{ from: 16, to: 15, coords: '-4677.58, -771.56, -1579.47'},
			{ from: 0, to: 16, coords: '4928.71, -600.25, -544.27'},
		];


		this.infospot = [
			{ img: 0, info: 'aller à 1', coords: '4586.40, -764.95, 1918.13'},
			{ img: 1, info: 'aller à 2', coords: '-4145.88, -694.22, -2755.04'},
			{ img: 2, info: 'aller à 3', coords: '4620.70, -352.62, -1889.93'},
			{ img: 3, info: 'aller à 4', coords: '9.06, -543.76, 4989.95'},
			{ img: 4, info: 'aller à 5', coords: '4666.98, 278.39, 1670.79'},
			{ img: 5, info: 'aller à 6', coords: '-4005.98, -1016.61, -2900.51'},
			{ img: 6, info: 'aller à 7', coords: '3907.93, -502.77, -3095.65'},
			{ img: 7, info: 'aller à 8', coords: '4934.28, -392.55, 741.43'},
			{ img: 8, info: 'aller à 9', coords: '2050.18, -332.90, 4557.87'},
			{ img: 9, info: 'aller à 10', coords: '3164.68, 186.69, 3828.11'},
			{ img: 10, info: 'aller à 11', coords: '3164.68, 186.69, 3828.11'},
			{ img: 11, info: 'aller à 12', coords: '3999.33, -470.95, -2984.77'},
			{ img: 12, info: 'aller à 13', coords: '-4877.01, -887.18, 880.59'},
			{ img: 13, info: 'aller à 14', coords: '3164.68, 186.69, 3828.11'},
			{ img: 14, info: 'aller à 15', coords: '-4966.29, -422.13, 531.94'},
			{ img: 15, info: 'aller à 16', coords: '4677.58, -1071.56, -1579.47'},
			{ img: 16, info: 'aller à 0', coords: '-4928.71, -900.25, -544.27'},
			{ img: 1, info: 'retourner à 0', coords: '-4586.40, -764.95, 1918.13'},
			{ img: 2, info: 'retourner à 1', coords: '4145.88, -694.22, -2755.04'},
			{ img: 3, info: 'retourner à 2', coords: '-4620.70, -352.62, -1889.93'},
			{ img: 4, info: 'retourner à 3', coords: '-9.06, -543.76, 4989.95'},
			{ img: 5, info: 'retourner à 4', coords: '-4666.98, 178.39, 1670.79'},
			{ img: 6, info: 'retourner à 5', coords: '4005.98, -1016.61, -2900.51'},
			{ img: 7, info: 'retourner à 6', coords: '-3907.93, -502.77, -3095.65'},
			{ img: 8, info: 'retourner à 7', coords: '-4934.28, -392.55, 741.43'},
			{ img: 9, info: 'retourner à 8', coords: '-2050.18, -332.90, 4557.87'},
			{ img: 10, info: 'retourner à 9', coords: '-3164.68, 186.69, 3828.11'},
			{ img: 11, info: 'retourner à 10', coords: '-3164.68, 186.69, 3828.11'},
			{ img: 12, info: 'retourner à 11', coords: '-3999.33, -470.95, -2984.77'},
			{ img: 13, info: 'retourner à 12', coords: '4877.01, -887.18, 880.59'},
			{ img: 14, info: 'retourner à 13', coords: '-3164.68, 186.69, 3828.11'},
			{ img: 15, info: 'retourner à 14', coords: '4966.29, -422.13, 531.94'},
			{ img: 16, info: 'retourner à 15', coords: '-4677.58, -1071.56, -1579.47'},
			{ img: 0, info: 'retourner à 16', coords: '4928.71, -900.25, -544.27'},
		];
		this.id = (this.activateRoute.snapshot.params['id'] == null) ? '02' : this.activateRoute.snapshot.params['id'];
		// this.startView(this.panoImg, this.linkTo, this.infospot);
		
		
		var m = 0, n = 17;
		for (let i = m; i < n; i++) {
			// console.log(`assets/Agboville_traite_renomme/classe_${this.id}/${i}.jpg`)
			this.panoImg.push(`assets/Agboville_traite_renomme/classe_${this.id}/${i}.jpg`);
			if (i == n - 1)
				for (let k = m; k < n - 1; k++) {
					// this.linkTo.push({ from: k-m, to: k + 1-m, coords: '3164.68, 486.69, 3828.11' });
					// this.infospot.push({ img: k-m, info:'ok', coords: '3164.68, 186.69, 3828.11' });
					if (k == n - 2)
						this.startView(this.panoImg, this.linkTo, this.infospot);
				}
		}
		



		/*
		var j = 2;
		for (let i = 1; i < j + 2; i++) {
			this.panoImg.push(`assets/${i}.jpg`);
			
		}
		for (let i = 0; i < j; i++) {
				this.linkTo.push({from: i, to: i+1, coords: '3164.68, 486.69, 3828.11'});
		}
		*/
		/*
		//trci
				this.panoImg = [
					'assets/trci/PHOTO_2391.jpg', // 0
					'assets/trci/PHOTO_2413.jpg', // 1
					'assets/trci/PHOTO_2384.jpg', // 2
					'assets/trci/PHOTO_2411.jpg', // 3
					'assets/trci/PHOTO_2388.jpg', // 4
					'assets/trci/PHOTO_2390.jpg', // 5
					'assets/trci/PHOTO_2332.jpg', // 6
					'assets/trci/PHOTO_2333.jpg', // 7
					'assets/trci/PHOTO_2338.jpg', // 8
				]; 
		
				
				this.linkTo = [
					{ from: 0, to: 1, coords: '3164.68, 486.69, 3828.11'},
					{ from: 1, to: 2, coords: '-4980.31, 211.27, 217.32'},
					{ from: 2, to: 3, coords: '4888.25, 81.44, -1034.83'},
					{ from: 3, to: 4, coords: '-3153.72, -146.43, -3863.76'},
					{ from: 4, to: 5, coords: '383.86, -55.84, -4977.69'},
					{ from: 5, to: 4, coords: '-3815.33, -69.83, -3218.30'},
					// { from: 5, to: 1, coords: '-3815.33, -69.83, -3218.30'},
					{ from: 1, to: 6, coords: '-359.67, 565.51, 4945.24'},
					{ from: 1, to: 0, coords: '1441.96, 70.13, -4780.07'},
					{ from: 2, to: 1, coords: '4744.26, 150.62, 1557.31'},
					{ from: 3, to: 2, coords: '-4742.83, -232.49, -1552.07'},
					{ from: 4, to: 3, coords: '2832.86, -112.39, -4108.71'},
					{ from: 5, to: 6, coords: '1921.77, -67.44, -4607.85'},
					{ from: 6, to: 1, coords: '68.88, 898.09, 4911.77'},
					{ from: 6, to: 5, coords: '3733.58, 532.84, 3272.75'},
					{ from: 6, to: 7, coords: '4848.59, -132.09, 1176.83'},
					{ from: 7, to: 6, coords: '-2965.64, -187.29, 4014.00'},
				];
		
				this.infospot = [
					{ img: 0, coords: '3164.68, 86.69, 3828.11', info: 'Aller à la parcelle 1'},
					{ img: 1, coords: '-4980.31, -88.73, 217.32', info: 'Aller à la parcelle 2'},
					{ img: 2, coords: '4888.25, -218.56, -1034.83', info: 'Aller à la parcelle 3'},
					{ img: 3, coords: '-3153.72, -446.43, -3863.76', info: 'Aller à la parcelle 4'},
					{ img: 4, coords: '383.86, -355.84, -4977.69', info: 'Aller à la parcelle 5'},
					{ img: 5, coords: '-3815.33, -369.83, -3218.30', info: 'Retourner à la parcelle 4'},
					{ img: 1, coords: '-359.67, 165.51, 4945.24', info: 'Voir les jeunes plants'},
					{ img: 1, coords: '1441.96, -230.13, -4780.07', info: 'Retourner à la parcelle 0'},
					{ img: 2, coords: '4744.26, -150.62, 1557.31', info: 'Retourner à la parcelle 1'},
					{ img: 3, coords: '-4742.83, -532.49, -1552.07', info: 'Retourner à la parcelle 2'},
					{ img: 4, coords: '2832.86, -412.39, -4108.71', info: 'Retourner à la parcelle 3'},
					{ img: 5, coords: '1921.77, -367.44, -4607.85', info: 'Voir les jeunes plants'},
					{ img: 6, coords: '68.88, 498.09, 4911.77', info: 'Aller à la parcelle 1'},
					{ img: 6, coords: '3733.58, 132.84, 3272.75', info: 'Retourner à la parcelle 5'},
					{ img: 6, coords: '4848.59, -432.09, 1176.83', info: 'Voir les jeunes plants 2'},
					{ img: 7, coords: '-2965.64, -487.29, 4014.00', info: 'Retourner aux précédents jeunes plants'},
				];
		*/
	}

	startView(img: string[], link: Hotspot[], infoS: Ispot[] = []) {
		/*
		 * 
		 * cette fonction permet de lancer véritablement le panorama
		 * args:
		 * 	img: tableau de string contenannt le lien de 
		 * 			toutes les images de la visite virtuelle
		 * 	link: lien entre les différentes images de la vr, 
		 * 			il est de type Link dont la définition se trouve tout en bas
		 */
		this.setCSS();
		img.forEach((item, index) => {
			this.p.push(new panolens.ImagePanorama(item));
			if (this.p.length == img.length) {
				// var sky = new panolens.Viewer({output: 'console'});
				var sky = new panolens.Viewer({ output: 'console', autoHideInfospot: false, });
				// gestion de vue verticale pour éviter qu'on voit le trepied de la gopro(en radian) 
				sky.OrbitControls.minPolarAngle = 70 * Math.PI / 180;
				sky.OrbitControls.maxPolarAngle = Math.PI;
				this.p.forEach((item, index) => {
					link.forEach((lk, ind) => {
						if (lk.from == index) {
							try {
								item.link(this.p[lk.to], this.conv_xyz2vect3(this.conv_text2xyz(lk.coords)));
							} catch (err) {
								console.error('erreur: à l\index', index, ':\n', err);
							}
						}
					});

					infoS.forEach((inf, indice) => {
						if (index == inf.img) {
							item.add(this.addIspot(inf));
						}
					});

					item.addEventListener('progress', this.onProgress);
					item.addEventListener('enter', this.onEnter);

					sky.add(item);
				});
			}
		});

	}

	addIspot(infospot: Ispot) {
		let info = new panolens.Infospot(), tab_coords = this.conv_text2xyz(infospot.coords);
		info.position.set(tab_coords[0], tab_coords[1], tab_coords[2]);
		info.addHoverText(infospot.info);
		return <panolens.Infospot>info;
	}


	setCSS() {
		/* 
		 *
		 * Permet que le panorama prenne toute la page et 
		 * le rend visible car sans celà ça ne fonctionnerait pas, 
		 * il est tout à fait possible de le faire directement dans le css
		 */
		var body = document.querySelector('body');
		var html = document.querySelector('html');

		body.style.width = '100%';
		body.style.height = '100%';
		body.style.overflow = 'hidden';
		body.style.margin = '0px';
		body.style.backgroundColor = '#646B63';

		html.style.width = '100%';
		html.style.height = '100%';
	}

	onEnter(event) {
		/*
		 *
		 * utilisé lors du chargement de la page 
		 * ou lorsqu'on veut aller au panorama suivant
		 */
		var progressElement;
		progressElement = document.getElementById('progress');
		progressElement.style.width = 0;
		progressElement.classList.remove('finish');
	}

	onProgress(event) {
		/*
		 * utilisé lors du chargement de la page 
		 * ou lorsqu'on veut aller au panorama suivant
		 */
		let progress, progressElement;
		progressElement = document.getElementById('progress');
		progress = event.progress.loaded / event.progress.total * 100;
		progressElement.style.width = progress + '%';
		if (progress === 100)
			progressElement.classList.add('finish');
	}

	conv_text2xyz(str: string): any {
		let tab_str: any[] = str.split(', ');
		tab_str.forEach((s, i) => { tab_str[i] = parseFloat(s); })
		return tab_str;
	}

	conv_xyz2vect3(tab: number[]): any {
		return new three.Vector3(tab[0], tab[1], tab[2]);
	}
}

export class Hotspot {
	/*
	 *
	 * type de la variable
	 */

	// image de départ
	from: number;

	// image vers laquelle on doit aller
	to: number;

	// positionnement du spot de direction dans l'image par des coordonnées (x, y, z) 
	coords: string;
}

export class Ispot {
	/*
	 *
	 * formatage des infospots
	 */

	// image sur laquelle le hotspot doit être posé
	img: number;

	// positionnement de l'infospot par des coordonnées (x, y, z) 
	coords: string;

	// texte à afficher
	info: string;
}