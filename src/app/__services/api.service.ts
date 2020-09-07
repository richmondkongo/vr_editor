import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from './g.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient, private g: GService) { }

	get_visite_virtuelle() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.g.links.visite_virtuelle, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	set_visite_virtuelle(libelle) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.g.links.visite_virtuelle, { libelle }, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	get_imgae_360() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.g.links.image_360, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	set_image_360(vr: string, base64: string, id: string, name: string = '', lastModified: string = "-1", size: number = -1) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.g.links.image_360, { id, vr, base64, name, lastModified, size }, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	get_hotspot() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.g.links.hotspot, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	set_hotspot(origin: string, to: string, coords: string ) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.g.links.hotspot, { origin, to, coords }, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	get_infospot() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.g.links.infospot, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	set_infospot(img: string, coords: string, info: string, txt_or_html: number = 0) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.g.links.infospot, { img, coords, info, txt_or_html }, this.g.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}
}
