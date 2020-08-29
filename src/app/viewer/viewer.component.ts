import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as three from 'three';
import * as panolens from 'panolens';
import { LocalSaveService } from '../__services/local-save.service';
import { Hotspot, Infospot } from '../model';
import { ApiService } from '../__services/api.service';
import { Router } from '@angular/router';
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
	// Les deux variables ci dessous permettent d'envoyer une sorte de signal ordonnant la suppression des tables locales
	signal_hotspot: number = 0; signal_infospot: number = 0;

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

	constructor(private db: LocalSaveService, private api: ApiService, private router: Router) { }

	ngOnInit() {
		this.set_locale_view();
		console.log(this.count_table('image'))
	}

	async count_table(table) {
		let count = 0;
		this.db.count_local_backuping_table(table).then(
			async (res) => {
				return await res;
			}, (err) => {
				console.error(err);
			}
		);
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
				if (this.pano_img_id[index] == inf.img)
					item.add(this.addInfospot(inf));
			});

			item.addEventListener('progress', this.onProgress);
			item.addEventListener('enter', () => { this.onEnter(index) });
			this.sky.add(item);
			if (index == this.p.length - 1)
				this.sky.setPanorama(this.p[this.now_img]);
		});
	}

	addInfospot(infospot: Infospot) {
		/*
		 * Crée un spot de type info (celui qu'on a personnalisé: type Infospot)
		 */
		let info = new panolens.Infospot(), tab_coords = this.conv_text2xyz(infospot.coords);
		info.position.set(tab_coords[0], tab_coords[1], tab_coords[2]);
		info.addHoverText(infospot.info);
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

	on_submit_infospot(f: NgForm) {
		/*
		 * Permet de créer des infospots mis dans le formulaire
		 */
		if (document.getElementById('coord_3d').textContent != '*') {
			let i: Infospot = new Infospot();
			i.coords = document.getElementById('coord_3d').textContent;
			i.img = this.pano_img_id[this.now_img];
			i.info = f.value.t;
			this.db.create_locale_backuping_infospot({ txt_or_html: 0, img: this.pano_img_id[this.now_img], coords: i.coords, info: i.info }).then(
				(res) => {
					this.p[this.now_img].add(this.addInfospot(i));
					document.getElementById('coord_3d').textContent = '*';
					this.infospot.push(this.addInfospot(i));
				}, (err) => {
					console.error(err);
				}
			)
			$('#infospot-modal').modal('hide');
		} else {
			alert('Ajouter d\'abord des coordonnées');
		}
	}

	on_submit_hspot() {
		/*
		 * Permet de créer des hotspots
		 */
		let xyz = this.conv_text2xyz(document.getElementById('coord_3d').textContent);
		xyz[1] -= 300;
		xyz = xyz.join(', ');
		let div_coord_3d = document.getElementById('coord_3d').textContent;
		this.link_to.push({ origin: this.pano_img_id[this.now_img], coords: div_coord_3d, to: this.pano_img_id[this.next_hspot] });
		this.db.create_locale_backuping_hotspot({ origin: this.pano_img_id[this.now_img], coords: div_coord_3d, to: this.pano_img_id[this.next_hspot] })
		let i: Infospot = new Infospot();
		i.coords = xyz;
		i.img = this.pano_img_id[this.now_img];
		i.info = this.hotspot_infospot;
		this.hotspot_infospot = '';
		this.db.create_locale_backuping_infospot({ txt_or_html: 0, img: this.pano_img_id[this.now_img], coords: i.coords, info: i.info }).then(
			(res) => {
				this.p[this.now_img].add(this.addInfospot(i));
				this.infospot.push(this.addInfospot(i));
				$('#hotspot-modal').modal('hide');
			}, (err) => {
				console.error(err);
			}
		)
		this.set_locale_view();
		document.getElementById('coord_3d').textContent = '*';
	}

	show_spot_modal(class_name: string) {
		/*
		 * permet d'afficher un modale en lui passant en paramètre le nom de la classe du modale
		 */
		if (document.getElementById('coord_3d').textContent == '*') {
			alert('Ajouter d\'abord des coordonnées')
		} else {
			$(class_name).modal('show');
		}
	}

	set_display(i) {
		/*
		 * permet de ne pas afficher l'image dont on est sur lz panorama
		 */
		return (i == this.now_img) ? 'none' : 'flex';
	}

	go_to_image(i) {
		/*
		 * permet de se diriger vers un panorama dont on passe l'index en paramètre
		 */
		this.now_img = i;
		this.sky.setPanorama(this.p[this.now_img]);
	}

	set_locale_view() {
		this.pano_img = [];
		this.pano_img_id = [];

		this.db.get_local_backuping_img().then(
			(res: any) => {
				res.forEach((elt, i) => {
					this.pano_img.push(elt.base64);
					this.pano_img_id.push(elt.id);
					if (i == res.length - 1) {
						this.db.get_local_backuping_infospot().then(
							(res_infospot: any[]) => {
								if (res_infospot.length == 0) {
									this.db.get_local_backuping_hotspot().then(
										(res_hotspot: any[]) => {
											if (res_hotspot.length == 0) {
												this.start_view(this.pano_img, this.link_to, this.infospot);
											} else {
												res_hotspot.forEach((elt3, i3) => {
													this.link_to.push({ origin: elt3.origin, to: elt3.to, coords: elt3.coords })
													if (i3 == res_hotspot.length - 1) {
														document.querySelectorAll('.panolens-container').forEach((a) => { a.remove() })
														this.start_view(this.pano_img, this.link_to, this.infospot);
													}
												});
											}
										}, (err_hotspot) => {
											console.error(err_hotspot);
										}
									);
								} else {
									// quand on a des infospots
									res_infospot.forEach((elt2, i2) => {
										this.infospot.push({ img: elt2.img, info: elt2.info, coords: elt2.coords })
										if (i2 == res_infospot.length - 1) {
											this.db.get_local_backuping_hotspot().then(
												(res_hotspot: any[]) => {
													res_hotspot.forEach((elt3, i3) => {
														this.link_to.push({ origin: elt3.origin, to: elt3.to, coords: elt3.coords })
														if (i3 == res_hotspot.length - 1) {
															document.querySelectorAll('.panolens-container').forEach((a) => { a.remove() })
															this.start_view(this.pano_img, this.link_to, this.infospot);
														}
													});
												}, (err_hotspot) => {
													console.error(err_hotspot);
												}
											);
										}
									})
								}
							}, (err_infospot) => {
								console.error(err_infospot);
							}
						)
					}

				});
			}, (err) => {
				console.error(err);
			}
		)
	}

	clean_all_db_table() {
		if (this.signal_hotspot && this.signal_hotspot) {
			this.db.clean_local_backuping_table('infospot').then((res) => {
				this.db.clean_local_backuping_table('hotspot').then((res) => {
					this.db.clean_local_backuping_table('image').then((res) => {
						let conf = confirm("Votre visite virtuelle a bien été sauvegardé, voulez vous en ajouter une nouvelle?");
						if (conf) {
							this.router.navigate(['/selection-image']);
						} else {
							this.router.navigate(['/splashscreen']);
						}
					}, (err) => { console.error(err) })
				}, (err) => { console.error(err) })
			}, (err) => { console.error(err) })
		}
	}

	save_online() {

		console.clear(); console.log('sauvegarde en ligne...')
		this.api.set_visite_virtuelle((Date.now()).toString()).then(
			(res_visite: any) => {
				this.db.get_local_backuping_img().then(
					(res_img: any) => {
						let id_of_img: string[] = [];
						for (let i = 0; i < res_img.length; i++) {
							const e = res_img[i];
							this.api.set_image_360(res_visite.id, e.base64, e.id, e.name, e.lastModified, e.size).then(
								(res_img_online: any) => {
									id_of_img.push(e.id);
									if (i == res_img.length - 1) {
										id_of_img.forEach(elt => {
											this.db.get_local_backuping_hotspot(elt).then(
												(res_hotspot: any) => {
													for (let j = 0; j < res_hotspot.length; j++) {
														const f = res_hotspot[j];
														this.api.set_hotspot(f.origin, f.to, f.coords).then(
															(res_hotspot_online) => {
																if (j == res_hotspot.length - 1) {
																	this.clean_all_db_table();
																}
															}, (err_hotspot_online) => {
																console.error(err_hotspot_online);
															}
														);
													}
												}, (err_hotspot) => {
													console.error(err_hotspot);
												}
											);

											this.db.get_local_backuping_infospot(elt).then(
												(res_infospot: any) => {
													for (let j = 0; j < res_infospot.length; j++) {
														const f = res_infospot[j];
														this.api.set_infospot(f.img, f.coords, f.info, f.txt_or_html).then(
															(res_infospot_online) => {
																if (j == res_infospot.length - 1) {
																	this.clean_all_db_table();
																}
															}, (err_hotspot_online) => {
																console.error(err_hotspot_online);
															}
														);
													}
												}, (err_hotspot) => {
													console.error(err_hotspot);
												}
											);
										});
									}
								}, (err_img_online) => {
									console.error(err_img_online);
								}
							)
						}
					}, (err_img) => {
						console.error(err_img);
					}
				)
			}, (err_visite => {
				console.error(err_visite)
			})
		)
	}
}

