import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;
}
