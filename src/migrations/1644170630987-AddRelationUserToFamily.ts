import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationUserToFamily1644170630987 implements MigrationInterface {
    name = 'AddRelationUserToFamily1644170630987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "familyId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d0e67d3ce8cbe4f407afe228a1b" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d0e67d3ce8cbe4f407afe228a1b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "familyId"`);
    }

}
