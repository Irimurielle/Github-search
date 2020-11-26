import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './user';
import { environment } from './../environments/environment';
import { Repos } from './repos';
@Injectable({
  providedIn: 'root',
})
export class SearchService {

  user:User; 
  repos:Repos[];

  constructor(private http: HttpClient) {
    this.user=new User("","",0,0,0,new Date(),"")
    this.repos= []
  }
  getUser(name){
    var gitusername=name;
    interface ApiResponse{
      name: string,
      avatar_url: string,
      following: number,
      followers: number,
      public_repos: number,
      created_at: Date,
      html_url: string,

    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/' + gitusername + '?access_token=' + environment.api_Key).toPromise().then(response => {
        this.user.username = response.name
        this.user.avatar_url = response.avatar_url
        this.user.following=response.following
        this.user.followers=response.followers
        this.user.public_repos=response.public_repos
        this.user.created_at = response.created_at
        this.user.html_url=response.html_url
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
      created_at:Date
    }
    let promises =new Promise((resolve,reject)=>{
      this.http.get<ApiReponse>('https://api.github.com/users/'+ gitusername +'/repos?access_token='+ environment.api_Key).toPromise().then(response=>{
          for (var i in response){
            console.log(i)
            this.repos.push(new Repos(response[i].name,response[i].description, response[i].created_at))
          }
          resolve()
      },
      error=>{
            
              reject(error)
          }
      )
  })
  
  return promises
  }
}
