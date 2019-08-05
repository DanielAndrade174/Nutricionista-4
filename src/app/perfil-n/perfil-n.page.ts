import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Nutricionista } from '../model/nutricionista';

@Component({
  selector: 'app-perfil-n',
  templateUrl: './perfil-n.page.html',
  styleUrls: ['./perfil-n.page.scss'],
})
export class PerfilNPage implements OnInit {

  usuarioEmail: string;
  id: string;
  Nutricionista: Nutricionista = new Nutricionista();
  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }


  constructor(public activatedRoute: ActivatedRoute,
    public firebaseauth: AngularFireAuth,
    public router: Router,
    public fire: AngularFireAuth) {

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

  ngOnInit() {

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`nutricionista/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

  deslogar() {
    this.fire.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(() => {
      this.router.navigate(['/list']);
    })
  }

  edt() {
    this.router.navigate(['perfil-view']);
  }

  Home() {
    this.router.navigate(['/list']);
  }

}