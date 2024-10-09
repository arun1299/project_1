import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  exports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    ClipboardModule,
    DragDropModule,
    ScrollingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class MaterialModule {}
