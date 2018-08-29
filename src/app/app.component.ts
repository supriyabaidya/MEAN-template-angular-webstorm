import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/catch';

import {RestApiService} from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url = 'http://localhost:3030/test';
  message: string;

  constructor(private http: Http, private restApi: RestApiService) {
  }

  async serverTest() {
    this.http.get(this.url)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        return Observable.throw(err.json());
      })
      .subscribe(
        data => this.message = Date() + 'Response: ' + data['message'],
        error => console.error(error)
      );
  }

  async serverTestNew() {
    const dataReceived = await this.restApi.get(this.url);
    this.message = Date() + ' Response new: ' + dataReceived['message'];
  }
}
