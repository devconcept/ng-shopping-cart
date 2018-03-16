export interface CartServiceFactoryOptions {
  itemType?: any;
  serviceType?: 'memory' | 'localStorage' | 'sessionStorage' | 'remote';
  serviceOptions?: any;
}
