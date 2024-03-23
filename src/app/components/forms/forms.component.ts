import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filterdResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private unitService: GetUnitsService,
     private filterUnitsService: FilterUnitsService) { }

  ngOnInit(): void {
  
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results =data;
      this.filterdResults = data;
    });
  }



  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value
  this.filterdResults = this.filterUnitsService.filter(this.results, showClosed, hour);
  this.unitService.setFilteredUnits(this.filterdResults);

  this.submitEvent.emit();
    }

  onClean(): void {
    this.formGroup.reset();
  }
}