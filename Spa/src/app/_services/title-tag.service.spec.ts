/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TitleTagService } from './title-tag.service';

describe('Service: TitleTag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleTagService]
    });
  });

  it('should ...', inject([TitleTagService], (service: TitleTagService) => {
    expect(service).toBeTruthy();
  }));
});
