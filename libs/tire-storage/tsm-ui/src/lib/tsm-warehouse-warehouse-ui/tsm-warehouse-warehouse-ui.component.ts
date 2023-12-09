import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { CommonModule } from '@angular/common'
import Konva from 'konva'
import { TireSet, WarehouseLayout, WarehouseSection, WarehouseSubsection } from '@nx-shell/tire-storage/tsm-services'
import Stage = Konva.Stage
import Layer = Konva.Layer

@Component({
  selector: 'tsm-ui-warehouse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tsm-warehouse-warehouse-ui.component.html',
  styleUrls: ['./tsm-warehouse-warehouse-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TsmWarehouseWarehouseUiComponent implements OnChanges {

  @Input() warehouseLayout: WarehouseLayout | undefined
  @Input() tireSet: TireSet[] = []
  @Input() offerId!: number | undefined
  @Input() showTireSetContainer = false
  @Output() tireSetStored = new EventEmitter<{ offerId: number | undefined, tireSet: TireSet, locationId: string }>()

  private stage: Stage | undefined
  private layer: Layer | undefined
  private layer2: Layer | undefined

  TIRES_SET_CONTAINER_WIDTH = 300
  STORAGE_BOX_SIZE = 20
  STORAGE_BOX_DISTANCE = 30
  SUBSECTION_PADDING = 30

  SECTION_TOP_PADDING = 20

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['warehouseLayout'] && changes['warehouseLayout'].currentValue) {
      const warehouseLayout = changes['warehouseLayout'].currentValue
      this.initializeStage(warehouseLayout)
      this.drawTireSetContainer(warehouseLayout)
      this.drawWarehouse(warehouseLayout)

    }
    if (changes['tireSet'] && changes['tireSet'].currentValue) {
      setTimeout(() => this.drawTireSet(), 10)
    }
  }

  private initializeStage (layout: WarehouseLayout) {
    const maxSectionsWidth = this.getMaximumSectionWidth(layout.sections)
    const maxSectionHeight = this.getHeight(layout.sections)
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.showTireSetContainer ? maxSectionsWidth + 300 : maxSectionsWidth,
      height: maxSectionHeight,
      draggable: true
    })
    this.layer = new Konva.Layer()
    this.layer2 = new Konva.Layer()
    this.stage.add(this.layer)
    this.stage.add(this.layer2)

    const scaleBy = 1.1
    const stage = this.stage
    stage.on('wheel', (e) => {
      e.evt.preventDefault()

      const oldScale = stage.scaleX()
      const pointer = stage.getPointerPosition()

      let mousePointTo
      if (pointer) {
        mousePointTo = {
          x: (pointer?.x - stage.x()) / oldScale,
          y: (pointer?.y - stage.y()) / oldScale,
        }
      }
      let direction = e.evt.deltaY > 0 ? 1 : -1

      if (e.evt.ctrlKey) {
        direction = -direction
      }

      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

      stage.scale({ x: newScale, y: newScale })

      let newPos
      if (pointer && mousePointTo) {
        newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        }
        stage.position(newPos)
      }

    })
  }

  private drawTireSetContainer (layout: WarehouseLayout) {
    const sectionRect = new Konva.Rect({
      x: 1,
      y: 1,
      width: this.TIRES_SET_CONTAINER_WIDTH - 2,
      height: this.getHeight(layout.sections) - 2,
      fill: 'white',
    })
    if (this.showTireSetContainer) {
      this.layer2?.add(sectionRect)
    }
  }

  private drawTireSet () {
    if (!this.showTireSetContainer) {
      return
    }
    this.layer2?.removeChildren()
    let posY = 20
    const self = this
    this.tireSet?.forEach(ts => {
      const group = new Konva.Group({ draggable: true })
      const rect = new Konva.Rect({
        x: 20,
        y: posY,
        width: 260,
        height: 40,
        fill: 'lightgrey',
        stroke: 'black',
        strokeWidth: 1,
        cornerRadius: 6,
        opacity: 0.5,
      })

      const text = new Konva.Text({
        text: ts.brand + ' ' + ts.width + '/' + ts.height + '/' + ts.size + ' ' + ts.loadIndex + ' ' + ts.speedIndex,
        height: 40,
        width: 260,
        x: 20,
        y: posY,
        opacity: 0.5,
        align: 'center',
        verticalAlign: 'middle',
        fontSize: 14
      })

      group.add(rect)
      group.add(text)

      posY += 55
      this.layer2?.add(group)

      group.on('dragend', function () {
        const pos = self.stage?.getPointerPosition()
        const shape = pos ? self.layer?.getIntersection(pos) : null
        if (shape instanceof Konva.Circle) {
          const name = shape.getAttrs().name
          if (name && name === 'vacant') {
            shape.setAttr('fill', 'red')
            shape.setAttr('name', 'occupied')
            group.hide()
            self.tireSetStored.emit({ offerId: self.offerId, tireSet: ts, locationId: shape.getAttrs().id })
          }
        }
      })

    })
    this.layer2?.draw()
    this.stage?.draw()
  }

  private drawWarehouse (layout: WarehouseLayout) {
    let lastSectionY = 0
    layout.sections.forEach(section => {
      const sectionHeight = this.getSectionHeight(section)
      const sectionWidth = this.getSectionWidth(section)
      const sectionY = lastSectionY
      lastSectionY += sectionHeight

      const sectionText = new Konva.Text({
        text: section.name,
        height: this.SECTION_TOP_PADDING,
        width: sectionWidth,
        y: sectionY + this.SECTION_TOP_PADDING / 2 - 5,
        x: this.TIRES_SET_CONTAINER_WIDTH,
        align: 'center',
        verticalAlign: 'middle',
        fontSize: 20
      })

      const sectionRect = new Konva.Rect({
        x: this.TIRES_SET_CONTAINER_WIDTH,
        y: sectionY,
        width: sectionWidth,
        height: sectionHeight,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 0,
      })

      this.layer?.add(sectionRect)
      this.layer?.add(sectionText)

      let lastSubsectionX = this.TIRES_SET_CONTAINER_WIDTH
      section.subsections.forEach(subsection => {
        const subWidth = this.getSubsectionWidth(subsection)
        const subsectionX = lastSubsectionX
        lastSubsectionX += subWidth
        const subsectionText = new Konva.Text({
          text: subsection.name,
          height: this.SECTION_TOP_PADDING,
          width: subWidth,
          strokeWidth: 1,
          y: sectionY + this.SECTION_TOP_PADDING + 10,
          x: subsectionX + subWidth / 2
        })

        this.layer?.add(subsectionText)

        Object.keys(subsection.boxes_by_rows).map((rowKey, rowIndex) => {
          const rowText = new Konva.Text({
            text: String(Number(rowKey) + 1),
            y: sectionY + this.SUBSECTION_PADDING + rowIndex * this.STORAGE_BOX_DISTANCE + this.SUBSECTION_PADDING - 5,
            x: subsectionX + this.SUBSECTION_PADDING + 5,
          })
          this.layer?.add(rowText)
          const row = subsection.boxes_by_rows[rowKey]
          row.map((box, boxIndex) => {
            const circle = new Konva.Circle({
              id: `${section.name}:${subsection.name}:${rowIndex}:${boxIndex}`,
              name: `${box.status}`,
              x: subsectionX + this.SUBSECTION_PADDING + boxIndex * this.STORAGE_BOX_DISTANCE + this.SUBSECTION_PADDING,
              y: sectionY + this.SUBSECTION_PADDING + rowIndex * this.STORAGE_BOX_DISTANCE + this.SUBSECTION_PADDING,
              radius: this.STORAGE_BOX_SIZE / 2,
              fill: this.getColor(box.status),
              strokeWidth: 1,
            })
            this.layer?.add(circle)
          })
        })
      })
    })
  }

  private getSubsectionWidth = (subsection: WarehouseSubsection) => {
    const rows = Object.keys(subsection.boxes_by_rows)
    const maxRows = Math.max(
      ...rows.map(r => Object.keys(subsection.boxes_by_rows[r]).length)
    )
    return this.STORAGE_BOX_DISTANCE * maxRows + this.SUBSECTION_PADDING * 2
  }

  private getSubsectionHeight = (subsection: WarehouseSubsection) => {
    const rows = Object.keys(subsection.boxes_by_rows)
    return this.STORAGE_BOX_DISTANCE * rows.length + this.SUBSECTION_PADDING * 2
  }

  private getSectionWidth = (section: WarehouseSection) => {
    const width = section.subsections.reduce((sum, subsection) => {
      return sum + this.getSubsectionWidth(subsection)
    }, 0)
    return width
  }

  private getSectionHeight = (section: WarehouseSection) => {
    return (
      Math.max(...section.subsections.map(this.getSubsectionHeight)) +
      this.SECTION_TOP_PADDING
    )
  }

  private getMaximumSectionWidth = (sections: WarehouseSection[]) => {
    return Math.max(...sections.map(this.getSectionWidth))
  }

  private getWidth = (sections: WarehouseSection[]) => {
    return sections.map(this.getSectionWidth).reduce((x, acc) => x + acc, 0)
  }

  private getMaximumSectionHeight = (sections: WarehouseSection[]) => {
    return Math.max(...sections.map(this.getSectionHeight))
  }

  private getHeight = (sections: WarehouseSection[]) => {
    return sections.map(this.getSectionHeight).reduce((x, acc) => x + acc, 0)
  }

  private getColor (status: string) {
    if (status === 'vacant') {
      return '#1b728d'
    } else {
      return 'red'
    }
  }
}

