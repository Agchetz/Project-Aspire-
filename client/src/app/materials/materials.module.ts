import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';


const materials = [
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatIconModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  CdkTableModule,
];

@NgModule({
  imports: [CommonModule, materials],
  exports: [materials],
})
export class MaterialsModule {}
