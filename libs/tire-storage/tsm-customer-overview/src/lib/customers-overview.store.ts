import {
  Customer,
  CustomerMetadata,
  CustomersMetadataService,
  CustomersService,
  GetCustomersRequest
} from '@nx-shell/tire-storage/tsm-services'
import { CallState, ErrorState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { CustomersOverviewSearchValues, SearchMeta } from '@nx-shell/tire-storage/tsm-domain'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed, inject } from '@angular/core'
import { firstValueFrom, switchMap, tap } from 'rxjs'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { NGXLogger } from 'ngx-logger'

export const CustomersOverviewStore = signalStore(
  { providedIn: 'root', },
  withState({
    customerMetadata: {} as CustomerMetadata,
    customerMetadataCallState: LoadingState.INIT as CallState,
    customers: [] as Customer[],
    totalCount: 0,
    searchMeta: {
      pagination: { index: 1, size: 10 },
      sorting: { attribute: 'id', order: 'asc' }
    } as SearchMeta,
    customersCallState: LoadingState.INIT as CallState,
    searchValues: {} as CustomersOverviewSearchValues
  }),
  withComputed((store) => ({

    metadataLoading: computed(() => store.customerMetadataCallState() === LoadingState.LOADING),
    metadataLoaded: computed(() => store.customerMetadataCallState() === LoadingState.LOADED),
    metadataError: computed(() => {
      const callState = store.customerMetadataCallState()
      return ((callState as ErrorState)?.errorMsg !== undefined) ? (callState as ErrorState)?.errorMsg : null
    }),
    customersLoading: computed(() => store.customersCallState() === LoadingState.LOADING),
    customersLoaded: computed(() => store.customersCallState() === LoadingState.LOADED),
    customersError: computed(() => {
      const callState = store.customersCallState()
      return ((callState as ErrorState)?.errorMsg !== undefined) ? (callState as ErrorState)?.errorMsg : null
    }),
  })),
  withMethods((state) => {

    const customerMetadataService = inject(CustomersMetadataService)
    const customersService = inject(CustomersService)
    const logger = inject(NGXLogger)

    function printState () {
      logger.info({
        totalCount: state.totalCount(),
        customerMetadata: state.customerMetadata(),
        customerMetadataCallState: state.customerMetadataCallState(),
        customers: state.customers(),
        searchMeta: state.searchMeta(),
        customersCallState: state.customersCallState(),
        searchValues: state.searchValues()
      })
    }

    return {
      setSearchValues: (searchValues: CustomersOverviewSearchValues) => {
        patchState(state, { searchValues })
        printState()
      },
      setPagination: (index: number, size: number) => {
        const { searchMeta } = state
        patchState(state, {
          searchMeta: { ...searchMeta(), pagination: { index: index, size: size } }
        })
        printState()
      },
      setSort: (attribute: string, order: string) => {
        const { searchMeta } = state
        patchState(state, {
          searchMeta: { ...searchMeta(), sorting: { attribute: attribute, order: order } }
        })
        printState()
      },
      loadMetadata: async () => {
        patchState(state, { customerMetadataCallState: LoadingState.LOADING })
        const metadata = await firstValueFrom(customerMetadataService.getCustomerMetadata$())
        patchState(state, { customerMetadata: metadata, customerMetadataCallState: LoadingState.LOADED })
        printState()
      },
      searchCustomers: rxMethod<{
        searchValues?: CustomersOverviewSearchValues,
        pagination?: { index: number, size: number },
        sorting?: { attribute: string, order?: string }
      }>(s$ => s$.pipe(
        tap(data => {
          if (data.searchValues) {
            patchState(state, { searchValues: data.searchValues })
          }
          if (data.pagination) {
            patchState(state, { searchMeta: { ...state.searchMeta(), pagination: data.pagination } })
          }
          if (data.sorting) {
            patchState(state, { searchMeta: { ...state.searchMeta(), sorting: data.sorting } })
          }
        }),
        tap(() => patchState(state, {
          customersCallState: LoadingState.LOADING,
        })),
        switchMap(() => {
          const { searchMeta, searchValues } = state
          const pagination = searchMeta && searchMeta().pagination ? searchMeta().pagination : null
          const index = pagination ? pagination?.index : 1
          const size = pagination ? pagination?.size : 10
          const sorting = searchMeta && searchMeta().sorting ? searchMeta().sorting : null
          const attribute = sorting ? sorting?.attribute : null
          const order = sorting ? sorting?.order : null

          const customerRequest = {
            paging: { page: index ? index : 1, limit: size ? size : 10 },
            sorting: { attribute: attribute, order: order },
            filtering: {
              firstName: searchValues().firstName,
              lastName: searchValues().lastName,
              gender: searchValues().gender,
              street: searchValues().street,
              city: searchValues().city,
              state: searchValues().state,
              zip: searchValues().zip,
              phoneNumber: searchValues().phoneNumber,
              email: searchValues().email
            }
          } as GetCustomersRequest
          return customersService.getCustomers$(customerRequest)
        }),
        tap(res => patchState(state, {
          totalCount: res.totalCount ? Number(res.totalCount) : 0,
          customersCallState: LoadingState.LOADED,
          customers: res.data ? res.data : []
        })),
        tap(() => printState())
      ))
    }

  })
)
