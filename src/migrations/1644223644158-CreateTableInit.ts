import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableInit1644223644158 implements MigrationInterface {
    name = 'CreateTableInit1644223644158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "child_support" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paidDate" TIMESTAMP NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "familyId" uuid, CONSTRAINT "PK_a913538142304a0cd6c4720c07a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supporter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "organizationId" uuid NOT NULL, CONSTRAINT "UQ_2759473e63ba3a0e48d4a9c0d3c" UNIQUE ("email"), CONSTRAINT "PK_b4ea149cf1b7423bc33bbb0a74a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "support_message_reply" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "isConfirmed" boolean NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "messageId" uuid, "supporterId" uuid, CONSTRAINT "PK_a29eb6bab9732756451d7d6d903" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "support_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "isReplied" boolean NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "parentId" uuid, "supporterId" uuid, "organizationId" uuid, CONSTRAINT "PK_ffc800a254f6e98e97d90fcefa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parents_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text array NOT NULL DEFAULT '{}', "isReplied" boolean NOT NULL, "isReplyRequired" boolean NOT NULL, "type" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "senderId" uuid, "familyId" uuid, CONSTRAINT "PK_ccb406c7ab82100b4f20e39fa0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "familyId" uuid, "supporterId" uuid, "supportOrganizationId" uuid, CONSTRAINT "UQ_9158391af7b8ca4911efaad8a73" UNIQUE ("email"), CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visitation_possible_date" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dates" date array NOT NULL DEFAULT '{}', "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "familyId" uuid, CONSTRAINT "PK_5a769475e49cacdbe61e0c6559a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "familyId" uuid, CONSTRAINT "PK_818760aff087db802aa2753968a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meetFrequency" integer NOT NULL, "paymentDueDate" integer NOT NULL, "possibleDateSelectDay" integer NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "child_memo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "writerId" uuid, "familyId" uuid, CONSTRAINT "PK_3f6b1b9d4d91a5ead822597457f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "familyId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "child_support" ADD CONSTRAINT "FK_0c40cdcecae2ac7efbd305fb713" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supporter" ADD CONSTRAINT "FK_2043a84c5b4bcd65524daa6888f" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_message_reply" ADD CONSTRAINT "FK_78197896d2a151cc2fdca9dd92f" FOREIGN KEY ("messageId") REFERENCES "support_message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_message_reply" ADD CONSTRAINT "FK_dfd731fde33f6729b747d349b94" FOREIGN KEY ("supporterId") REFERENCES "supporter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_message" ADD CONSTRAINT "FK_eb659308f912e7a01263dfc5ed3" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_message" ADD CONSTRAINT "FK_06c60bdc92c3f485e3396627340" FOREIGN KEY ("supporterId") REFERENCES "supporter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_message" ADD CONSTRAINT "FK_90624fbb4c598bcad9d64cc2691" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parents_message" ADD CONSTRAINT "FK_da6749c7130c3bb6fa9019fbb88" FOREIGN KEY ("senderId") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parents_message" ADD CONSTRAINT "FK_7a908107736584aa7549b381cc2" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent" ADD CONSTRAINT "FK_7a566b8acc523a4c0730b844e1d" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent" ADD CONSTRAINT "FK_9b12fc9d9f7bd20fbbc489373a7" FOREIGN KEY ("supporterId") REFERENCES "supporter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent" ADD CONSTRAINT "FK_8cbf2b6f7a79f3b51430db067ea" FOREIGN KEY ("supportOrganizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visitation_possible_date" ADD CONSTRAINT "FK_b40c54b1c24a6b7f9f384f0385e" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visitation" ADD CONSTRAINT "FK_b775f23c2a1c311e4f1fc1eef67" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "child_memo" ADD CONSTRAINT "FK_62a26a7164f053216342d527112" FOREIGN KEY ("writerId") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "child_memo" ADD CONSTRAINT "FK_13e4b056c456f2fa68a6e34340a" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d0e67d3ce8cbe4f407afe228a1b" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d0e67d3ce8cbe4f407afe228a1b"`);
        await queryRunner.query(`ALTER TABLE "child_memo" DROP CONSTRAINT "FK_13e4b056c456f2fa68a6e34340a"`);
        await queryRunner.query(`ALTER TABLE "child_memo" DROP CONSTRAINT "FK_62a26a7164f053216342d527112"`);
        await queryRunner.query(`ALTER TABLE "visitation" DROP CONSTRAINT "FK_b775f23c2a1c311e4f1fc1eef67"`);
        await queryRunner.query(`ALTER TABLE "visitation_possible_date" DROP CONSTRAINT "FK_b40c54b1c24a6b7f9f384f0385e"`);
        await queryRunner.query(`ALTER TABLE "parent" DROP CONSTRAINT "FK_8cbf2b6f7a79f3b51430db067ea"`);
        await queryRunner.query(`ALTER TABLE "parent" DROP CONSTRAINT "FK_9b12fc9d9f7bd20fbbc489373a7"`);
        await queryRunner.query(`ALTER TABLE "parent" DROP CONSTRAINT "FK_7a566b8acc523a4c0730b844e1d"`);
        await queryRunner.query(`ALTER TABLE "parents_message" DROP CONSTRAINT "FK_7a908107736584aa7549b381cc2"`);
        await queryRunner.query(`ALTER TABLE "parents_message" DROP CONSTRAINT "FK_da6749c7130c3bb6fa9019fbb88"`);
        await queryRunner.query(`ALTER TABLE "support_message" DROP CONSTRAINT "FK_90624fbb4c598bcad9d64cc2691"`);
        await queryRunner.query(`ALTER TABLE "support_message" DROP CONSTRAINT "FK_06c60bdc92c3f485e3396627340"`);
        await queryRunner.query(`ALTER TABLE "support_message" DROP CONSTRAINT "FK_eb659308f912e7a01263dfc5ed3"`);
        await queryRunner.query(`ALTER TABLE "support_message_reply" DROP CONSTRAINT "FK_dfd731fde33f6729b747d349b94"`);
        await queryRunner.query(`ALTER TABLE "support_message_reply" DROP CONSTRAINT "FK_78197896d2a151cc2fdca9dd92f"`);
        await queryRunner.query(`ALTER TABLE "supporter" DROP CONSTRAINT "FK_2043a84c5b4bcd65524daa6888f"`);
        await queryRunner.query(`ALTER TABLE "child_support" DROP CONSTRAINT "FK_0c40cdcecae2ac7efbd305fb713"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "child_memo"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "visitation"`);
        await queryRunner.query(`DROP TABLE "visitation_possible_date"`);
        await queryRunner.query(`DROP TABLE "parent"`);
        await queryRunner.query(`DROP TABLE "parents_message"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "support_message"`);
        await queryRunner.query(`DROP TABLE "support_message_reply"`);
        await queryRunner.query(`DROP TABLE "supporter"`);
        await queryRunner.query(`DROP TABLE "child_support"`);
    }

}
