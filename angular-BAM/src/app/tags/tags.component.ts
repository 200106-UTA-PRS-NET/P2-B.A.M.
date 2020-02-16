import { Component, OnInit } from '@angular/core';
import { Tag } from '../tag';
import { TagsService } from '../Services/tags.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagId: number;
  tagsList: Tag[] = null;
  currTag: Tag = {
    tag: '',
    groupName: ''
  }

  constructor(public tagsServices: TagsService) { }

  ngOnInit(): void {
  }


  getTags(): void{
    this.tagsServices.getTags()
    .then(response => this.tagsList = response);
  }

  getTagById(): void {
    this.tagsServices.getTagById(this.tagId)
    .then(response => this.currTag = response);
  }

  createTag(): void {
    this.tagsServices.postTag(this.currTag);
  }
}
