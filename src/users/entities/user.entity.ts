import { Column, ObjectIdColumn } from "typeorm";

enum UserType {
    PUBLICUSER = "publicuser", 
    ORGANIZATON = "organization", 
}

export class User {
    @ObjectIdColumn()
    id: string; 

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    photo_url: string;

    @Column()
    password: string;

    @Column(
        {
        type: "enum",
        enum: UserType,
    }
    )
    type: UserType

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;
}
