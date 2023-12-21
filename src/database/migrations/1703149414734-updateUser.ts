import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1703149414734 implements MigrationInterface {
    name = 'UpdateUser1703149414734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_128d7c8c9af53479d0b9e00eb58" UNIQUE ("key"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
