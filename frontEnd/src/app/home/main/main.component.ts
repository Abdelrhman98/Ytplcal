import  { Component, OnInit }  from '@angular/core';
import  { SearchService }      from 'src/app/search/search.service';
declare var Parallax: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public link     :string;
  public pattern  : string | RegExp;
  public requested:boolean = true;
  public retrieved:boolean = false;
  public playlist;
  constructor ( private ser:SearchService ) {}

  test(){
    this.isValidLink();
  }

  isValidLink(){
    var loader = document.getElementById('loader');
    if(this.requested && this.link.search("list=") >=0 && this.link.search("https://www.youtube.com/")>=0){
      this.ser.getJSON(this.link).subscribe(
        data=>{
          this.playlist = data.data;
          loader.classList.add("slide-out-bck-center")
          this.retrieved = true;
      })
      this.requested = false;
      this.trigAnmiationForSearch();
      
    }
  }

  trigAnmiationForSearch(){
    var lightElement  = document.getElementById('light'),
        searchSection = document.getElementById('search'),
        resultSection = document.getElementById('result');
    lightElement.classList.remove('light-on');
    lightElement.classList.add('slide-right-left');
    searchSection.classList.add('scale-out-hor-right');
    
    setTimeout(function(){
      searchSection.style.display = "none";
      resultSection.style.display = "block";
      resultSection.classList.add('slide-in-right')
      
    },730)
    setTimeout(function(){
    lightElement.classList.add('light-on');
    },1000);
    
  }





  selectIt($event){
    var parentEle = $event.srcElement.parentElement.parentElement;
    if(parentEle.classList.contains('gray0')){
      parentEle.classList.remove('gray0','scale-down-center');
    }else
      parentEle.classList.add('gray0','scale-down-center');
    //$event.srcElement.classList.add('gray0')
    
  }



  ngOnInit() {
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      clipRelativeInput: true,
      invertX:false,
      invertY:false,
      //scalarX:30.0,
      //scalarY:50.0
      //frictionX:0.1
    });
    parallaxInstance.friction(0.2, 0.2);
    const element = document.querySelector('.anime-chain');
    element.classList.add('flicker-2');
    setTimeout(function () {
      element.classList.remove('flicker-2');
      element.classList.add('animated', 'flash', 'faster');
      element.classList.add('light-on');
      //element.classList.remove('animated', 'flash', 'faster');
    }, 1000);
    

    //element.classList.remove('animated','bounce');
    //console.log(element);
    //this.trigAnmiationForSearch();
  }
}