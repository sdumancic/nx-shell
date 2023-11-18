import { OffersOverviewSearchValues, OfferStatusEnum } from '@nx-shell/tire-storage/tsm-domain'
import { Offer } from '@nx-shell/tire-storage/tsm-services'
import { OffersOverviewSearchResultUi } from '@nx-shell/tire-storage/tsm-ui'

export class OffersOverviewMapper {

  public static fromFormValuesToSearchValues (formValues: any, status: OfferStatusEnum): OffersOverviewSearchValues {

    return {
      status: status,
      seasons: formValues.season ? formValues.season : [],
      brands: formValues.brand ? formValues.brand : [],
      widths: formValues.width ? formValues.width : [],
      heights: formValues.height ? formValues.height : [],
      sizes: formValues.size ? formValues.size : [],
      loadIndexes: formValues.loadIndex ? formValues.loadIndex : [],
      speedIndexes: formValues.speedIndex ? formValues.speedIndex : [],
    } as OffersOverviewSearchValues
  }

  public static fromResourceCollectionToSearchResultUi (resourceCollection: Offer[]): OffersOverviewSearchResultUi[] {

    return resourceCollection.map(resource => {
      return {
        id: resource.id,
        customer: resource.customer,
        tireSets: resource.tireSets,
        startDate: resource.startDate,
        endDate: resource.endDate,
        status: resource.status,
        totalPrice: resource.totalPrice
      } as OffersOverviewSearchResultUi
    })

  }
}
