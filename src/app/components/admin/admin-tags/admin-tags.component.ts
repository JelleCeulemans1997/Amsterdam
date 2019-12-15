import { Component, OnInit, ViewChild } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
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
  dbTags: Tag[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private tagService: TagService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.tagService.getAllDesc().subscribe(result => {
      console.log(result.tags);
      this.dbTags = result.tags;
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
    if (this.tag && this.tag !== '' && !this.dbTags.find(t => t.name === this.tag)) {
      const tag: Tag = {
        id: null,
        name: this.tag,
        usages: 0
      };
      this.tagService.createTag(tag).subscribe(result => {
        this.tag = '';
        this.ngOnInit();
      });
    } else {
      this.snackbar.open('Field empty or Tag already exists', 'Error', {
        duration: 3000
      });
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
