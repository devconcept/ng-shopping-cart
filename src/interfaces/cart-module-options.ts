export interface CartModuleOptions  {
  itemType?: any;
  serviceType?: 'memory' | 'localStorage' | 'sessionStorage' | 'remote';
  serviceOptions?: any;
}
