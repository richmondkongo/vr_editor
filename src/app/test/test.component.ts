import { Component, OnInit } from '@angular/core';
import { ApiService } from '../__services/api.service';
import { LocalSaveService } from '../__services/local-save.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	constructor(private api: ApiService, private db: LocalSaveService) { }

	ngOnInit(): void {
	}
}