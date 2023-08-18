import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { timeInterval } from 'rxjs';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {

  }
  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    console.log(form.value);
    if (form.valid) {
     if(this.service.formData.paymentDetailId===0){
      this.InsertRecord(form);
     }else{
      this.UpdateRecord(form);
     }
    }
  }

  InsertRecord(form:NgForm){
    this.service.postPaymentDetails().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success('Inserted Successfully!, Payment Details Register.');
        this.service.formSubmitted = false;
      },
      error: err => console.log(err)
    });
  }
  UpdateRecord(form:NgForm){
    this.service.putPaymentDetails().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.info('Updated record Successfully!, Payment Details updated.');
        this.service.formSubmitted = false;
      },
      error: err => console.log(err)
    });
  }
}
