import { auth0 } from './auth0'
import type { Auth0, Auth0User } from './auth0'
import { azureActiveDirectory } from './azureActiveDirectory'
import type {
  AzureActiveDirectory,
  AzureActiveDirectoryUser,
} from './azureActiveDirectory'
import { clerk } from './clerk'
import type { Clerk, ClerkUser } from './clerk'
import { custom } from './custom'
import type { Custom } from './custom'
import { dbAuth } from './dbAuth'
import type { DbAuth } from './dbAuth'
import { ethereum } from './ethereum'
import type { Ethereum, EthereumUser } from './ethereum'
import { firebase, FirebaseUser } from './firebase'
import type { FirebaseAuth } from './firebase'
import { goTrue } from './goTrue'
import type { GoTrue, GoTrueUser } from './goTrue'
import { magicLink } from './magicLink'
import type { MagicLink, MagicUser } from './magicLink'
import { netlify } from './netlify'
import type { NetlifyIdentity } from './netlify'
import { nhost } from './nhost'
import type { Nhost, NhostUser } from './nhost'
import { supabase } from './supabase'
import type { Supabase, SupabaseUser } from './supabase'

const typesToClients = {
  netlify,
  auth0,
  azureActiveDirectory,
  dbAuth,
  goTrue,
  magicLink,
  firebase,
  supabase,
  ethereum,
  nhost,
  clerk,
  /** Don't we support your auth client? No problem, define your own the `custom` type! */
  custom,
}

export type SupportedAuthClients =
  | Auth0
  | AzureActiveDirectory
  | DbAuth
  | GoTrue
  | NetlifyIdentity
  | MagicLink
  | FirebaseAuth
  | Supabase
  | Clerk
  | Ethereum
  | Nhost
  | Custom

export type SupportedAuthTypes = keyof typeof typesToClients

export type { Auth0User }
export type { AzureActiveDirectoryUser }
export type { DbAuth }
export type { ClerkUser }
export type { FirebaseUser }
export type { GoTrueUser }
export type { MagicUser }
export type { SupabaseUser }
export type { EthereumUser }
export type { NhostUser }
export type SupportedUserMetadata =
  | Auth0User
  | AzureActiveDirectoryUser
  | ClerkUser
  | FirebaseUser
  | GoTrueUser
  | MagicUser
  | SupabaseUser
  | EthereumUser
  | NhostUser

export interface AuthClient {
  restoreAuthState?(): void | Promise<any>
  login(options?: any): Promise<any>
  logout(options?: any): void | Promise<any>
  signup(options?: any): void | Promise<any>
  getToken(): Promise<null | string>
  forgotPassword?(username: string): void | Promise<any>
  resetPassword?(options?: any): void | Promise<any>
  validateResetToken?(token: string | null): void | Promise<any>
  /** The user's data from the AuthProvider */
  getUserMetadata(): Promise<null | SupportedUserMetadata>
  client: SupportedAuthClients
  type: SupportedAuthTypes
}

export const createAuthClient = (
  client: SupportedAuthClients,
  type: SupportedAuthTypes
): AuthClient => {
  if (!typesToClients[type]) {
    throw new Error(
      `Your client ${type} is not supported, we only support ${Object.keys(
        typesToClients
      ).join(', ')}`
    )
  }
  return typesToClients[type](client)
}
