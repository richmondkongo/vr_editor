import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GService {
	server_address = `http://localhost:8000/`
	links = {
		visite_virtuelle: `${this.server_address}visite-virtuelle/`,
		image_360: `${this.server_address}image-360/`,
		hotspot: `${this.server_address}hotspot/`,
		infospot: `${this.server_address}infospot/`
	}
	constructor() { }

	getHttpOptions () {
		const httpOptions = {
		   headers: new HttpHeaders({
			  'Content-Type' :  'application/json',
			//   'Authorization': 'Bearer ' + localStorage.token,
		   })
		};
		
		return httpOptions;
	 }
}
