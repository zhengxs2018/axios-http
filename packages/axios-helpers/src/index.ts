import Axios from 'axios'

export const isCancel = Axios.isCancel

export type { Fetcher } from '@zhengxs/axios-types'

export { withCancelToken } from './withCancelToken'
