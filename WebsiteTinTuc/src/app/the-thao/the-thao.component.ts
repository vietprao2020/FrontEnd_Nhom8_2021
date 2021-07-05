import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewRssService } from '../Service/new-rss.service';
import * as xml2js from 'xml2js';import { Rss } from '../RssServer/Rss';
@Component({
  selector: 'app-the-thao',
  templateUrl: './the-thao.component.html',
  styleUrls: ['./the-thao.component.css']
})
export class TheThaoComponent implements OnInit {
  RssDataTheThao: Rss|any;
  constructor(private https:HttpClient,private newrssservice:NewRssService) { }

  ngOnInit(): void {   this.GetRssFeedDataTheThao();
  }
  GetRssFeedDataTheThao() {
    this.newrssservice.GetRssTheThao().subscribe((data) => {
      var options = { mergeAttrs:true,tagNameProcessors: [xml2js.processors.stripPrefix] };
      let parseString = xml2js.parseString;
      parseString(data, options, (err, result: Rss) => {
        this.RssDataTheThao = result;
      });
    });
  }
}
