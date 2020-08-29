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
	panoImg: string[] = [];
	constructor(private db: LocalSaveService, private router: Router,) { }

	ngOnInit(): void {
		document.getElementById('btn-select-file').addEventListener('click', () => {
			document.getElementById('select-file').click()
		})
	}

	go_to_editor() {
		this.router.navigate(['/editor']);
	}

	on_select(e) {
		/*
		 *
		 * Se charge de récupérer les images selectionnées par le inputs et de les convertir en base 64 puis de les sauvegarder en locale.
		 */
		if (e.target.files) {
			console.log(e)
			this.db.clean_local_backuping_table('image').then(
				(res_img) => {
					this.db.clean_local_backuping_table('hotspot').then(
						(res_hp) => {
							this.db.clean_local_backuping_table('infospot').then(
								(res_ip) => {
									for (let i = 0; i < e.target.files.length; i++) {
										let reader = new FileReader();
										reader.readAsDataURL(e.target.files[i]);
										reader.onload = (ev: any) => {
											this.db.create_local_backuping_img({ id: uuid(), base64: ev.target.result, name: e.srcElement.files[i].name, size: e.srcElement.files[i].size, lastModified: e.srcElement.files[i].lastModified }).then(
												(res) => {
													this.panoImg.push(ev.target.result);
													if (i == e.target.files.length - 1) {
														// La sauvegarde des images en locale est effective on va à présent vers l'éditeur.

														// this.router.navigate(['/editor']);
													}
													// console.table(this.urls);
												}, (err) => {
													console.error(err);
													alert("Une erreur s'est produite veuillez reprendre le processsus.");
												}
											);
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
}
