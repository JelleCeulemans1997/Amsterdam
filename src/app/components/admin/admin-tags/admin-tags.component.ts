import { Component, OnInit, ViewChild } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.scss']
})
export class AdminTagsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'usages', 'actions'];
  dataSource: any;
  tag: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getAllDesc().subscribe(result => {
      this.dataSource = new MatTableDataSource(result.tags);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // getAllDesc() {
  //   this.tagService.getAllDesc().subscribe(result => {
  //     console.log(result);
  //   });
  // }

  createTag() {
    if (this.tag && this.tag !== '') {
      const tag: Tag = {
        id: null,
        name: this.tag,
        usages: 0
      };
      this.tagService.createTag(tag).subscribe(result => {
        console.log(result);
        this.tag = '';
        this.ngOnInit();
      });
    } else {
      // show snackbar that field is empty
    }
  }

  // updateTag() {
  //   const tag: Tag = {
  //     id: '5dee4c6cc93f7069c461d0e2',
  //     name: 'C',
  //     usages: 400
  //   };
  //   this.tagService.updateTag(tag);
  // }

  deleteTag(tagId: string) {
    this.tagService.deleteTag(tagId).subscribe(result => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
