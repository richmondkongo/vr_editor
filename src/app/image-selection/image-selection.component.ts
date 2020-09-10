import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalSaveService } from '../__services/local-save.service';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
declare var $: any;

@Component({
	selector: 'app-image-selection',
	templateUrl: './image-selection.component.html',
	styleUrls: ['./image-selection.component.scss']
})
export class ImageSelectionComponent implements OnInit {
	// Ensemble des liens des images
	save_img: boolean[] = [];
	img_list: { id: string, base64: string, name: string, size: number, lastModified: string }[] = [];


	constructor(private db: LocalSaveService, private router: Router,) { }

	ngOnInit(): void {
		// Nettoyage de la bd locale
		this.clean_all_db_table();

		// permet de designer le bouton de selection des images
		document.getElementById('btn-select-file').addEventListener('click', () => {
			document.getElementById('select-file').click()
		})
	}

	box_checked(i) {
		this.save_img[i] = !this.save_img[i];
	}

	on_select(e) {
		/*
		 * Se charge de récupérer les images selectionnées par le inputs et de les convertir en base 64 puis de les sauvegarder en locale.
		 */
		if (e.target.files) {
			// console.log(e)
			this.db.clean_local_backuping_table('image').then(
				(res_img) => {
					this.db.clean_local_backuping_table('hotspot').then(
						(res_hp) => {
							this.db.clean_local_backuping_table('infospot').then(
								(res_ip) => {
									for (let i = 0; i < e.target.files.length; i++) {
										let reader = new FileReader();
										reader.readAsDataURL(e.target.files[i]);
										console.log(e.target.files[i])
										reader.onload = (ev: any) => {
											this.save_img.push(true);
											this.img_list.push({ id: uuid(), base64: ev.target.result, name: e.srcElement.files[i].name, size: e.srcElement.files[i].size, lastModified: e.srcElement.files[i].lastModified });
										}
									}
								}, (err_ip) => {
									console.error(err_ip);
								}
							)
						}, (err_hp) => {
							console.error(err_hp);
						}
					)
				}, (err_img) => {
					console.error(err_img);
				}
			)
		}
	}

	local_save() {
		if (this.img_list.length > 0) {
			this.img_list.forEach((e, i) => {
				if (this.save_img[i]) {
					this.db.create_local_backuping_img({ id: e.id, base64: e.base64, name: e.name, size: e.size, lastModified: e.lastModified }).then(
						(res) => {
							if (i == this.img_list.length - 1) {
								// La sauvegarde des images en locale est effective on va à présent vers l'éditeur.
								// this.router.navigate(['/editor']);

								this.db.count_local_backuping_table('image').then(
									(count: number) => {
										if (count == this.img_list.length) {
											window.location.assign("/editor");
										}
									}, (err) => {
										console.error(err);
									}
								);
							}
						}, (err) => {
							console.error(err);
							alert("Une erreur s'est produite veuillez reprendre le processsus.");
							this.clean_all_db_table();
						}
					);
				}
			})
		} else {
			alert("Ajoutez des images avant l'édition!")
		}
	}

	clean_all_db_table() {
		console.log('Nettoyage...')
		return new Promise(
			(resolve, reject) => {
				this.db.clean_local_backuping_table('infospot').then((res_ip) => {
					this.db.clean_local_backuping_table('hotspot').then((res_hp) => {
						this.db.clean_local_backuping_table('image').then((res_img) => {
							resolve({ res_ip, res_hp, res_img });
						}, (err_img) => {
							reject(err_img)
						})
					}, (err_hp) => {
						reject(err_hp)
					})
				}, (err_ip) => {
					reject(err_ip);
				})
			}
		)
	}

	remove() {
		// console.clear();
		console.log(`${this.save_img}\n`, this.img_list);
		/*
		this.save_img.forEach((e, i) => {
			if (!e) {
				this.img_list.splice(i, 1)
			}

			if (i == this.save_img.length) {
				this.save_img = [];
				this.img_list.forEach((e, i) => {
					this.save_img.push(true);
				})
			}
		})
		console.log(`${this.save_img}\n${this.img_list}`);
		*/
	}
}
