import { Component } from '@angular/core';
import {PopoverController, ToastController} from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormularioService } from '../sevices/formulario.service';
import { Formulario } from '../shared/formulario.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public essencias: Formulario[]

  constructor(private popoverController: PopoverController, private route: ActivatedRoute, private router: Router,
              private formularioService: FormularioService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.getListaEssencias()
  }

  getListaEssencias(){
    this.formularioService.getEssencias().subscribe(
        (forms: Formulario[]) => {
          this.essencias = forms
        }, () => {this.showToast("Falha ao buscar pelas Essências!")}
    )
  }

  async openPopover(){
    const popover = await this.popoverController.create({
      component: PopoverPage,
      translucent: true,
      animated: true
    })
    popover.present()
  }

  deleteEssencia(id: number){
    this.formularioService.deleteEssencia(id).subscribe(
        () => {
          this.getListaEssencias()
        },
        () => {this.showToast('Falha ao deletar essencia')}
    )
  }

 /* atualizarEssencia(essencia: Formulario){
    this.formularioService.editaEssencia(essencia).subscribe(
        () => { this.router.navigateByUrl('/') },
        () => { this.showToast('Falha ao atualizar Essência') }
    )
  }*/

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
