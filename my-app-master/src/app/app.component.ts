import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Power4, Back } from 'gsap/all';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MySnackBarComponent } from './my-snack-bar/my-snack-bar.component';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';

gsap.registerPlugin(ScrollTrigger, Power4, Back);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = "Americo's Website";
  @ViewChild('cont') content: ElementRef;
  durationInSeconds = 5;

  constructor(
    public fun: AngularFireFunctions,
    public http: HttpClient,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.animate();
  }

  animate() {
    var tl = gsap.timeline();

    tl.from('.content', {
      y: '-30%',
      opacity: 0,
      duration: 2,
      ease: Power4.easeOut,
    });

    tl.from(
      '.stagger1',
      {
        opacity: 0,
        y: -50,
        stagger: 0.3,
        duration: 2,
        ease: Power4.easeOut,
      },
      '-=1.5'
    );

    tl.from(
      '.hero-design',
      {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: Power4.easeOut,
      },
      '-=2'
    );

    gsap.from('.square-anim', {
      stagger: 0.2,
      scale: 0.01,
      duration: 1,
      ease: Back.easeOut.config(1.7),
    });

    gsap.from('.transition2', {
      scrollTrigger: {
        trigger: '.transition2',
        start: 'top bottom',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
    });

    gsap.from('.transition3', {
      scrollTrigger: {
        trigger: '.transition3',
        start: 'top bottom',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
    });
  }

  scrollToAboutMe() {
    document.getElementById('AboutMe').scrollIntoView({ behavior: 'smooth' });
  }

  scrollToFeaturedProject() {
    document
      .getElementById('FeaturedProject')
      .scrollIntoView({ behavior: 'smooth' });
  }

  scrollToWork() {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSkills() {
    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.data = 'This tesxt';

    let dialofRef = this.dialog.open(MyDialogComponent, dialogConfig);

    dialofRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      if (result != undefined && result.email && result.message) {
        this.sendMail(result.email, result.message);
      }
    });
  }

  sendMail(emailAddress, content) {
    const callable = this.fun.httpsCallable('newGenericEmail');
    callable({
      to: 'americoperez49@gmail.com',
      from: emailAddress,
      subject: 'Doesnt matter',
      text: content,
    })
      .toPromise()
      .then((response) => {
        console.log(response);
        if (response) {
          this.openSnackBar('yay');
        } else {
          this.openSnackBar('nay');
        }
      })
      .catch((err) => {
        console.log(err);
        this.openSnackBar('nay');
      });

    // let url = 'https://us-central1-americo-perez.cloudfunctions.net/newHttpEmail'
    // var param ={
    //   "to":"americoperez49@gmail.com",
    //   "from":emailAddress,
    //   "content":content
    // }
    // let myHeaders = new HttpHeaders({
    //   'Content-Type':'application/json',
    //   'Access-Control-Allow-Origin':'*'
    // })
    // let options = { headers: myHeaders };

    // return this.http.post(url,param,options)
    //                 .toPromise()
    //                 .then(res=>{
    //                   console.log(res)
    //                   this.openSnackBar("yay")
    //                 })
    //                 .catch(err=>{
    //                   console.log(err);
    //                   this.openSnackBar("nay")

    //                 })
  }

  openSnackBar(status: string) {
    this.snackBar.openFromComponent(MySnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: status,
    });
  }
}
