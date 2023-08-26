import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'

let fpPromise: Promise<Agent>

if (!process.server) {
  fpPromise = FingerprintJS.load({
    monitoring: false,
  })
}

export async function getFingerprint() {
  const fp = await fpPromise
  const result = await fp.get()
  return result.visitorId
}
