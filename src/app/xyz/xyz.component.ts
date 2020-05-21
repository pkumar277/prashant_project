import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})


export class XyzComponent {
  public xmlItems: any;
  constructor(private _http: HttpClient) { this.loadXML(); }
  loadXML() {
    this._http.get('/assets/users.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
  }
  parseXML(data) {
    return new Promise(resolve => {
      // tslint:disable-next-line: one-variable-per-declaration
      let k: string | number;
      // tslint:disable-next-line: one-variable-per-declaration
      const arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        const obj = result.Employee;
        // tslint:disable-next-line: forin
        for (k in obj.emp) {
          const item = obj.emp[k];
          arr.push({
            id: item.id[0],
            name: item.name[0],
            gender: item.gender[0],
            mobile: item.mobile[0]
          });
        }
        resolve(arr);
      });
    });
  }
}
