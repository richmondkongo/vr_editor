import { Component, OnInit } from '@angular/core';
import { ApiService } from '../__services/api.service';
import { LocalSaveService } from '../__services/local-save.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	constructor(private api: ApiService, private db: LocalSaveService) { }

	ngOnInit(): void {
		// this.db.get_local_backuping_hotspot().then(
		// 	(res) => {
		// 		console.log(res)
		// 	}
		// )

		this.db.get_local_backuping_img().then(
			(res) => {
				console.log('liste des image locale:', res)
				this.api.set_visite_virtuelle('zotta').then(
					(res_vr: any) => {
						console.log('Création d\'une vr', res_vr);
						res[0].vr_id = res_vr.id;
						this.api.set_image_360(res_vr.id, res[0].base64, res[0].name, res[0].lastModified, res[0].size).then(
							(res_cr) => {
								console.log('Image ajouté avec succès:', res_cr)
							}, (err_cr) => {
								console.error(err_cr);
							}
						)
					}, (err_vr) => {
						console.error(err_vr);
					}
				)
			}
		)

		// this.api.get_imgae_360().then(
		// 	(res) => {
		// 		console.log(res)
		// 	}
		// )

		// this.db.get_local_backuping_infospot().then(
		// 	(res) => {
		// 		console.log(res)
		// 	}
		// )


		// this.api.get_visite_virtuelle().then(
		// 	(res) => {
		// 		console.log(res);
		// 	}, (err) => {
		// 		console.error(err);
		// 	}
		// )

		// this.api.set_visite_virtuelle('coolllllllllll').then(
		// 	(res) => {
		// 		console.log(res);
		// 		this.api.set_image_360({base64: string; 
		// 			name: string; 
		// 			lastModified?: number; 
		// 			size?: number;
		// 			id:})
		// 	}, (err) => {
		// 		console.error(err);
		// 	}
		// )
	}

}
