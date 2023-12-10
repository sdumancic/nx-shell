import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'

@Component({
  selector: 'tsm-planner',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, MatExpansionModule],
  templateUrl: './tsm-planner.component.html',
  styleUrl: './tsm-planner.component.scss',
})
export class TsmPlannerComponent {
  teams = [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
    { id: 3, name: 'Team 3' }
  ]
  private data = [
    {
      mechanicId: 1,
      mechanicName: 'John Doe',
      teamId: 1,
      workOrders: [
        {
          workOrderId: 1,
          durationMin: 120,
          description: 'Oil change'
        },
        {
          workOrderId: 2,
          durationMin: 180,
          description: 'Small service'
        },
        {
          workOrderId: 3,
          durationMin: 60,
          description: 'Inspection'
        }
      ]
    },
    {
      mechanicId: 2,
      mechanicName: 'John Rambo',
      teamId: 1,
      workOrders: [
        {
          workOrderId: 4,
          durationMin: 120,
          description: 'Oil change'
        },
        {
          workOrderId: 5,
          durationMin: 180,
          description: 'Small service'
        },

      ]
    },
    {
      mechanicId: 3,
      mechanicName: 'Sigourney Doe',
      teamId: 1,
      workOrders: [
        {
          workOrderId: 6,
          durationMin: 240,
          description: 'Full service'
        },
      ]
    },
    {
      mechanicId: 4,
      mechanicName: 'John Wayne',
      teamId: 2,
      workOrders: [
        {
          workOrderId: 7,
          durationMin: 120,
          description: 'Full inspection'
        },
      ]
    }
  ]
  mechanics = signal(this.data)

  teamMechanics (teamId: number) { return this.data.filter(m => m.teamId === teamId)}

  drop (event: CdkDragDrop<any>) {
    const oldIndex = event.previousIndex
    const newIndex = event.currentIndex
    const workOrderToMove = event.item.data

    const oldMechanicId = event.previousContainer.data.mechanicId
    const newMechanicId = event.container.data.mechanicId
    if (oldMechanicId !== newMechanicId && oldIndex !== newIndex) {
      console.log('Moving workorder ', workOrderToMove, ' from ', oldMechanicId, ' to ', newMechanicId, ' oldIndex', oldIndex, ' newIndex', newIndex)
      const oldMechanic = this.mechanics().find(m => m.mechanicId === oldMechanicId)
      const newMechanic = this.mechanics().find(m => m.mechanicId === newMechanicId)
      if (oldMechanic && newMechanic) {
        oldMechanic.workOrders.splice(oldIndex, 1)
        newMechanic.workOrders.splice(newIndex, 0, workOrderToMove)
      }
    }
  }
}