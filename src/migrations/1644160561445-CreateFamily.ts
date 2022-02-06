import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFamily1644160561445 implements MigrationInterface {
    name = 'CreateFamily1644160561445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meetFrequency" integer NOT NULL, "paymentDueDate" integer NOT NULL, "possibleDateSelectDay" integer NOT NULL, "status" character varying NOT NULL, "cohabitParentId" character varying NOT NULL, "separateParentId" character varying NOT NULL, "supporterId" character varying NOT NULL, "supportOrganizationId" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "family"`);
    }

}
