import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setItem(key: string, data: any): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error setting item in localStorage', error);
    }
  }

  getItem(key: string, parse = true): any {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing item from localStorage', error);
    }
  }
}
