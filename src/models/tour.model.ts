import { TourPoint } from './tour-point.model';

export interface Tour {
    _id: String;
    tourPoints: TourPoint[];
    comments: String[];
    pictures: String[];
    rating: Number;

    creator: String;
    title: { type: String, required: true };
    //city: { type: String, required: true };
    country: { type: String, required: true };
    description: String;
    price: Number;
    maxUser: Number;
    endJoinDate: Date;
    beginTourDate: Date;
    endTourDate: Date;
    isValid: Boolean;
    isDeleted: Boolean;
    usersInTour: string[];
};

