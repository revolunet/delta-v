import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultCountryToUserTable1716293576821 implements MigrationInterface {
  name = 'AddDefaultCountryToUserTable1716293576821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "defaultCountry" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "defaultCountry"
        `);
  }
}
