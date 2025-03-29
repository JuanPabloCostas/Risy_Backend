import { Column, ObjectIdColumn } from "typeorm";

export class Provider {
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    photoUrl: string;

    @Column()
    password: string;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })   
    registeredAt: Date;
}
