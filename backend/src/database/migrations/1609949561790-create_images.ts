import {MigrationInterface,Table, QueryRunner} from "typeorm";

export class createImages1609949561790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name:'images',
              columns:[
                {
                  name:'id',
                  type:'integer',
                  unsigned:true,
                  isPrimary:true,
                  isGenerated:true,
                  generationStrategy:'increment',
      
                },
                {
                  name:'path',
                  type:'varchar',
                },
                {
                  name:'propertie_id',
                  type:'integer',
                },
              ],
              foreignKeys: [
                {
                  name:'imagePropetier',
                  columnNames:['propertie_id'],
                  referencedTableName:'properties',
                  referencedColumnNames:['id'],
                  onUpdate:'CASCADE',
                  onDelete:'CASCADE',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('properties');
    }

}
