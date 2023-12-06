import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageFormDialogComponent } from './message-form-dialog/message-form-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MessagesService } from '../services/messages.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonTableComponent } from './skeleton-table/skeleton-table.component';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageFormDialogComponent,
    SkeletonTableComponent,
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MessagesRoutingModule,
  ],
  providers: [MessagesService],
})
export class MessagesModule {}
