import {HttpHeaders, HttpParams} from '@angular/common/http';

/**
 * Angular Http init options for an HTTP request
 */
export interface HttpOptions {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer'|'blob'|'json'|'text';
  withCredentials?: boolean;
}
