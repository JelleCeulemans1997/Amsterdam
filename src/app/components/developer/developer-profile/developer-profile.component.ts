import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Developer } from 'src/app/models/developer.model';
import { Review } from 'src/app/models/review.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { LocationDefining } from 'src/app/models/location.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.component.html',
  styleUrls: ['./developer-profile.component.scss']
})
export class DeveloperProfileComponent implements OnInit {

  mailtoLink: string;
  telLink: string;
  developer: Developer;

  reviews: Review[] = [];
  splicedData: Review[] = [];

  reviewForm: FormGroup;

  starsShown: string[];

  user: Company;

  assignments: Assignment[];

  allowed = false;
  accepterByCompany: string[] = [];

  userId: string;
  role: string;

  constructor(
    private developerService: DeveloperService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private reviewService: ReviewService,
    private assignmentService: AssignmentService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.reviewForm = this.fb.group({
      text: ['', Validators.required]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.developerService.getByUserId(paramMap.get('userId')).subscribe(result => {
          this.mailtoLink = 'mailto:' + result.email;
          this.telLink = 'tel:' + result.phone;
          this.developer = result;
          console.log(result);
          if (result.reviews.length > 0) {
            this.reviews = result.reviews;
            this.splicedData = result.reviews.slice(((0 + 1) - 1) * 5).slice(0, 5);
          }
        });
        this.assignmentService.getAllAsignments().subscribe(response => {
          console.log(response.assignments);
          if (response.assignments) {
            response.assignments.forEach(element => {
              if (element.accepted) {
                element.accepted.forEach(item => {
                  this.accepterByCompany.push(item.accept);
                });
              }
            });
            const userId = this.userService.getUserId();
            this.allowed = this.accepterByCompany.includes(paramMap.get('userId'));
            console.log(userId);
            console.log(this.accepterByCompany);
            console.log(this.allowed);
          }
        });
      }
    });
    this.userId = this.userService.getUserId();
    this.userService.getUserbyId(this.userId).subscribe(res => {
      this.role = res.role;
      console.log(this.role);
    });
  }

  deleteReview(review: Review){
    const reviewId = this.developer.reviews.indexOf(review);
    this.developer.reviews.splice(reviewId, 1);
    this.reviews = this.developer.reviews;
    if (this.reviews.length < 5) {
      this.splicedData = this.reviews;
    } else {
      this.splicedData.splice(this.splicedData.indexOf(review), 1);
    }
    this.developerService.updateDeveloper(this.developer).subscribe(res => {
      console.log(res);
    }
    );

  }

  openDialog(review: Review) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: {option: 'yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'yes') {
        this.deleteReview(review);
      }

    });
  }



  onSubmit() {
    const stars = document.getElementsByClassName('selectedStar');
    const review: Review = { text: this.reviewForm.get('text').value, score: stars.length, userId: this.userService.getUserId() };
    console.log(review);
    this.reviews.push(review);
    this.developer.reviews = this.reviews;
    this.developerService.updateDeveloper(this.developer).subscribe();
  }

  onClick(star: number) {
    for (let i = 1; i <= 5; i++) {
      const starEl = document.getElementById('star' + i);
      if (i <= star) {
        starEl.classList.add('selectedStar');
        starEl.innerText = 'star';
      } else {
        starEl.classList.remove('selectedStar');
        starEl.innerText = 'star_border';
      }
    }
  }

  showStars(review: Review) {
    this.starsShown = [];
    for (let i = 0; i < 5; i++) {
      if (i < review.score) {
        this.starsShown.push('full');
      } else {
        this.starsShown.push('empty');
      }
    }
    return this.starsShown;
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.reviews.slice(offset).slice(0, event.pageSize);

  }




}
