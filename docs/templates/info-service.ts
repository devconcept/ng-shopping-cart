import { Injectable } from '@angular/core';

@Injectable()
export class InfoService {
  private _version = '{$ git.version.raw $}';
  private _repo = '{$ git.package.homepage $}';

  getVersion(): string {
    return this._version;
  }

  getRepoUrl(): string {
    return this._repo;
  }
}
