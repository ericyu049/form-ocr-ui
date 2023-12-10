import { Component } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ocr-demo';
	file!: File;
	uploaded: boolean = false;

	imageUrl: string | ArrayBuffer | null = null;
	previewUrl: string | ArrayBuffer | null = null;
	reader!: FileReader;
	text: any;
	score: any;
	loading = false;
	constructor(private service: AppService) {
		this.reader = new FileReader();
		this.reader.onload = (e: any) => {
			this.previewUrl = e.target.result;
		};
	}
	inputChange(fileInputEvent: any) {
		const file: File = fileInputEvent.target.files[0];
		this.file = file;
		this.reader.readAsDataURL(file);
		console.log(file);
	}
	upload() {
		this.loading = true;
		this.service.upload(this.file).subscribe({
			next: (data: any) => {
				this.loading = false;
				this.uploaded = true;
				this.imageUrl = `data:image/png;base64,${data.image}`;
				this.score = data.score;
				this.text = JSON.parse(data.text);
				console.log(this.text)
			}
		});
	}
	cancel() {
	}
}
