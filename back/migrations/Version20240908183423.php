<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240908183423 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D858674A1365FA');
        $this->addSql('DROP INDEX IDX_D3D858674A1365FA ON user_equipment');
        $this->addSql('ALTER TABLE user_equipment CHANGE user_material_id equipment_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D85867517FE9FE FOREIGN KEY (equipment_id) REFERENCES equipment (id)');
        $this->addSql('CREATE INDEX IDX_D3D85867517FE9FE ON user_equipment (equipment_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D85867517FE9FE');
        $this->addSql('DROP INDEX IDX_D3D85867517FE9FE ON user_equipment');
        $this->addSql('ALTER TABLE user_equipment CHANGE equipment_id user_material_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D858674A1365FA FOREIGN KEY (user_material_id) REFERENCES material (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_D3D858674A1365FA ON user_equipment (user_material_id)');
    }
}
