import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}