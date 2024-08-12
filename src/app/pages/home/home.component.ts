import { ToastrService } from 'ngx-toastr';
import { GeminiService } from './../../service/gemini.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //^-------------constructor-----------------
  constructor(
    private _GeminiService: GeminiService,
    private _Clipboard: Clipboard,
    private _ToastrService: ToastrService
  ) {
    this._GeminiService.getMessageHistory().subscribe((response) => {
      if (response) {
        this.chatHistory.push(response);
      }
    });
  }

  //^-------------properties-----------------
  prompt: string = '';
  chatHistory: any[] = [];
  isLoading: boolean = false;
  //^ methods -----------------------------------
  ngOnInit(): void {
    this.chatHistory = [];
  }

  async sendData() {
    if (this.prompt && !this.isLoading) {
      this.isLoading = true;
      const data = this.prompt;
      this.prompt = '';
      await this._GeminiService.generateText(data);
      this.isLoading = false;
    } else {
      this._ToastrService.error(
        'We Can Not Respond To Empty Queastion !🙄',
        'Error'
      );
      this.isLoading = false;
    }
  }

  formatText(text: string): string {
    const result = text.replaceAll('*', ' ');
    return result;
  }

  copyText(text: string | null) {
    if (text) {
      this._Clipboard.copy(text);
      this._ToastrService.info('text copied successfully', 'Done');
    }
  }

  clearChat(): void {
    //^ sweetalert2
    Swal.fire({
      title: 'Do you want to Clear Current Chat?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chatHistory = [];
        this._ToastrService.info('Chat Cleared Succesfully! ', 'Done');
      } else if (result.isDenied) {
        this._ToastrService.info('Action Is Canceled', 'Canceled');
      }
    });
  }
}
