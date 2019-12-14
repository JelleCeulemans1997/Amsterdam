import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/app/services/developer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Developer } from 'src/app/models/developer.model';
import { Review } from 'src/app/models/review.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { LocationDefining } from 'src/app/models/location.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';

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

  allowed: boolean = false;


  constructor(
    private developerService: DeveloperService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private reviewService: ReviewService,
    private assignmentService: AssignmentService) { }

  onSubmit() {
    const stars = document.getElementsByClassName('selectedStar');
    const review: Review = {text: this.reviewForm.get('text').value, score: stars.length, userId: this.userService.getUserId()};
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

  getUser(review: Review) {
    if (!this.user){
      this.reviewService.getCompanyByUserId(review.userId).subscribe(res => {
        console.log(res);
        if (res) {
          this.user = res;
        } else {
          const location: LocationDefining = { city: '', street: '', nr: '', zipcode: '' };
          this.user = new Company('', 'Company not found', '', null, null, [], '', []);
          console.log(this.user);
        }
      });
    }
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.reviews.slice(offset).slice(0, event.pageSize);
  }

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
          if (result.reviews) {
            this.reviews = result.reviews;
            this.splicedData = result.reviews.slice(((0 + 1) - 1) * 5).slice(0, 5);
          }
          console.log(result);
        });
        this.userService.getUserbyId(paramMap.get('userId')).subscribe(res => {
          this.assignmentService.getAllAsignments().subscribe(response => {
            this.assignments = response.assignments;
            this.assignments.forEach(assignment => {
              assignment.applies.forEach(apply => {
                if (apply === this.developer.userId) {
                  this.allowed = true;
                }
              });
            });
          });
        });
      }
    });
  }
}
