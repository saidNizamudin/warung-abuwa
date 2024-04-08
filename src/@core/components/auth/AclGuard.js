// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

import Spinner from 'src/@core/components/spinner'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children } = props

  const router = useRouter()

  // ** Vars
  let ability
  useEffect(() => {
    if (router.route === '/') {
      router.replace('/form')
    }
  }, [router])

  // User is logged in, build ability for the user based on his role
  if (!ability) {
    ability = buildAbilityFor('admin', aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (router.route === '/404' || router.route === '/500') {
    return <>{children}</>
  }

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}

export default AclGuard
