import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent {
  otp: string = '';
  number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.onSubmit();
    }, 1000);
  }

  onSubmit() {
    this.number++;
    if ('OTPCredential' in window) {
      this.number++;
      const ac = new AbortController();
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          ac.abort();
        });
      }
      const something: any = navigator.credentials;
      something
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp: any) => {
          this.number++;
          this.otp = otp.code;
          if (form) form.submit();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
}
