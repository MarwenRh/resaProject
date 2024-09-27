import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsService {
    private reservationModel;
    constructor(reservationModel: Model<Reservation>);
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: CreateReservationDto): Promise<Reservation>;
    remove(id: string): Promise<Reservation>;
}
