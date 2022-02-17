import {MigrationInterface, QueryRunner} from "typeorm";

export class RenamePost1644314065616 implements MigrationInterface {
    name = 'RenamePost1644314065616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "title" TO "name"`);
    }

}
