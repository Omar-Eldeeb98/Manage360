import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  //^ properties
  private _GoogleGenerativeAI: GoogleGenerativeAI;
  private msgHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  //^ constructor
  constructor() {
    this._GoogleGenerativeAI = new GoogleGenerativeAI(
      'AIzaSyAL-mXe4kprToPvn-1lapGkpRPz2qmwzNg'
    ); //? api_key
  }

  //^ methods
  async generateText(prompt: string) {
    const model = this._GoogleGenerativeAI.getGenerativeModel({
      model: 'gemini-pro',
    });

    this.msgHistory.next({
      from: 'user',
      message: prompt,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text); //? just for testing purposes.

    this.msgHistory.next({
      from: 'bot',
      message: text,
    });
  }

  public getMessageHistory(): Observable<any> {
    return this.msgHistory.asObservable();
  }
}

//~ OE57 was here.
//~ bye

//----------------------------------------------------------------
