import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewRssService } from '../Service/new-rss.service';
import {Rss} from "../RssServer/Rss";
import * as xml2js from 'xml2js';
import {NewRssDetailService} from "../Service/new-rss-detail.service";
@Component({
  selector: 'app-giao-duc',
  templateUrl: './giao-duc.component.html',
  styleUrls: ['./giao-duc.component.css']
})
export class GiaoDucComponent implements OnInit {
  RssDataGiaoDuc: Rss | any;
  constructor(private https:HttpClient,private newrssservice:NewRssService,private newrssservicedetail: NewRssDetailService) { }

  ngOnInit(): void {this.GetRssFeedDataGiaoDuc();
  }
  GetRssFeedDataGiaoDuc() {
    this.newrssservice.GetRssGiaoDuc().subscribe((data) => {
      var options = { mergeAttrs:true,tagNameProcessors: [xml2js.processors.stripPrefix] };
      let parseString = xml2js.parseString;
      parseString(data,options, (err, result: Rss) => {
        this.RssDataGiaoDuc = result;
      });
    });
  }
  getRssDetail(index: number) {
    this.newrssservicedetail.index = index;
  }
  countHours(i:number){
    var datenews = new Date(this.RssDataGiaoDuc?.rss.channel[0].item[i].pubDate);
    var currentDate = new Date(Date.now());
    if(datenews.getDate()==currentDate.getDate()&& datenews.getMonth()==currentDate.getMonth()&& datenews.getFullYear()==currentDate.getFullYear()){
      if(datenews.getHours()!=currentDate.getHours())
        return currentDate.getHours()-datenews.getHours()+" giờ trước";
      else{
        return currentDate.getMinutes()-datenews.getMonth()+" phút trước";
      }
    }
    return 0;

  }
}
