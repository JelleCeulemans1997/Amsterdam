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

  // getAllDesc() {
  //   this.tagService.getAllDesc().subscribe(result => {
  //     console.log(result);
  //   });
  // }

  // createTag() {
  //   if (this.tag && this.tag !== '') {
  //     const tag: Tag = {
  //       id: null,
  //       name: this.tag,
  //       usages: 0
  //     };
  //     this.tagService.createTag(tag).subscribe(result => {
  //       console.log(result);
  //       this.tag = '';
  //       this.ngOnInit();
  //     });
  //   } else {
  //     // show snackbar that field is empty
  //   }
  // }

  // updateTag() {
  //   const tag: Tag = {
  //     id: '5dee4c6cc93f7069c461d0e2',
  //     name: 'C',
  //     usages: 400
  //   };
  //   this.tagService.updateTag(tag);
  // }

  // deleteTag(tagId: string) {
  //   this.tagService.deleteTag(tagId).subscribe(result => {
  //     console.log(result);
  //     this.ngOnInit();
  //   });
  // }
}
