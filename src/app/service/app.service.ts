import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    apikey = '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';
    constructor(private http: HttpClient) {

    }
    upload(file: File) {
        const url = "/api/upload";
        const formData = new FormData();
        formData.append('photo', file);
        console.log(formData);
        return this.http.post(url, formData, { reportProgress: true, responseType: 'json' });
    }

}