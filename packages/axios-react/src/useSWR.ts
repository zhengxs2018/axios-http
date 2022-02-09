import swr, { Key, SWRConfiguration, BareFetcher, SWRResponse } from 'swr'

import httpClient from '@zhengxs/axios-http'

export function useSWR<Data = any, Error = any>(
  key: Key,
  config?: SWRConfiguration<Data, Error, BareFetcher<Data>>
): SWRResponse<Data, Error> {
  return swr(key, url => httpClient.get(url), config)
}
