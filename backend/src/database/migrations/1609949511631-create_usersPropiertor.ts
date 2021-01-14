import {MigrationInterface,Table, QueryRunner} from "typeorm";

export class createUsersPropiertor1609949511631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( 
            new Table({
            name:'usersPropiertor', 
            columns:[
                {
                name:'id',
                type:'integer',
                unsigned:true,
                isPrimary:true,
                isGenerated:true,
                generationStrategy: 'increment'
                },
                {
                    name:'name',
                    type:'varchar'
                },
                {
                    name:'telephone',
                    type:'varchar'
                },
                {
                  name: "email",
                  type: "varchar",
                },
                {
                  name: "password", 
                  type: "varchar",
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
