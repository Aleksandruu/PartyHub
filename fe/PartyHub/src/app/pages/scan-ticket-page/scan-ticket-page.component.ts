import { Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
  NgxScannerQrcodeComponent,
  NgxScannerQrcodeService,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { EventService } from 'src/app/services/event.service';
import { ApiResponse } from 'src/app/types/apiResponse.type';

@Component({
  selector: 'app-scan-ticket-page',
  templateUrl: './scan-ticket-page.component.html',
  styleUrl: './scan-ticket-page.component.css',
})
export class ScanTicketPageComponent {
  valid = false;
  validationDate: String | null = null;
  notTicket = false;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private eventService: EventService
  ) {}

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
  };

  public lastScannedQRCode: ScannerQRCodeResult | null = null;

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e.length > 0) {
      this.lastScannedQRCode = e[e.length - 1];
      if (this.lastScannedQRCode) {
        this.handle(action, 'stop');
        if (this.isValidUUID(this.lastScannedQRCode.value!)) {
          this.eventService
            .verifyTickets(this.lastScannedQRCode.value!)
            .subscribe(
              (res) => {
                if (res.success == true) {
                  this.valid = true;
                } else {
                  console.log(res);
                  this.notTicket = true;
                }
              },
              (err) => {
                const date = this.convertAndCheckTimestamp(err.error.message);
                if (date != null) {
                  this.validationDate = date;
                } else {
                  this.notTicket = true;
                }
              }
            );
          console.log(this.lastScannedQRCode.value);
        } else {
          this.notTicket = true;
        }
      }
    }
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  goBackToScan(): void {
    this.valid = false;
    this.validationDate = null;
    this.notTicket = false;
  }

  private isValidUUID(uuid: string) {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }

  private convertAndCheckTimestamp(timestampString: string): string | null {
    var date = new Date(timestampString);
    if (!isNaN(date.getTime())) {
      let options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return date.toLocaleString('en-US', options);
    }
    return null;
  }
}
