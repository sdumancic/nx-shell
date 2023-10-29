import { inject, Injectable, TemplateRef } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { ComponentType } from '@angular/cdk/overlay'

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly defaultConfig: MatDialogConfig = { autoFocus: true, panelClass: ['dialog-container'] }

  private dialog = inject(MatDialog)

  private readonly smallConf: MatDialogConfig = { ...this.defaultConfig, width: '500px' }
  private readonly mediumConf: MatDialogConfig = { ...this.defaultConfig, width: '640px' }
  private readonly largeConf: MatDialogConfig = { ...this.defaultConfig, width: '800px' }
  private readonly fullWidthConf: MatDialogConfig = {
    ...this.defaultConfig,
    width: '100vw',
    height: '100vh',
    maxWidth: '100%',
    panelClass: ['dialog-container_full-width']
  }

  public openSmall<T, D, R> (component: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component, { ...config, ...this.smallConf })
  }

  public openMedium<T, D, R> (component: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component, { ...config, ...this.mediumConf })
  }

  public openLarge<T, D, R> (component: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component, { ...config, ...this.largeConf })
  }

  public openFullScreen<T, D, R> (component: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig<D>): MatDialogRef<T, R> {

    return this.dialog.open<T, D, R>(component, { ...config, ...this.fullWidthConf })
  }

}
