import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from './app-routing.enum';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: AppRoute.Home,
    component: HomeComponent,
  },
  {
    path: AppRoute.Message,
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
