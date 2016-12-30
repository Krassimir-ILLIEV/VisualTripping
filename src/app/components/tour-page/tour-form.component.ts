import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { ToursService } from '../../../services/tours.service';


@Component({
  selector: 'tour-form-container',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Appointment</h2>
      </div>
    </div>

    <form id="edit-patient-form">
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Patient Info</label>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 form-group">
          <label class="control-label" for="description">Description</label>
          <input type="text" class="form-control" id="description" name="description"
            [(ngModel)]="tour.description" 
            />
        </div>
        <div class="col-sm-6 form-group">
          <label class="control-label" for="name">Name</label>
          <input type="text" class="form-control" id="name" name="totalPrice"
             [(ngModel)]="tour.totalPrice" 
             />
         </div>
      </div>

      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Appointment Info</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3 form-group">
          <label class="control-label" for="dateCreated">Date Created</label>
          <input type="date" class="form-control" id="dateCreated" name="dateCreated"
            [(ngModel)]="tour.dateCreated" 
            />
        </div>
      </div>
      <ul>
    <li *ngFor="let tourPoint of tour.tourPoints">
        {{tourPoint.country}} {{tourPoint.city}} {{tourPoint.from}} {{tourPoint.to}} {{tourPoint.price}}
    </li>
    {{tour.totalPrice | currency:'USD':true:'1.2-2'}}
</ul>
        <!--
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.time.isValid">
          <label class="control-label" for="time">Time</label>
          <input type="time" class="form-control" id="time"
            value={{patientForm.patient.time}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.time.isValid" class="help-block">{{patientForm.errors.time.errorMessage}}</span>
        </div>
        <div class="row-md">
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.specialty.isValid">
            <label class="control-label" for="specialty">Specialty</label>
            <select id="specialty" class="form-control"
              value={{patientForm.patient.specialty}}
              (change)="onChange($event)">
              <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
            </select>
            <span *ngIf="!patientForm.errors.specialty.isValid" class="help-block">{{patientForm.errors.specialty.errorMessage}}</span>
          </div>
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.doctor.isValid">
            <label class="control-label" for="doctor">Doctor</label>
            <select id="doctor" class="form-control"
              value={{patientForm.patient.doctor}}
              (change)="onChange($event)">
              <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
            </select>
            <span *ngIf="!patientForm.errors.doctor.isValid" class="help-block">{{patientForm.errors.doctor.errorMessage}}</span>
          </div>
        </div>
      </div>
-->
      <div class="row">
        <div class="col-xs-2 form-group">
          <div>
            <button type="button" class="btn btn-primary"
              (click)="navigateBack($event)">
              Back
            </button>
          </div>
        </div>

        <div class="col-xs-offset-8 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" class="btn btn-success"
              (click)="onSave($event)">
              Save
            </button>
          </div>
        </div>

      </div>
    </form>
  </div>
  `
})
export class TourFormComponent implements OnInit {
  /*
@Input() specialties: Array<string>;
@Input() doctors: Array<string>;
@Input() patientForm: PatientFormState;
@Input() onSave: (patient: Patient) => void;
@Input() navigateBack: (event: any) => void;
@Input() onChange: (event: any) => void;
*/
  tour = {};

  constructor(private toursData: ToursService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        let id = params['id'];
        this.getTour(id);
      });
  }

  getTour(id: string): void {
    this.toursData.getTourDetailsById(id)
      .subscribe(data => {
        this.tour = data.tour;
      });
  }

  navigateBack(event: any): void {
    this._router.navigate(['/tours']);
  }
  onSave(event: any): void {
    alert(JSON.stringify(this.tour));
  }
}
