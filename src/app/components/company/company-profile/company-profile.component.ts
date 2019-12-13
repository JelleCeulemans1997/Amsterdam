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

  user: Developer;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private userService: UserService,
    private reviewService: ReviewService) { }

  onSubmit() {
    const stars = document.getElementsByClassName('selectedStar');
    const review: Review = {text: this.reviewForm.get('text').value, score: stars.length, userId: this.userService.getUserId()};
    console.log(review);
    this.reviews.push(review);
    this.company.reviews = this.reviews;
    this.companyService.updateCompany(this.company).subscribe();
    if (this.reviews.length < 5) {
      this.splicedData.push(review);
    }
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
    if (!this.user) {
      this.reviewService.getDeveloperByUserId(review.userId).subscribe(res => {
        console.log(res);
        if (res) {
          this.user = res;
        } else {
          const location: LocationDefining = { city: '', street: '', nr: '', zipcode: '' };
          this.user = new Developer('User not found', '', '', '', '', '', '', new Date(), '', '', [], location, []);
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
      if (paramMap.has('creatorId')) {
        this.companyService.getCompanyByUserId(paramMap.get('creatorId')).subscribe(result => {
          this.mailtoLink = 'mailto:' + result.contact.email;
          this.telLink = 'tel:' + result.contact.phone;
          this.company = result;
          if(result.reviews){
            this.reviews = result.reviews;
            this.splicedData = result.reviews.slice(((0 + 1) - 1) * 5).slice(0, 5);
          }
          console.log(result);
        });
      }
    });
  }



}
