import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Image_360, Hotspot, Infospot } from '../model';

@Injectable({
	providedIn: 'root'
})
export class LocalSaveService {

	constructor(private db: NgxIndexedDBService) { }

	create_local_backuping_img(data: Image_360) {
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

	create_locale_backuping_infospot(data: Infospot) {
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

	get_local_backuping_infospot(img_uuid: string = null) {
		return new Promise(
			(resolve, reject) => {
				if (img_uuid == null) {
					this.db.getAll('infospot').then(
						(res) => {
							resolve(res);
						}, (err) => {
							reject(err);
						}
					);
				} else {
					this.db.getAllByIndex('infospot', 'img', IDBKeyRange.only(img_uuid)).then(
						(res) => {
							resolve(res);
						}, (err) => {
							reject(err);
						}
					);
				}
			}
		)
	}

	create_locale_backuping_hotspot(data: Hotspot) {
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

	get_local_backuping_hotspot(origin_uuid: string = null) {
		return new Promise(
			(resolve, reject) => {
				if (origin_uuid == null) {
					this.db.getAll('hotspot').then(
						(res) => {
							resolve(res);
						}, (err) => {
							reject(err);
						}
					);
				} else {
					this.db.getAllByIndex('hotspot', 'origin', IDBKeyRange.only(origin_uuid)).then(
						(res) => {
							resolve(res);
						}, (err) => {
							reject(err);
						}
					);
				}
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

	count_local_backuping_table(table: string) {
		return new Promise(
			(resolve, reject) => {
				this.db.count(table).then(
					(count) => {
						resolve(count);
					}, (err) => {
						reject(err);
					}
				);
			}
		)
	}
}
