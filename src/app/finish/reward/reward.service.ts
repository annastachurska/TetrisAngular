import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RewardService {
    url: string = 'https://api.chucknorris.io/jokes/random';

    constructor(private http: HttpClient) {
    }

    getJoke() {
        return this.http.get(this.url);
    }

}