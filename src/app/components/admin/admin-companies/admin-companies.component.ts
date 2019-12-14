import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';



@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.scss']
})
export class AdminCompaniesComponent implements OnInit {
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(result => {
      console.log(result);
      this.companies = result;
    });
  }

  // deleteCompany(companyId: string) {
  //   this.companyService.deleteCompany(companyId).subscribe(result => {
  //     console.log(result);
  //     this.ngOnInit();
  //     // delete also all the assignments of this company
  //   });
  // }



  // }
}
