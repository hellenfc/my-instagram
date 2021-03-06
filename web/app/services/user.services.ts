import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {User} from '../classes/user.ts';
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  constructor(public http : Http){}

  login(username:string, password:string){
    return new Observable(observable => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http.post('/login', JSON.stringify({
        username: username, password: password
      }), {headers : headers}).map(res => res.json())
      .subscribe(res => {
        if(res.code == "404" || res.code == "500"){
          console.error('Brutal error');
        }else{
          observable.next(res);
        }
      })
    })
  }

  logout(){
    window.localStorage.removeItem("token");
  }

  isAuth(){
    if(window.localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  getToken(){
    return window.localStorage.getItem("token");
  }
}
