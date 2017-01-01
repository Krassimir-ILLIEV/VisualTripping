import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { ToursService } from '../../../services/tours.service';


@Component({
  selector: 'tour-form-container',
  template: `
<div class="container-fluid well">

    <form id="edit-patient-form">
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Tour Info</label>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8 form-group">
          <label class="control-label" for="description">Description</label>
          <input type="text" class="form-control" id="description" name="description"
            [(ngModel)]="tour.description" 
            />
        </div>
        <div class="col-sm-2 form-group">
          <label class="control-label" for="totalPrice">Total Price</label>
          <input type="number" class="form-control" id="totalPrice" name="totalPrice"
             [(ngModel)]="tour.totalPrice" 
             />
         </div>
         <div class="col-sm-2 form-group">
          <label class="control-label" for="maxParticipants">Max Participants</label>
          <input type="number" class="form-control" id="maxParticipants" name="maxParticipants"
             [(ngModel)]="tour.maxParticipants" 
             />
         </div>
     </div>

      <div class="row">
      <label class="control-label">Tour Places</label>
      <div class="row" *ngFor="let tourPoint of tour.tourPoints; let i = index">
         <div class="col-md-4 col-lg-3 form-group">
          <select class="form-control" name="place-{{i}}"
              [(ngModel)]="tourPoint.city">
              <option *ngFor="let p of places" [value]="p.city">{{p.city + "(" + p.country+")"}}</option>
          </select>
          </div>

          <div class="col-md-2 col-lg-2 form-group">
          <input type="date" class="form-control" name="from-{{i}}"
          [(ngModel)]="tourPoint.from"
         />
         </div>
      </div>

        <div class="col-xs-2 form-group">
          <div>
            <button type="button" class="btn btn-primary"
              (click)="addNext()">
              Add next...
            </button>
          </div>
        </div>

       

     </div>





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
        if (params['id'] === '0') {
          this.tour = {  //new tour?
            creator: '',
            title: '',
            city: '',
            country: '',
            description: '',
            price: 0,
            maxUser: 0,
            endJoinDate: new Date(2016, 12, 10),
            beginTourDate: new Date(2016, 12, 10),
            endTourDate: new Date(2016, 12, 10),
            isValid: false,
            isDeleted: false,
            usersInTour: ['']
          }
        } else {
          this.getTour(id);
        }
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
