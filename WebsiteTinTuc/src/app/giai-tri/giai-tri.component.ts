import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewRssService } from '../Service/new-rss.service';
import * as xml2js from 'xml2js';import {Rss} from "../RssServer/Rss";
@Component({
  selector: 'app-giai-tri',
  templateUrl: './giai-tri.component.html',
  styleUrls: ['./giai-tri.component.css']
})
export class GiaiTriComponent implements OnInit {
  RssDataGiaiTri: Rss | any;
  constructor(private https:HttpClient,private newrssservice:NewRssService) { }

  ngOnInit(): void {this.GetRssFeedDataGiaiTri();
  }
  GetRssFeedDataGiaiTri() {
    this.newrssservice.GetRssGiaiTri().subscribe((data) => {
      var options = { mergeAttrs:true,tagNameProcessors: [xml2js.processors.stripPrefix] };
      let parseString = xml2js.parseString;
      parseString(data, options,(err, result: Rss) => {
        this.RssDataGiaiTri = result;
      });
    });
  }
}
