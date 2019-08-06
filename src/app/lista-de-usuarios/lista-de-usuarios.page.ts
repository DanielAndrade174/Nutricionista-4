import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Mensagem } from '../model/mensagem';
import { Nutricionista } from '../model/nutricionista';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  id: string;
  Nutricionista: Nutricionista = new Nutricionista();
  picture: string = "../../assets/imagens/1.gif";

  listaDeUsuarios: Usuario[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  filtroBox = 'none'

  idList : String[] = [];

  constructor(public router: Router, public loadingController: LoadingController, private firebaseauth : AngularFireAuth,) {
    
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
  this.getList();
  }

  Chat(obj: Usuario) {
    this.router.navigate(['/chat-usuario', { 'usuario': obj.id }]);
  }

  perfilUsuario(obj: Usuario) {
    this.router.navigate(['/perfil-usuario', { 'usuario': obj.id }]);
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`nutricionista/${this.id}.jpg`);
  
    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

 getList() {
    
    var ref = firebase.firestore().collection("usuario")
    ref.get().then(doc => {

      doc.forEach(item =>{

        let n = new Usuario();
        n.id = item.id;

        var ref = firebase.firestore().collection("usuario").doc(n.id).get().then(doc =>{
          n.nome = doc.data().nome;
          n.setDados(n);
          this.listaDeUsuarios.push(n);
        });
      });

      console.log(this.listaDeUsuarios);
    
       });
   
  }

  Perfil() {
    this.router.navigate(['/perfil-n']);
  }

  Home() {
    this.router.navigate(['/list']);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();


  }

  showFilter(){
    if(this.filtroBox=='none')
      this.filtroBox = 'block'
    else
      this.filtroBox = 'none'
  }
}

