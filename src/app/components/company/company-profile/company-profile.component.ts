import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  mailtoLink: string;
  telLink: string;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('creatorId')) {
        this.companyService.getCompanyByUserId(paramMap.get('creatorId')).subscribe(result => {
          this.mailtoLink = 'mailto:' + result.contact.email;
          this.telLink = 'tel:' + result.contact.phone;
          this.company = result;
          console.log(result);
        });
      }
    });
  }

}
