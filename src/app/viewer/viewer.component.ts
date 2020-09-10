import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as three from 'three';
import * as panolens from 'panolens';
import { LocalSaveService } from '../__services/local-save.service';
import { Hotspot, Infospot } from '../model';
import { ApiService } from '../__services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
	selector: 'app-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss']
})

/*
ng serve --ssl true --ssl-key /node_modules/browser-sync/lib/server/certs/server.key --ssl-cert /node_modules/browser-sync/lib/server/certs/server.crt --host 0.0.0.0 --port 3000 -o
configuratio de viewer: https://pchen66.github.io/Panolens/docs/index.html
https://github.com/pchen66/panolens.js/issues/160
*/

export class ViewerComponent implements OnInit {
	// Ensemble des liens entres images
	link_to: Hotspot[] = [];

	// Ensemble des liens des images
	pano_img: string[] = []; pano_img_id: string[] = [];

	// utilisé lorsqu'on saisie le texte d'un hotspot
	hotspot_infospot: string = '';

	// Ensemble des infospot
	infospot: Infospot[] = [];

	selecteur_coord_3d = 'body > div.panolens-container > div:nth-child(4)';

	// Ensemble d'image convertit en 3D
	p: panolens.ImagePanorama[] = [];

	// Image sur laquelle l'on travaille présentement
	now_img: number = 0;

	// permet d'indiquer vers quelle image est ce que le hotspot qu'on vient ajouter ira
	next_hspot: number = 1;

	// contient toute la vue 360
	sky: panolens.Viewer = null;

	visite: any = null;

	constructor(private db: LocalSaveService, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		if (this.route.snapshot.params['visite']) {
			this.api.get_visite_virtuelle(`?id=${this.route.snapshot.params['visite']}`).then(
				(res: any) => {
					this.visite = res;
					this.visite
					this.get_images_visite();
				}, (err) => {
					console.error(err);
				}
			);
		} else {
			this.visite = JSON.parse(localStorage.visite);
			this.get_images_visite();
		}
	}

	get_images_visite() {
		for (let i = 0; i < this.visite.image_360.length; i++) {
			const e = this.visite.image_360[i];
			this.pano_img.push(e.base64);
			this.pano_img_id.push(e.id);
			this.infospot = this.infospot.concat(e.infospot)
			this.link_to = this.link_to.concat(e.hotspot)
			if (i == this.visite.image_360.length - 1) {
				this.start_view(this.pano_img, this.link_to, this.infospot)
			}
		}
	}

	start_view(img: string[], link: Hotspot[], infoS: Infospot[] = []) {
		/*
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
		});
		// var this.sky = new panolens.Viewer({output: 'console'});
		this.sky = null;
		this.sky = new panolens.Viewer({ output: 'overlay', autoHideInfospot: true, autoRotate: true, autoRotateSpeed: 0.5, container: "" });

		// gestion de vue verticale pour éviter qu'on voit le trepied de la gopro(en radian) 
		this.sky.OrbitControls.minPolarAngle = 70 * Math.PI / 180;
		this.sky.OrbitControls.maxPolarAngle = Math.PI;

		document.querySelector(this.selecteur_coord_3d).id = 'coord_3d';
		document.getElementById('coord_3d').textContent = '*';
		// document.getElementById('coord_3d').style.display = 'none'; // permet de ne pas afficher les coordonnées

		this.p.forEach((item, index) => {
			link.forEach((lk, ind) => {
				if (lk.origin == this.pano_img_id[index]) {
					try {
						item.link(this.p[this.pano_img_id.indexOf(lk.to)], this.conv_xyz2vect3(this.conv_text2xyz(lk.coords)));
					} catch (err) {
						console.error('erreur: à l\index', index, ':\n', err);
					}
				}
			});

			infoS.forEach((inf, indice) => {
				if (this.pano_img_id[index] == inf.img && inf.img && inf.coords && inf.info) {
					item.add(this.addInfospot(inf));
				}
			});

			item.addEventListener('progress', this.onProgress);
			item.addEventListener('enter', () => { this.onEnter(index) });
			this.sky.add(item);
			if (index == this.p.length - 1)
				this.sky.setPanorama(this.p[this.now_img]);
		});
	}

	addInfospot(infospot: Infospot, url: string = null) {
		/*
		 * Crée un spot de type info (celui qu'on a personnalisé: type Infospot)
		 */
		// "https://images-na.ssl-images-amazon.com/images/I/61mtx+420hL._AC_US436_QL65_.jpg"
		let info = new panolens.Infospot(250, url, false), tab_coords = this.conv_text2xyz(infospot.coords);
		info.position.set(tab_coords[0], tab_coords[1], tab_coords[2]);
		// info.addHoverText(infospot.info);
		info.addHoverElement(document.getElementById('desc-container'), 100);
		return <panolens.Infospot>info;
	}

	setCSS() {
		/* 
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

	onEnter(e) {
		/*
		 * utilisé lors du chargement de la page ou lorsqu'on veut aller au panorama suivant
		 * il permet également de mettre à jour la variable this.now_img lorsqu'on rentre dans un nouveau pano
		 */
		this.now_img = e;
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
		/*
		 * Convertit un str ('x, y, z') de coordonnées en tableau de 3 éléments [x, y, z]
		 */
		let tab_str: any[] = str.split(', ');
		tab_str.forEach((s, i) => { tab_str[i] = parseFloat(s); })
		return tab_str;
	}

	conv_xyz2vect3(tab: number[]): any {
		/*
		 * Convertit un tableau contenant 3 éléments ([x, y, z]) en vector3 de threejs
		 */
		return new three.Vector3(tab[0], tab[1], tab[2]);
	}

	select_next_image(image_id) {
		/*
		 * permet d'envoyer l'image suivante pour le hotspot 
		 */
		this.next_hspot = image_id;
	}

	set_border(i) {
		/*
		 * permet d'encadrer l'image sélectionnée
		 */
		return (i == this.next_hspot) ? '0.2em solid #508a3e' : '0em solid red';
	}

	go_to_image(i) {
		/*
		 * permet de se diriger vers un panorama dont on passe l'index en paramètre
		 */
		this.now_img = i;
		this.sky.setPanorama(this.p[this.now_img]);
	}

}

