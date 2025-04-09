import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  contactForm: FormGroup;
  successMessage: boolean = false; // Controla si se muestra el mensaje de éxito

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      message: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.successMessage = true;  // Muestra el mensaje de éxito
      this.contactForm.reset();    // Borra los campos del formulario

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        this.successMessage = false;
      }, 3000);
    }
  }
}
