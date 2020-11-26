import { Component, OnInit } from '@angular/core';
import { Repos } from '../repos';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  providers:[SearchService]
})
export class RepositoryComponent implements OnInit {

  repos:Repos[];

  gitusername="";
  constructor(private searchservice:SearchService) { }

  SearchRepo(){
    this.searchservice.getRepos(this.gitusername)
  }

  ngOnInit(): void {
    this.searchservice.getRepos('irimurielle')
    this.repos=this.searchservice.repos
    console.log(this.repos)
  }

}

