import { TourPoint } from './tourPoint.model';

export interface Tour {
    id: number;
    tourPoints: TourPoint[];
    totalPrice: number;
    dateCreated: string;
    createdBy: string;
    participants: string[];
    keywords: string[];
    description: string;
    comments: string[];
    //isMovedToArchive: boolean;
    pictures: string[];
    rating: number;
};

