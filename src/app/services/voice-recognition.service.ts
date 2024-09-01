import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition: any;
  isStoppedSpeechRecog = true;
  public text: string = '';
  private tempWords: string = '';

  constructor() { }

  init(): void {
    try {
      if (typeof webkitSpeechRecognition !== 'undefined') {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.continuous = true;

        this.recognition.addEventListener('result', (e: any) => {
          const transcript = Array.from(e.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          this.tempWords = transcript ? transcript : '';
          console.log(transcript);
        });

        this.recognition.addEventListener('error', (error: any) => {
          console.error('Speech recognition error:', error);
        });
      } else {
        throw new Error('webkitSpeechRecognition is not supported in this browser.');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  start(): void {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started");

    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition");
      } else {
        this.wordConcat();
        this.recognition.start();
        this.recognition.lastActive = Date.now();
      }
    });
  }

  stop(): void {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log("End speech recognition");
  }

  private wordConcat(): void {
    if (this.tempWords) {
      this.text += this.tempWords;
    }
    this.tempWords = '';
  }
}
