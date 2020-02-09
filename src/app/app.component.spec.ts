import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MaterialModule } from "./material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [AppComponent, NavBarComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should check for the child component", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const child = fixture.debugElement.queryAll(By.directive(NavBarComponent))
    
    expect(child).toBeDefined()
  });
});
