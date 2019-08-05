import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Mensagem } from '../model/mensagem';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  idUsuario : string;
  listaDeUsuarios: Usuario[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  filtroBox = 'none'

  idList : String[] = [];

  constructor(public router: Router, public loadingController: LoadingController) {
    
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

 getList() {
    
    var ref = firebase.firestore().collection("usuario")
    ref.get().then(doc => {

      doc.forEach(item =>{
        let n = new Usuario();
        n.id = item.id;
        n.setDados(n);
        this.listaDeUsuarios.push(n);
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

