<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240905110251 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE material (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_skill DROP FOREIGN KEY FK_BCFF1F2F5A6C0D6B');
        $this->addSql('ALTER TABLE user_skill DROP FOREIGN KEY FK_BCFF1F2F9D86650F');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477A7FADEB5');
        $this->addSql('DROP TABLE user_skill');
        $this->addSql('DROP TABLE skill_area');
        $this->addSql('DROP TABLE skill');
        $this->addSql('ALTER TABLE equipment ADD material_id INT NOT NULL, ADD model VARCHAR(255) NOT NULL, DROP description, CHANGE name brand VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT FK_D338D583E308AC6F FOREIGN KEY (material_id) REFERENCES material (id)');
        $this->addSql('CREATE INDEX IDX_D338D583E308AC6F ON equipment (material_id)');
        $this->addSql('ALTER TABLE profile DROP FOREIGN KEY FK_8157AA0F9D86650F');
        $this->addSql('DROP INDEX UNIQ_8157AA0F9D86650F ON profile');
        $this->addSql('ALTER TABLE profile ADD instagram VARCHAR(255) DEFAULT NULL, ADD facebook VARCHAR(255) DEFAULT NULL, ADD deezer VARCHAR(255) DEFAULT NULL, ADD spotify VARCHAR(255) DEFAULT NULL, ADD apple_music VARCHAR(255) DEFAULT NULL, ADD tidal VARCHAR(255) DEFAULT NULL, ADD custom_site VARCHAR(255) DEFAULT NULL, CHANGE user_id_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8157AA0FA76ED395 ON profile (user_id)');
        $this->addSql('ALTER TABLE user ADD lastname VARCHAR(255) NOT NULL, ADD twitter VARCHAR(255) DEFAULT NULL, CHANGE zip_code firstname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D85867D1B395FC');
        $this->addSql('DROP INDEX IDX_D3D85867D1B395FC ON user_equipment');
        $this->addSql('ALTER TABLE user_equipment CHANGE user_equipment_id user_material_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D858674A1365FA FOREIGN KEY (user_material_id) REFERENCES material (id)');
        $this->addSql('CREATE INDEX IDX_D3D858674A1365FA ON user_equipment (user_material_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipment DROP FOREIGN KEY FK_D338D583E308AC6F');
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D858674A1365FA');
        $this->addSql('CREATE TABLE user_skill (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, skill_id_id INT NOT NULL, level VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_BCFF1F2F5A6C0D6B (skill_id_id), INDEX IDX_BCFF1F2F9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE skill_area (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, skill_area_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_5E3DE477A7FADEB5 (skill_area_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_skill ADD CONSTRAINT FK_BCFF1F2F5A6C0D6B FOREIGN KEY (skill_id_id) REFERENCES skill (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE user_skill ADD CONSTRAINT FK_BCFF1F2F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477A7FADEB5 FOREIGN KEY (skill_area_id) REFERENCES skill_area (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('DROP TABLE material');
        $this->addSql('ALTER TABLE user ADD zip_code VARCHAR(255) NOT NULL, DROP firstname, DROP lastname, DROP twitter');
        $this->addSql('ALTER TABLE profile DROP FOREIGN KEY FK_8157AA0FA76ED395');
        $this->addSql('DROP INDEX UNIQ_8157AA0FA76ED395 ON profile');
        $this->addSql('ALTER TABLE profile DROP instagram, DROP facebook, DROP deezer, DROP spotify, DROP apple_music, DROP tidal, DROP custom_site, CHANGE user_id user_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8157AA0F9D86650F ON profile (user_id_id)');
        $this->addSql('DROP INDEX IDX_D3D858674A1365FA ON user_equipment');
        $this->addSql('ALTER TABLE user_equipment CHANGE user_material_id user_equipment_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D85867D1B395FC FOREIGN KEY (user_equipment_id) REFERENCES equipment (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_D3D85867D1B395FC ON user_equipment (user_equipment_id)');
        $this->addSql('DROP INDEX IDX_D338D583E308AC6F ON equipment');
        $this->addSql('ALTER TABLE equipment ADD name VARCHAR(255) NOT NULL, ADD description LONGTEXT DEFAULT NULL, DROP material_id, DROP brand, DROP model');
    }
}
