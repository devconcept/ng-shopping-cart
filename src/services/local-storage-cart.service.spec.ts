import { LocalStorageCartService } from './local-storage-cart.service';
import { browserStorageSuite } from '../testing/browser-storage.service.spec';

browserStorageSuite(localStorage, LocalStorageCartService);

