import { Component, OnInit, ViewChild } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  displayedColumns: string[] = ['name', 'usages', 'actions'];
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getAllDesc().subscribe(result => {
      this.dataSource = new MatTableDataSource(result.tags);
      this.dataSource.sort = this.sort;
    });
  }

  getAllDesc() {
    this.tagService.getAllDesc().subscribe(result => {
      console.log(result);
    });
  }

  createTag() {
    const tag: Tag = {
      id: null,
      name: 'C',
      usages: 200
    };
    this.tagService.createTag(tag);
  }

  updateTag() {
    const tag: Tag = {
      id: '5dee4c6cc93f7069c461d0e2',
      name: 'C',
      usages: 400
    };
    this.tagService.updateTag(tag);
  }

  deleteTag() {
    this.tagService.deleteTag('5dee6afb5b816a7f808bab5f');
  }
}
