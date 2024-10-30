import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonLog } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'http://localhost:3000/'
 

  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient) { }

    postPerson(person:Person):Observable <Person>  {
      let urlPost = this.url + 'createUser'
      return this.http.post<Person>(`${urlPost}`, person, { headers: this.headers });

  }

  postLogin(person: PersonLog): Observable<{ token: string }> { 
    let urlPost = `${this.url}log/login`;
    return this.http.post<{ token: string }>(urlPost, person, { headers: this.headers });
  }

}
