import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProperties1609949546900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( 
            new Table({
            name:'properties', 
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
                    type:'text'
                },
                {
                    name:'about',
                    type:'text'
                },
                {
                    name:'instructions',
                    type:'text'
                },
                {
                    name:'latitude',
                    type:'decimal',
                    scale:10,
                    precision:2 
                },
                {
                    name:'longitude',
                    type:'decimal',
                    scale:10,
                    precision:2 
                },
                {
                    name:'userPropriertor_id',
                    type:'integer',
                },
            ],
            foreignKeys: [
                {
                  name:'userPropertie',
                  columnNames:['userPropriertor_id'],
                  referencedTableName:'usersPropiertor',
                  referencedColumnNames:['id'],
                  onUpdate:'CASCADE',
                  onDelete:'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('properties');
    }

}
