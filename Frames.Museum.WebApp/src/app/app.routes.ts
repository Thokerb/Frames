import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'creation',
    pathMatch: 'full'
  },
  {
    path: 'cluster-health',
    loadComponent: () =>
      import('../cluster-health/cluster-health/cluster-health').then(m => m.ClusterHealth)
  },
  {
    path: 'execution',
    loadComponent: () => import('../execution/execution/execution').then(m => m.Execution)
  },
  {
    path: 'creation',
    loadComponent: () => import('../model-creation-page/model-creation-page').then(m => m.ModelCreationPage)
  },
];
