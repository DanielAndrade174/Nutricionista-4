import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Nutricionista } from './model/nutricionista';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  usuarioEmail: string;
  id: string;
  Nutricionista: Nutricionista = new Nutricionista();
  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }

  public appPages = [
    {
      title: 'Inicio',
      url: '/list',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'md-exit'
    },
    {
      title: 'Lista de Usuários',
      url: '/lista-de-usuarios',
      icon: 'book'
    }
  ];
// 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router,
    public activatedRoute: ActivatedRoute,
  ) {
    this.initializeApp();

    this.id = this.activatedRoute.snapshot.paramMap.get('nutricionista');

    this.firebaseauth.authState.subscribe(obj => {

      this.id = this.firebaseauth.auth.currentUser.uid;
      this.usuarioEmail = this.firebaseauth.auth.currentUser.email;

      this.downloadFoto();

      let ref = this.firestore.collection('nutricionista').doc(this.id)
      ref.get().then(doc => {
        this.Nutricionista.setDados(doc.data());
        this.Nutricionista.id = doc.id;
        console.log(this.Nutricionista);

      })

    });
  }
  

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
    .subscribe(
      user => {
        if (!user) {

          this.router.navigate(['/home']);
        }
      },
      () => {
       // this.router.navigate(['/list']);
      }
    );

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`nutricionista/${this.id}.jpg`);
  
    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

  Perfil() {
    this.router.navigate(['/perfilN']);
  }

}
