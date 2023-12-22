import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import { Coupon } from 'src/namespaces/coupon.namespace';
import { AbstractCrudRepository } from './abstracts/crud-repository.abstract';

@Injectable()
export class CouponsRepository extends AbstractCrudRepository<
  Coupon.Item,
  Coupon.CreateInput,
  Coupon.UpdateInput,
  Coupon.SearchInput
> {
  public base_url = '/v1/coupons';

  public api_type = 'main_api' as const;

  public repository_name: string = CouponsRepository.name;
}
