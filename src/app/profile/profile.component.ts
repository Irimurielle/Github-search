import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[SearchService]
})
export class ProfileComponent implements OnInit {

  user:User;

  gitusername="";
  constructor (private searchservice:SearchService) {
    
  }
  SearchName(){
    this.searchservice.getUser(this.gitusername)
  }

  ngOnInit(){
    this.searchservice.getUser('irimurielle')
    this.user=this.searchservice.user
  }
}
