import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstSchema1644313734801 implements MigrationInterface {
    name = 'FirstSchema1644313734801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "massage" character(20) NOT NULL, "content" character varying NOT NULL, "reftype" character varying NOT NULL, "refid" integer NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "content" character varying NOT NULL, "location" character varying NOT NULL, "likecount" integer NOT NULL DEFAULT '0', "comments" text NOT NULL DEFAULT '', CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "family" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_categories_category_entity" ("postId" integer NOT NULL, "categoryEntityId" integer NOT NULL, CONSTRAINT "PK_a05054dc43f708060efa8974026" PRIMARY KEY ("postId", "categoryEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ee4316131241fb820e455fd068" ON "post_categories_category_entity" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d1a0d93e8aa299e238fd67fbb2" ON "post_categories_category_entity" ("categoryEntityId") `);
        await queryRunner.query(`ALTER TABLE "post_categories_category_entity" ADD CONSTRAINT "FK_ee4316131241fb820e455fd0681" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_categories_category_entity" ADD CONSTRAINT "FK_d1a0d93e8aa299e238fd67fbb25" FOREIGN KEY ("categoryEntityId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_categories_category_entity" DROP CONSTRAINT "FK_d1a0d93e8aa299e238fd67fbb25"`);
        await queryRunner.query(`ALTER TABLE "post_categories_category_entity" DROP CONSTRAINT "FK_ee4316131241fb820e455fd0681"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1a0d93e8aa299e238fd67fbb2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee4316131241fb820e455fd068"`);
        await queryRunner.query(`DROP TABLE "post_categories_category_entity"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
