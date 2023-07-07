import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type activeTab = "accountInfo" | "newWallet" | "fundWallet";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  imageFiles: any;

  switchTabs: string = "accountInfo";

  status! : boolean;
  accountLevel! : string;

  kycStatus! : boolean;
  kycRespMsg! : string;

  getCurrencyChargeStatus! : boolean;
  dollarCharge! : number;
  euroCharge! : number;
  poundsCharge! : number;

  walletCreateStatus! : boolean;
  walletCreateCurrency! : string;
  walletCreateRespMsg! : string;

  // currencies!: any[];

  unavailableCurrencies! : any[];

  constructor(private http: HttpClient, private router: Router,) {}

  ngOnInit() {
    this.getUserProfileLevel();
    this.getCurrenciesCharge();
    // this.getCurrenciesUserHas();
    this.getUnavailableCurrencies();
  }

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }

  getUserProfileLevel() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserProfileLevel`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.status = res.status;
        this.accountLevel = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleFile(event: any){
    for (var i = 0; i < event.target.files.length; i++) {
      this.imageFiles = event.target.files[i];
    }
  }

  onKycUpload(imagesData: any) {
    const files:FileList = imagesData;
    
    if (files) {
      const formData = new FormData();
    formData.append('KycDetails', this.imageFiles);


    this.http.post<any>(`${this.baseUrl}/api/Dashboard/KycValidation`, formData)
    .subscribe({
      next: (res) => {
        this.kycRespMsg = res.message;
        this.kycStatus = res.status;
        if (this.kycStatus == true) {
          Swal.fire({
            text: this.kycRespMsg,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        } else {
          Swal.fire({
            text: this.kycRespMsg,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (err) => {
        console.log(err);
      }
    });
    }
  }

  // getCurrenciesUserHas() {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json"
  //   });
  //   this.http.get<any[]>(`${this.baseUrl}/api/Account/UserAccountDetails`, {headers: headers})
  //   .subscribe({
  //     next: (res) => {
  //       this.currencies = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  getUnavailableCurrencies() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Account/UnavailableCurrencies`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.unavailableCurrencies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCurrenciesCharge() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetCurrencyCharges`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.getCurrencyChargeStatus = res.status;
        this.dollarCharge = res.dollar;
        this.euroCharge = res.euro;
        this.poundsCharge = res.pounds;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onWalletCreate(walletCreateData: [key: string]) {
    const currencyCheck = document.getElementById("checkCurrency")?.innerHTML;
    console.log(currencyCheck);
    if (currencyCheck == "USD") {
      Swal.fire({
        text: `You will be charged ${this.dollarCharge} naira for this. Do you wish to proceed?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#003366',
        cancelButtonColor: '#FF0033',
        confirmButtonText: 'Yes, proceed!'
      }).then((result) => {
        if (result.isConfirmed) {
          const headers = new HttpHeaders({
            "Content-Type": "application/json"
          });
          this.http.post<any>(`${this.baseUrl}/api/Account/CreateForeignWallet`, walletCreateData, {headers: headers})
          .subscribe({
            next: (res) => {
              this.walletCreateRespMsg = res.message;
              this.walletCreateCurrency = res.currency;
              this.walletCreateStatus = res.status;
              if (this.walletCreateStatus == true) {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#003366",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1500);
              }
              else {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#FF0033",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      })
    }

    if (currencyCheck == "EUR") {
      Swal.fire({
        text: `You will be charged ${this.euroCharge} naira for this. Do you wish to proceed?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#003366',
        cancelButtonColor: '#FF0033',
        confirmButtonText: 'Yes, proceed!'
      }).then((result) => {
        if (result.isConfirmed) {
          const headers = new HttpHeaders({
            "Content-Type": "application/json"
          });
          this.http.post<any>(`${this.baseUrl}/api/Account/CreateForeignWallet`, walletCreateData, {headers: headers})
          .subscribe({
            next: (res) => {
              this.walletCreateRespMsg = res.message;
              this.walletCreateCurrency = res.currency;
              this.walletCreateStatus = res.status;
              if (this.walletCreateStatus == true) {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#003366",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1500);
              }
              else {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#FF0033",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      })
    }

    if (currencyCheck == "GBP") {
      Swal.fire({
        text: `You will be charged ${this.poundsCharge} naira for this. Do you wish to proceed?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#003366',
        cancelButtonColor: '#FF0033',
        confirmButtonText: 'Yes, proceed!'
      }).then((result) => {
        if (result.isConfirmed) {
          const headers = new HttpHeaders({
            "Content-Type": "application/json"
          });
          this.http.post<any>(`${this.baseUrl}/api/Account/CreateForeignWallet`, walletCreateData, {headers: headers})
          .subscribe({
            next: (res) => {
              this.walletCreateRespMsg = res.message;
              this.walletCreateCurrency = res.currency;
              this.walletCreateStatus = res.status;
              if (this.walletCreateStatus == true) {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#003366",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1500);
              }
              else {
                Swal.fire({
                  text: this.walletCreateRespMsg,
                  confirmButtonColor: "#FF0033",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      })
    }
  }








}
