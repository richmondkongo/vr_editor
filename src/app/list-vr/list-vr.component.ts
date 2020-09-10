import { Component, OnInit } from '@angular/core';
import { ApiService } from '../__services/api.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-list-vr',
	templateUrl: './list-vr.component.html',
	styleUrls: ['./list-vr.component.scss']
})
export class ListVrComponent implements OnInit {
	visites: any[] = [];
	constructor(private api: ApiService, private router: Router) { }

	ngOnInit(): void {
		this.api.get_visite_virtuelle().then(
			(res: any) => {
				this.visites = res;
				// console.log(res)
			}, (err) => {
				console.error(err);
			}
		);
	}

	nb_images(img: any[]) {
		return img.length;
	}

	go_to_visite(i: number) {
		localStorage.visite = JSON.stringify(this.visites[i]);
		// this.router.navigate([`/viewer/${this.visites[i].id}`]);
		this.router.navigate([`/viewer`]);
	}
}
