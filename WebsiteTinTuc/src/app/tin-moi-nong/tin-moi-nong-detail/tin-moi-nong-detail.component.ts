import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rss } from 'src/app/RssServer/Rss';
import { NewRssDetailService } from 'src/app/Service/new-rss-detail.service';
import { NewRssService } from 'src/app/Service/new-rss.service';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-tin-moi-nong-detail',
  templateUrl: './tin-moi-nong-detail.component.html',
  styleUrls: ['./tin-moi-nong-detail.component.css']
})
export class TinMoiNongDetailComponent implements OnInit {
  RssDataTinMoiNong: Rss | any;
  index = 0;
  encoded: Array<string> | any;title: string = '';
  constructor(private https: HttpClient,
    private newrssservice: NewRssService,
    private newrssservicedetail: NewRssDetailService) { }

  ngOnInit(): void {this.GetRssFeedDataTinMoiNong();
  }
  GetRssFeedDataTinMoiNong() {
    this.newrssservice.GetRssTinMoiNong().subscribe((data) => {
      var options = {
        mergeAttrs: true,
        tagNameProcessors: [xml2js.processors.stripPrefix],
      };
      let parseString = xml2js.parseString;
      parseString(data, options, (err, result: Rss) => {
        this.RssDataTinMoiNong = result;
        this.encoded =
          this.RssDataTinMoiNong.rss.channel[0].item[
            this.newrssservicedetail.index
          ].encoded;this.title =
          this.RssDataTinMoiNong.rss.channel[0].item[
            this.newrssservicedetail.index
          ].title;
      });
    });
  }
}
