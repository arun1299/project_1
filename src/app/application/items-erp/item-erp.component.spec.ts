import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsErpComponent } from './items-erp.component';




describe('AccountsComponent', () => {
  let component: ItemsErpComponent;
  let fixture: ComponentFixture<ItemsErpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsErpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsErpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
