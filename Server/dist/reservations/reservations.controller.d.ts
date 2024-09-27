import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto): Promise<import("./schemas/reservation.schema").Reservation>;
    findAll(): Promise<import("./schemas/reservation.schema").Reservation[]>;
    findOne(id: string): Promise<import("./schemas/reservation.schema").Reservation>;
    update(id: string, updateReservationDto: CreateReservationDto): Promise<import("./schemas/reservation.schema").Reservation>;
    remove(id: string): Promise<import("./schemas/reservation.schema").Reservation>;
}
