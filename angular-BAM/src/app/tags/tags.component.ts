import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../tag';
import { TagWithId } from '../tag';
import { TagsService } from '../services/tags.service';



@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() performerName: string;  
  tagId: number;
  tagsList: TagWithId[] = null;
  currTag: Tag = {
    tag: '',
    groupName: ''
  }
  performerTagsList: TagWithId[] = null;
  
  tagById: TagWithId;
  constructor(public tagsServices: TagsService) { }

  ngOnInit(): void {
  }


  getTags(): void{
    this.tagsServices.getTags()
    .then(response => this.tagsList = response);
  }

  getTagById(): void {
    this.tagsServices.getTagById(this.tagId)
    .then(response => this.tagById = response);
    this.tagId = null;
  }

  createTag(): void {
    this.tagsServices.postTag(this.currTag);
  }

  removeTag(): void {
    this.tagsServices.removeTag(this.tagId);
    this.tagId = null;
  }

  getGroupTags(): void {
    this.tagsServices.getTagsByGroupName(this.performerName)
    .then(response => this.performerTagsList = response);
  }

  back(): void {
    this.tagsList = null;
  }
}
