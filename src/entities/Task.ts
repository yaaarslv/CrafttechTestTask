import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({type: 'enum', enum: ['выполняется', 'выполнено'], default: 'выполняется'})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    constructor(id: number, title: string, description: string, status: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
