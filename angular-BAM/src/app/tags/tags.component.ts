import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../tag';
import { TagWithId } from '../tag';
import { TagsService } from '../Services/tags.service';



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
    this.currTag.groupName = this.performerName;
    this.tagsServices.postTag(this.currTag);
    this.currTag.tag = '';
    this.currTag.groupName = '';
  }

  removeTag(): void {
    this.tagsServices.removeTag(this.tagId);
    this.tagId = null;
  }

}
