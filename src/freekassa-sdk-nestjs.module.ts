import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MODULE_NAME } from './common/constants';
import { createFreekassaSdkFactory } from './common/utils';
import {
    ASYNC_OPTIONS_TYPE,
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN,
    OPTIONS_TYPE,
} from './freekassa-sdk-nestjs.builder';
import { ModuleRef } from '@nestjs/core';
import { Freekassa } from '@exact-team/freekassa-sdk';
import { IFreekassaModuleOptions } from './interfaces';

@Global()
@Module({})
export class FreekassaNestjsModule extends ConfigurableModuleClass {
    constructor(private readonly moduleRef: ModuleRef) {
        super();
    }

    public static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
        const FreekassaApiNameProvider: Provider = {
            provide: MODULE_NAME,
            useValue: MODULE_NAME,
        };

        const FreekassaApiProvider: Provider = {
            provide: MODULE_NAME,
            useFactory: (): Freekassa => createFreekassaSdkFactory(options),
        };

        const { providers, exports, ...rest } = super.forRoot(options);

        return {
            providers: [...(providers ?? []), FreekassaApiNameProvider, FreekassaApiProvider],
            exports: [...(exports ?? []), FreekassaApiNameProvider, FreekassaApiProvider],
            ...rest,
        };
    }

    public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
        const FreekassaApiNameProvider: Provider = {
            provide: MODULE_NAME,
            useValue: MODULE_NAME,
        };

        const FreekassaApiProvider: Provider = {
            provide: MODULE_NAME,
            useFactory: (options: IFreekassaModuleOptions): Freekassa =>
                createFreekassaSdkFactory(options),
            inject: [MODULE_OPTIONS_TOKEN],
        };

        const { providers, exports, ...rest } = super.forRootAsync(options);

        return {
            providers: [...(providers ?? []), FreekassaApiNameProvider, FreekassaApiProvider],
            exports: [...(exports ?? []), FreekassaApiNameProvider, FreekassaApiProvider],
            ...rest,
        };
    }
}
