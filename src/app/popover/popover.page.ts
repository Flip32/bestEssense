import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../sevices/formulario.service';
import { Formulario } from '../shared/formulario.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  public formularioReativo: FormGroup = new FormGroup({
    'avaliacao': new FormControl(null, [Validators.required]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    'marca': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    'sabor': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
  })

  public form: Formulario = {
    avaliacao: null,
    nome: '',
    marca: '',
    sabor: '',
  }


  constructor(private popoverController: PopoverController, private toastCtrl: ToastController,
              private router: Router, private activatedRoute: ActivatedRoute,
              private formularioService: FormularioService) { }

  ngOnInit() {  }


  closePopover(){
    this.popoverController.dismiss();
  }

  adicionarEssencia(){
    this.formularioService.addEssencia(this.form).subscribe(
        () => {this.router.navigateByUrl('/')},
        () => {this.showToast('Houve um problema ao adicionar essencia.')}
    )
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  confrimarEnvio(): void{
    if(this.formularioReativo.status === 'INVALID') {
      this.formularioReativo.get('avaliacao').markAsTouched();
      this.formularioReativo.get('nome').markAsTouched();
      this.formularioReativo.get('marca').markAsTouched();
      this.formularioReativo.get('descricao').markAsTouched();
    } else {
      this.form = this.formularioReativo.value
      this.adicionarEssencia()
    }
  }

}
