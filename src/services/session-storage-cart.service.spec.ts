import { SessionStorageCartService } from './session-storage-cart.service';
import { browserStorageSuite } from '../testing/browser-storage.service.spec';

browserStorageSuite(sessionStorage, SessionStorageCartService);
