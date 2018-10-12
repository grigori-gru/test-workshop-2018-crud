import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export default @Entity() class Post {
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    name = '';

    @Column('text')
    body = '';
}
