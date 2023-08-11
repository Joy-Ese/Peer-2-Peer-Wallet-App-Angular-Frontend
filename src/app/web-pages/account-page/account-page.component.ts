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

  kycDocuments!: any[];

  acceptedDocuments!: any[];

  imageFile: any;
  previewImage1: any;

  switchTabs: string = "accountInfo";

  status! : boolean;
  accountLevel! : string;
  fCurrency: string = "";

  kycStatus! : boolean;
  kycRespMsg! : string;

  getCurrencyChargeStatus! : boolean;
  dollarCharge! : number;
  euroCharge! : number;
  poundsCharge! : number;

  walletCreateStatus! : boolean;
  walletCreateCurrency! : string;
  walletCreateRespMsg! : string;

  fundWalletCurrencies!: any[];

  unavailableCurrencies! : any[];

  values: any;

  acctDetails! : any[];
  nairaAcctBal! : string;

  getConversionRateStatus! : boolean;
  dollarRate! : number;
  euroRate! : number;
  poundsRate! : number;

  fundWalletResponseMsg = "";
  fundWalletStatus = false;

  constructor(private http: HttpClient, private router: Router,) {}

  ngOnInit() {
    this.getKycDocuments();
    this.getUserDetails();
    this.getUserProfileLevel();
    this.getCurrenciesCharge();
    this.getFundWalletCurrencies();
    this.getUnavailableCurrencies();
    this.getUserNairaBal();
    this.getConversionRate();
  }

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }

  getKycDocuments() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Dashboard/ListKycDocs`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.kycDocuments = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserDetails() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetUserDetails`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.acctDetails = res.accountDetails;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  handleFile1(event: any){
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.previewImage1 = reader.result;
    reader.readAsDataURL(this.imageFile);
  }

  onKycUpload(imageData: any, value: string) {
    const file:File = imageData;
    if (file) {
      const formData = new FormData();
      formData.append('ImageDetails', this.imageFile);

      const params = new URLSearchParams();
      params.append("fileCode", value);

      this.http.post<any>(`${this.baseUrl}/api/Dashboard/KycUpload?${params}`, formData)
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

  getFundWalletCurrencies() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Account/FundWalletCurrencies`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.fundWalletCurrencies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
    let currencyCheck = this.fCurrency;
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
                  window.location.reload();
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

  getConversionRate() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetConversionRates`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.getConversionRateStatus = res.status;
        this.dollarRate = res.dollar;
        this.euroRate = res.euro;
        this.poundsRate = res.pounds;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onKey(event: any) {
    let checkCurrencyForRate = this.fCurrency;
    console.log(checkCurrencyForRate);
    if (checkCurrencyForRate === "USD") {
      console.log(checkCurrencyForRate);
      this.values = event.target.value * this.dollarRate;
      if (this.values > this.nairaAcctBal) {
        Swal.fire({
          text: "Your naira balance is less than this equivalent in naira!!!",
          confirmButtonColor: "#FF0033",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    }
    if (checkCurrencyForRate === "EUR") {
      console.log(checkCurrencyForRate);
      this.values = event.target.value * this.euroRate;
      if (this.values > this.nairaAcctBal) {
        Swal.fire({
          text: "Your naira balance is less than this equivalent in naira!!!",
          confirmButtonColor: "#FF0033",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    }
    if (checkCurrencyForRate === "GBP") {
      console.log(checkCurrencyForRate);
      this.values = event.target.value * this.poundsRate;
      if (this.values > this.nairaAcctBal) {
        Swal.fire({
          text: "Your naira balance is less than this equivalent in naira!!!",
          confirmButtonColor: "#FF0033",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    }
  }

  getUserNairaBal() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetNairaBalance`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.nairaAcctBal = res.nairaBal;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onWalletFund(walletFundData: {[key: string] : string | number}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Account/FundForeignWallet`, walletFundData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.fundWalletResponseMsg = res.message;
        // this.status = res.status;
        this.fundWalletStatus = res.status;
        if (this.fundWalletStatus == true) {
          Swal.fire({
            text: this.fundWalletResponseMsg,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        else {
          Swal.fire({
            text: this.fundWalletResponseMsg,
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
        }, 2500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
