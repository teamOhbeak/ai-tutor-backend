import { DataSource, EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { Inject } from "@nestjs/common";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }
}