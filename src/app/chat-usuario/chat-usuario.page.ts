import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mensagem } from '../model/mensagem';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario-nutri',
  templateUrl: './chat-usuario.page.html',
  styleUrls: ['./chat-usuario.page.scss'],
})
export class ChatUsuarioPage implements OnInit {

  idNutricionista: string;
  idUsuario: string;
  Usuario: Usuario = new Usuario();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  conversa: Mensagem[] = [];

  formGroup: FormGroup;
  @ViewChild('txtarea') txtarea;


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    public firebaseauth: AngularFireAuth,
    private formBuilder: FormBuilder, ) {

    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('usuario');

    this.firebaseauth.authState.subscribe(obj => {
      this.idNutricionista = this.firebaseauth.auth.currentUser.uid;

      console.log(this.idNutricionista)


    });

  }

  ngOnInit() {

    this.obterPerfil();

    let ref = this.firestore.collection('nutricionista').doc(this.idNutricionista).collection("mensagem").orderBy("data", "asc");
    ref.onSnapshot(doc => {

      doc.docChanges().forEach(c => {

        if (c.doc.data().para == this.idUsuario || c.doc.data().de == this.idUsuario) {
          let m = new Mensagem();

          m.setDados(c.doc.data());
          m.idSender = c.doc.data().de
          this.conversa.push(m);
          console.log(this.conversa);
        }
      })

    });

  }

  obterPerfil() {
    var ref = firebase.firestore().collection("usuario").doc(this.idUsuario);

    ref.get().then(doc => {
      this.Usuario.setDados(doc.data());
      this.Usuario.id = doc.id;
      this.downloadFoto();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`usuario/${this.idUsuario}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }


  atualiza() {
    let ref = this.firestore.doc('mensagem/' + this.idNutricionista).collection(this.idUsuario);
    ref.get().then(doc => {
      doc.forEach(c => {

        let m = new Mensagem();
        m.setDados(c.data());
        this.conversa.push(m);

      })

    })

  }

  enviarMensagem() {

    this.formGroup = this.formBuilder.group({
      data: [new Date()],
      mensagem: [this.txtarea.value],
      de: [this.idNutricionista],
      para: [this.idUsuario],

    });


    let ref = this.firestore.collection('usuario').doc(this.idUsuario).collection("mensagem").add(this.formGroup.value)
      .then(resp => {
        console.log('Cadastrado com sucesso');
        this.enviarNutricionista();
      }).catch(function () {
        console.log('Erro ao cadastrar');
      })

  }

  enviarNutricionista() {

    let ref = this.firestore.collection('nutricionista').doc(this.idNutricionista).collection("mensagem").add(this.formGroup.value)
      .then(resp => {
        console.log('Cadastrado com sucesso');
      }).catch(function () {
        console.log('Erro ao cadastrar');
      })
  }

  Home() {
    this.router.navigate(['/lista-de-usuarios']);
  }

}
