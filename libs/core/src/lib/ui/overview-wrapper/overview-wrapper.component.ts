import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTab, MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'core-ui-overview-wrapper',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule],
  templateUrl: './overview-wrapper.component.html',
  styleUrls: ['./overview-wrapper.component.scss'],
})
export class OverviewWrapperComponent {
  @Input() title: string | undefined
  @Input() border = true
  @Input() selectedIndex: number | undefined
  @Output() tabChange = new EventEmitter<MatTabChangeEvent>()

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup | undefined
  @ContentChildren(MatTab) tabs: QueryList<MatTab> | undefined

  tabChanged (event: MatTabChangeEvent): void {
    this.tabChange.emit(event)
  }

  onClick () {

  }
}
