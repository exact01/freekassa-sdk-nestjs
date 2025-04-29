import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IFreekassaModuleOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<IFreekassaModuleOptions>()
        .setFactoryMethodName('forRootAsync')
        .setClassMethodName('forRoot')
        .build();
