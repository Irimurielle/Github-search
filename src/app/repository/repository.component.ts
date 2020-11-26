import { Component, OnInit } from '@angular/core';
import { Repos } from '../repos'
import { User } from '../user'
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers:[SearchService]
})
export class RepositoryComponent implements OnInit {
  user:User;
  repos:Repos[];

  gitusername="";
  constructor(private searchservice:SearchService) { }

  SearchRepo(){
    this.searchservice.getUser(this.gitusername)
    this.searchservice.getRepos(this.gitusername)
  }

  ngOnInit(): void {
    this.searchservice.getUser('irimurielle')
    this.user=this.searchservice.user
    this.searchservice.getRepos('irimurielle')
    this.repos=this.searchservice.repos
    console.log(this.repos)
  }

}

