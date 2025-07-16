import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'cluster-health',
    loadComponent: () =>
      import('../cluster-health/cluster-health/cluster-health').then(m => m.ClusterHealth)
  },
];
