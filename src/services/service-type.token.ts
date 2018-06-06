import {InjectionToken} from '@angular/core';

/**
 * An injection token to store the service type entered in the `forRoot` static function. Is used to prevent errors when compiling with AOT.
 *
 * @note {info} You can safely ignore this token if you are using custom cart services.
 */
export const CART_SERVICE_TYPE = new InjectionToken<any>('CartServiceType');
