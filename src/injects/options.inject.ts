import { Inject } from '@nestjs/common';

export const InjectClientOptions = () => Inject('HYPERLINE_CLIENT_OPTIONS');
