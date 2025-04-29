import { Freekassa } from '@exact-team/freekassa-sdk';
import { Logger } from '@nestjs/common';
import { IFreekassaConfig } from './interfaces';
const logger = new Logger('freekassa-sdk-nestjs');

export function createFreekassaSdkFactory(moduleOptions: IFreekassaConfig): Freekassa {
    const freekassaApi = new Freekassa(moduleOptions);
    logger.log(`FreekassaApi initialized`);
    return freekassaApi;
}
