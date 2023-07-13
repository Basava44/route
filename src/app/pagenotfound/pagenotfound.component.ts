import {
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent implements OnChanges {
  otp: string = '';
  number = 0;
  @ViewChild('oref', { static: false }) otpRef: ElementRef<HTMLElement> | any;
  otpInputFields = {} as any;

  ngOnInit(): void {
    this.onSubmit();
    this.resetOtpFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  submit() {
    alert(this.otpInputFields.intakeReal);
    this.otpInputFields.intakeReal = [];
    this.otpInputFields.intakeMasked = [];
  }

  onSubmit() {
    this.number++;
    this.number++;
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const otpCode: any = navigator.credentials;
      otpCode
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp: any) => {
          this.number++;
          alert(this.number);
          this.otp = otp.code;
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          alert('hey');
        });
    }
  }

  resetOtpFields() {
    const sudoApp = ['', '', '', '', ''];
    this.otpInputFields.intakeReal = [];
    this.otpInputFields.intakeMasked = [];
    sudoApp.forEach((item) => {
      this.otpInputFields.intakeMasked.push(item);
    });
  }

  tabTrigger($event: any, $index: any) {
    const inputValue = $event.target.value;

    if (inputValue !== '*') {
      if (inputValue !== '') {
        this.otpInputFields.intakeReal[$index] = inputValue;
        this.otpInputFields.intakeMasked[$index] = '*';
        if ($index < 4) {
          this.otpRef.nativeElement[$index + 1].focus();
        }
      } else {
        // if not backspace
        // we rely on html 5 here to make sure we only get numeric values of single digits [0-9]
        // and focus on the first child
        this.otpRef.nativeElement[0].focus();
      }
    }
  }
}
