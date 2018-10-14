import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export default @Entity() class User {
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    name = '';

    @Column('text')
    body = '';
}
