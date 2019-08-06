import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  id: string;
  Nutricionista: Nutricionista = new Nutricionista();
  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public navctrl : NavController, public router : Router, private firebaseauth : AngularFireAuth,) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.firebaseauth.authState.subscribe(obj => {

      this.id = this.firebaseauth.auth.currentUser.uid;

      this.downloadFoto();

      let ref = this.firestore.collection('nutricionista').doc(this.id)
      ref.get().then(doc => {
        this.Nutricionista.setDados(doc.data());
        this.Nutricionista.id = doc.id;
      })
    });
}

ngOnInit() {

}

Perfil() {
  this.router.navigate(['/perfil-n']);
}

downloadFoto() {
  let ref = firebase.storage().ref()
    .child(`nutricionista/${this.id}.jpg`);

  ref.getDownloadURL().then(url => {
    this.picture = url;
  })
}

  ListaDeUsuarios(){
    this.router.navigate(['/lista-de-usuarios'])
  }

  cadastrar(){
    
    this.router.navigate(['/lista-de-clientes', { id: '12' }]);
     
   }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
