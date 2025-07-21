import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

export function configureAmplify() {
  Amplify.configure(awsExports)
  console.log('✅ Amplify configured')
}
