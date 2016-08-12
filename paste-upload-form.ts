import {Component} from '@angular/core';
import {Grid, Column} from 'modules/grid/grid';

@Component({
	selector:			'paste-upload-form',
	template:			`
		<input class="form-control max-width" #headers>
		<textarea class="black-text max-width" #pasteValue rows=15></textarea>
		<div>
			<button class="btn btn-primary" (click)="processValue(pasteValue.value, headers.value)">Process</button>
			<button class="btn btn-danger" (click)="headers.value=null;pasteValue.value=null;">Clear</button>
			<button class="btn btn-primary" (click)="showJSON=!showJSON"><span *ngIf="showJSON">Hide</span><span *ngIf="!showJSON">Show</span> JSON</button>
			Type: <select class="black-text"><option *ngFor="let option of options" [value]="option.value">{{option.label}}</option></select>
		</div>
		<p *ngIf="showJSON">{{parsedValue | json}}</p>
		<grid [rows]="gridRows" [columns]="gridColumns"></grid>
	`,
	directives:		[Grid]
})

export class PasteUploadForm {
	gridRows = [], gridColumns = [];
	options = [
		{value: "Contact", label: "Contact"},
		{value: "County", label: "County"}
	];
 	
 	processValue = (val, hdrs) => {
		let headers = [],
				parsedValue = [],
				pArray = val.split('\n');
		this.gridColumns = [];
		headers = hdrs ? hdrs.split(',') : pArray[0].split('\t');
		pArray.forEach((x, i) => {
			let recArray = x.split('\t');
			if(!hdrs & i!=0 || hdrs) {
				let obj = {};
				headers.forEach((h, j) => {
					obj[headers[j]] = recArray[j];
				});
				parsedValue.push(obj);
			}
		});
		
		this.parsedValue = parsedValue;
		headers.forEach(x => {
			this.gridColumns.push(new Column(x, x));
		});
		this.gridRows = parsedValue;
	}
}