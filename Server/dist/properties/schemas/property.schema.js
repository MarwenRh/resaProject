"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertySchema = exports.Property = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Coordinates = class Coordinates {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Coordinates.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Coordinates.prototype, "longitude", void 0);
Coordinates = __decorate([
    (0, mongoose_1.Schema)()
], Coordinates);
const CoordinatesSchema = mongoose_1.SchemaFactory.createForClass(Coordinates);
let Location = class Location {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Location.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Location.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Location.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: CoordinatesSchema }),
    __metadata("design:type", Coordinates)
], Location.prototype, "coordinates", void 0);
Location = __decorate([
    (0, mongoose_1.Schema)()
], Location);
const LocationSchema = mongoose_1.SchemaFactory.createForClass(Location);
let ApartmentSpace = class ApartmentSpace {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApartmentSpace.prototype, "space_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApartmentSpace.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApartmentSpace.prototype, "area", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], ApartmentSpace.prototype, "photos", void 0);
ApartmentSpace = __decorate([
    (0, mongoose_1.Schema)()
], ApartmentSpace);
const ApartmentSpaceSchema = mongoose_1.SchemaFactory.createForClass(ApartmentSpace);
let Policies = class Policies {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Policies.prototype, "smoking", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Policies.prototype, "pets", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Policies.prototype, "parties_or_events", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "check_in_start", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "check_in_end", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "check_out_start", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "check_out_end", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "quiet_hours_start", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "quiet_hours_end", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "cleaning_maintenance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Policies.prototype, "cancellation_policy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Policies.prototype, "guests_allowed", void 0);
Policies = __decorate([
    (0, mongoose_1.Schema)()
], Policies);
const PoliciesSchema = mongoose_1.SchemaFactory.createForClass(Policies);
let Amenities = class Amenities {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "WiFi", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Kitchen", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Washer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Dryer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Free_parking", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Air_conditioning", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Heating", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "TV", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Hot_tub", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Pool", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Gym", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Elevator", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Wheelchair_accessible", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Pets_allowed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Breakfast", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Laptop_friendly_workspace", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Crib", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Hair_dryer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Iron", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Essentials", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Smoke_alarm", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Carbon_monoxide_alarm", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Fire_extinguisher", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "First_aid_kit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Lock_on_bedroom_door", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Hangers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Shampoo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Garden_or_backyard", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "Patio_or_balcony", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Amenities.prototype, "BBQ_grill", void 0);
Amenities = __decorate([
    (0, mongoose_1.Schema)()
], Amenities);
const AmenitiesSchema = mongoose_1.SchemaFactory.createForClass(Amenities);
let Contact = class Contact {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contact.prototype, "website", void 0);
Contact = __decorate([
    (0, mongoose_1.Schema)()
], Contact);
const ContactSchema = mongoose_1.SchemaFactory.createForClass(Contact);
let Links = class Links {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Links.prototype, "booking_com", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Links.prototype, "google_maps", void 0);
Links = __decorate([
    (0, mongoose_1.Schema)()
], Links);
const LinksSchema = mongoose_1.SchemaFactory.createForClass(Links);
let Property = class Property extends mongoose_2.Document {
};
exports.Property = Property;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "place", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: LocationSchema }),
    __metadata("design:type", Location)
], Property.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "tourist_tax", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "max_guests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ApartmentSpaceSchema] }),
    __metadata("design:type", Array)
], Property.prototype, "apartment_spaces", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: PoliciesSchema }),
    __metadata("design:type", Policies)
], Property.prototype, "policies", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Property.prototype, "means_of_payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: AmenitiesSchema }),
    __metadata("design:type", Amenities)
], Property.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "overall_rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ContactSchema }),
    __metadata("design:type", Contact)
], Property.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: LinksSchema }),
    __metadata("design:type", Links)
], Property.prototype, "links", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Property.prototype, "added_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "host_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "minimum_nights", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "maximum_nights", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "beds_number", void 0);
exports.Property = Property = __decorate([
    (0, mongoose_1.Schema)()
], Property);
exports.PropertySchema = mongoose_1.SchemaFactory.createForClass(Property);
//# sourceMappingURL=property.schema.js.map