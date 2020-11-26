import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './user';
import { environment } from './../environments/environment';
import { Repos } from './repos';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root',
})
export class SearchService {

  user:User; 
  repos:Repos[];

  constructor(private http: HttpClient) {
    this.user=new User("","","",0,new Date(),0,0)
    this.repos= []
  }
  getUser(name){
    var gitusername=name;
    interface ApiResponse{
      name: string,
      html_url: string,
      avatar_url: string,
      public_repos: number,
      created_at: Date,
      followers: number,
      following: number,
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/' + gitusername + '?access_token=' + environment.api_Key).toPromise().then(response => {
        this.user.username = response.name
        this.user.avatar_url = response.avatar_url
        this.user.html_url=response.html_url
        this.user.public_repos=response.public_repos
        this.user.created_at = response.created_at
        this.user.followers=response.followers
        this.user.following=response.following
        resolve()
      },
      error=>{
        console.log("Error")
        reject(error)
      })
    })
    return promise;
  }

  getRepos(name){
    var gitusername=name;

    interface ApiReponse{
      name:string,
      description:string,
      html_url: string,
      created_at:Date
    }
    let promises =new Promise((resolve,reject)=>{
      this.http.get<ApiReponse>('https://api.github.com/users/'+gitusername+'/repos?access_token='+ environment.api_Key).toPromise().then(response=>{
        for (let i in response){
          console.log(i)
          let repo=new Repos(Response[i].name,Response[i].description,Response[i].html_url,Response[i].created_at)
          this.repos.push(repo)
        }
        resolve()
      },
      error=>{
        console.log(error);
        reject(error)
      })
    })
    return promise
  }
}
