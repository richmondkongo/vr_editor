import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-splashscreen',
	templateUrl: './splashscreen.component.html',
	styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	go_to_image_selection() {
		this.router.navigate(['/image-selection']);
	}

}
