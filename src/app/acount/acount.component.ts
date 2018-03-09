import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {} from '@types/googlemaps';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss']
})
export class AcountComponent implements OnInit, AfterViewInit {
  @ViewChild('autocomplete') autocomplete: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const auto = new google.maps.places.Autocomplete(
      this.autocomplete.nativeElement
    );
  }
}
