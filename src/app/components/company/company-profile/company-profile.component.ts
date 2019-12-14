import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';
import { Review } from 'src/app/models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { Developer } from 'src/app/models/developer.model';
import { LocationDefining } from 'src/app/models/location.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  mailtoLink: string;
  telLink: string;

  reviews: Review[] = [];
  splicedData: Review[] = [];

  reviewForm: FormGroup;

  starsShown: string[];

  user: User;
  userId: string;
  dev: Developer;

  allowed: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private userService: UserService,
    private reviewService: ReviewService,
    private assignmentService: AssignmentService) { }

  onSubmit() {
    this.assignmentService.getAllByCompany(this.company.userId).subscribe(res => {
      const assignments = res.assignments;
      console.log(res);
      assignments.forEach(assignment => {
        if (assignment.applies.includes(this.user)) {
          const stars = document.getElementsByClassName('selectedStar');
          const review: Review = { text: this.reviewForm.get('text').value, score: stars.length, userId: this.userId };
          console.log(review);
          this.reviews.push(review);
          this.company.reviews = this.reviews;
          this.companyService.updateCompany(this.company).subscribe();
          if (this.reviews.length < 5) {
            this.splicedData.push(review);
          }
        } else {
          this.allowed = false;
        }
      })
    });
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


  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.userService.getUserbyId(this.userId).subscribe(res => {
      this.user = res;
    });
    this.reviewForm = this.fb.group({
      text: ['', Validators.required]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('creatorId')) {
        this.companyService.getCompanyByUserId(paramMap.get('creatorId')).subscribe(result => {
          this.mailtoLink = 'mailto:' + result.contact.email;
          this.telLink = 'tel:' + result.contact.phone;
          this.company = result;
          if (result.reviews) {
            this.reviews = result.reviews;
            this.splicedData = result.reviews.slice(((0 + 1) - 1) * 5).slice(0, 5);
          }
          console.log(result);
        });
      }
    });
  }



}
