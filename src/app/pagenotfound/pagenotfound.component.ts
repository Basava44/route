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
  data!: any;

  ngOnInit(): void {
    this.onSubmit();
    this.resetOtpFields();
    this.test15();
  }

  captureData(data: any) {
    // alert('hey');
    console.log(data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  submit() {
    alert(this.otpInputFields.intakeReal);
    this.otpInputFields.intakeReal = [];
    this.otpInputFields.intakeMasked = [];
  }

  async onSubmit() {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', (e) => {
        const input: any = document.querySelector(
          'input[autocomplete="one-time-code"]'
        );
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        if (form) {
          form.addEventListener('submit', (e: any) => {
            ac.abort();
          });
        }
        const otpCode: any = navigator.credentials;
        otpCode
          .get({
            otp: { transport: ['sms'] },
            signal: ac.signal,
          })
          .then((otp: any) => {
            this.number++;
            input.value = otp.code;
            if (form) form.submit();
          })
          .catch((err: any) => {
            console.log(err);
          });
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

  test15() {
    // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
    alert('test 22');
    const signal = new AbortController();
    setTimeout(() => {
      signal.abort();
    }, 1 * 60 * 1000);
    async function main() {
      if ('OTPCredential' in window) {
        try {
          let otpThing: any = navigator.credentials;
          if (otpThing) {
            try {
              await otpThing
                .get({ abort: signal, otp: { transport: ['sms'] } })
                .then((content: any) => {
                  if (content && content.code) {
                    alert(content.code);
                  }
                })
                .catch((e: any) => console.log(e));
            } catch (e) {
              return;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}
