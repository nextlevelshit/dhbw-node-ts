import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Party {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	location: string;

	@Column()
	date: string;

	@Column()
	time?: Date;
}
