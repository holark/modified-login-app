import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public githubUserQuery: any;
  repoData: any =[];

  constructor(private dataService: DataService) {
    this.githubUserQuery = "";
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.githubUserQuery);
    this.dataService.getGitUserData(this.githubUserQuery).subscribe(
      (res: any) => {
        console.log(res);
        if(res.success) {
          this.repoData = res.data
        } else {
          console.log(res.msg);
        }
      }, error => {
        console.log(error)
      }
    )
  }

}
