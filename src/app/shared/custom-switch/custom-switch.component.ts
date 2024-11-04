import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-switch',
  templateUrl: './custom-switch.component.html',
  styleUrl: './custom-switch.component.scss'
})
export class CustomSwitchComponent {
  @Input() leftText: string = '';
  @Input() rightText: string = '';
  @Input() switchStatus: boolean = false;
  @Input() isDisabled: boolean = false;
  
  @Output() statusChange = new EventEmitter<boolean>();

  toggleSwitch() {
    if (!this.isDisabled) {
      this.switchStatus = !this.switchStatus;
      this.statusChange.emit(this.switchStatus);
    }
  }
}
