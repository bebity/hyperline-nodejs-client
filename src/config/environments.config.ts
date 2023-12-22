import { ApiEnvironmentsEnum, Config } from '../types/client.type';

const conf: Config['environments'] = {
  [ApiEnvironmentsEnum.production]: {
    main_api: 'https://api.hyperline.co',
    events_ingestion_api: 'https://ingest.hyperline.co',
  },
  [ApiEnvironmentsEnum.sandbox]: {
    main_api: 'https://sandbox.api.hyperline.co',
    events_ingestion_api: 'https://sandbox.ingest.hyperline.co',
  },
};

export default conf;
