import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
	providedIn: 'root'
})
export class LocalSaveService {

	constructor(private db: NgxIndexedDBService) {
		// this.create_locale_backuping_hotspot({coords: "847.64, 637.07, -4827.74", from: "71", to: "72"});
	}

	create_local_backuping_img(data: { id: string, base64: string, name?: string, lastModified?: number, size?: number }) {
		return new Promise(
			(resolve, reject) => {
				this.db.add('image', data).then(
					() => {
						resolve(data)
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	get_local_backuping_img() {
		return new Promise(
			(resolve, reject) => {
				this.db.getAll('image').then(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	create_locale_backuping_infospot(data: { type: number, img: string, coords: string, info: string }) {
		return new Promise(
			(resolve, reject) => {
				this.db.add('infospot', data).then(
					() => {
						resolve(data)
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	get_local_backuping_infospot() {
		return new Promise(
			(resolve, reject) => {
				this.db.getAll('infospot').then(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	create_locale_backuping_hotspot(data: { from: string, coords: string, to: string }) {
		return new Promise(
			(resolve, reject) => {
				this.db.add('hotspot', data).then(
					() => {
						resolve(data)
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	get_local_backuping_hotspot() {
		return new Promise(
			(resolve, reject) => {
				this.db.getAll('hotspot').then(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}

	clean_local_backuping_table(table: string) {
		return new Promise(
			(resolve, reject) => {
				this.db.clear(table).then(
					(res) => {
						resolve(res);
					},
					(err) => {
						reject(err);
					}
				);
			}
		)
	}
}
