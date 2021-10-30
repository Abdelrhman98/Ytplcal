import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { videoStructure } from './videos';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //private url = "../../assets/data.json";
  //private url = "https://ytplcal.herokuapp.com/playlist?id=https://www.youtube.com/playlist?list=PLYknlDiw2kSwdDhTSDoX7ZoVEle8nbZdk";
  constructor(private http:HttpClient) { }
  private apiurl = "https://ytplcal.herokuapp.com/playlist?id=";
  public getJSON(url){
      return this.http.get<videoStructure>(this.apiurl+url);
  }

  

}
