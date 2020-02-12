import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a header with the correct text ",()=>{
    const h1 = fixture.nativeElement.querySelector('h1')
    expect(h1.textContent).toBe("Oops!! We seem not find what you're looking for")
  })

  it('should have an image',()=>{
    const img = fixture.nativeElement.querySelector('img')
    expect(img).toBeTruthy()
  })
});
