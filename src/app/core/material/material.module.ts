import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatDividerModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class MaterialModule { }
